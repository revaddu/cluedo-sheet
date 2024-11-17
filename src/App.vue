<script setup lang="ts">
import {
  mdiBookOpenVariant,
  mdiBookshelf,
  mdiCandelabra,
  mdiChandelier,
  mdiCog,
  mdiDanceBallroom,
  mdiEraserVariant,
  mdiFlowerTulip,
  mdiJumpRope,
  mdiKnifeMilitary,
  mdiPipe,
  mdiPistol,
  mdiSilverwareForkKnife,
  mdiSofa,
  mdiStove,
  mdiTableTennis,
  mdiTranslate,
  mdiWrench,
} from "@mdi/js";
import { ref, watch } from "vue";
import StatusMarker from "./components/StatusMarker.vue";
import SvgIcon from "./components/SvgIcon.vue";
import {
  detectLocalLocale,
  initLocale,
  LOCALE_DATA,
  LocaleActor,
  switchLocale,
} from "./services/localeService";
import { Status, StatusDisplayMap } from "./types/statusTypes";

const suspects = [
  { code: "mustard", color: "text-yellow-600" },
  { code: "plum", color: "text-purple-500" },
  { code: "green", color: "text-green-600" },
  { code: "peacock", color: "text-blue-600" },
  { code: "scarlett", color: "text-red-700" },
  { code: "orchid", color: "text-pink-600" },
];

const weapons = [
  { code: "dagger", icon: mdiKnifeMilitary },
  { code: "candlestick", icon: mdiCandelabra },
  { code: "revolver", icon: mdiPistol },
  { code: "rope", icon: mdiJumpRope },
  { code: "leadPipe", icon: mdiPipe },
  { code: "wrench", icon: mdiWrench },
];

const rooms = [
  { code: "hall", icon: mdiChandelier },
  { code: "lounge", icon: mdiSofa },
  { code: "diningRoom", icon: mdiSilverwareForkKnife },
  { code: "kitchen", icon: mdiStove },
  { code: "ballroom", icon: mdiDanceBallroom },
  { code: "conservatory", icon: mdiFlowerTulip },
  { code: "billiardRoom", icon: mdiTableTennis },
  { code: "library", icon: mdiBookshelf },
  { code: "study", icon: mdiBookOpenVariant },
];

const statuBtns: Status[] = [
  Status.Noticed,
  Status.Unknown,
  Status.Excluded,
  Status.Confirmed,
  Status.Blank,
];

type MarkerType = InstanceType<typeof StatusMarker>;

const currentStatus = ref<Status>(Status.Excluded);
const markerRefMap = ref<Record<string, MarkerType>>({});
const currentLocale = ref<string>(detectLocalLocale());
initLocale(currentLocale.value);
const la = new LocaleActor(currentLocale.value);

// **Load players from localStorage or use default**
const storedPlayers = localStorage.getItem("players");
const players = ref(
  storedPlayers
    ? JSON.parse(storedPlayers)
    : [
        { name: "P1", color: "text-red-500" },
        { name: "P2", color: "text-blue-500" },
        { name: "P3", color: "text-green-500" },
      ]
);

const isSettingsVisible = ref(false);
const numPlayers = ref(players.value.length);
const tempPlayers = ref(players.value.map((player: any) => ({ ...player })));

function storeMarkerRef(el: MarkerType | null, markerIndex: string): void {
  if (el) {
    markerRefMap.value[markerIndex] = el;
  }
}
function buildIndex(type: string, i: number, j: number): string {
  return `${type}_${i}_${j}`;
}
function onStatusMarkerClicked(markerIndex: string, event: Event): void {
  markerRefMap.value[markerIndex].changeStatus(currentStatus.value);
  event.stopPropagation();
}
function markerBtnStyle(btnStatus: Status): string {
  if (currentStatus.value === Status.Blank) {
    return "text-gray-300";
  }
  if (currentStatus.value === btnStatus) {
    return StatusDisplayMap[btnStatus].color;
  }
  return "text-gray-300";
}
function markerBtnIcon(btnStatus: Status): string {
  if (btnStatus === Status.Blank) {
    return mdiEraserVariant;
  } else {
    return StatusDisplayMap[btnStatus].icon;
  }
}
function onLocaleBtnClicked(): void {
  if (currentLocale.value === "de") {
    currentLocale.value = "en";
  } else {
    currentLocale.value = "de";
  }
  switchLocale(currentLocale.value);
}

// **Settings functions**
function showSettings() {
  tempPlayers.value = players.value.map((player: any) => ({ ...player }));
  numPlayers.value = tempPlayers.value.length;
  isSettingsVisible.value = true;
}

function hideSettings() {
  isSettingsVisible.value = false;
}

function applySettings() {
  players.value = tempPlayers.value.map((player: any) => ({ ...player }));

  localStorage.setItem("players", JSON.stringify(players.value));

  hideSettings();
}

// **Watch for changes in players array to update localStorage**
watch(
  players,
  (newPlayers) => {
    localStorage.setItem("players", JSON.stringify(newPlayers));
  },
  { deep: true }
);

watch(numPlayers, (newVal) => {
  while (tempPlayers.value.length < newVal) {
    tempPlayers.value.push({
      name: `P${tempPlayers.value.length + 1}`,
      color: "",
    });
  }
  while (tempPlayers.value.length > newVal) {
    tempPlayers.value.pop();
  }
});
</script>

<template>
  <div class="fixed inset-0 flex flex-col justify-between items-stretch">
    <!-- **Settings Modal** -->
    <div
      v-if="isSettingsVisible"
      class="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50 z-10"
    >
      <div class="bg-white p-4 rounded w-80">
        <h2 class="text-xl mb-4">Player Settings</h2>
        <div class="mb-2">
          <label for="numPlayers" class="block">Number of Players:</label>
          <input
            id="numPlayers"
            type="number"
            v-model.number="numPlayers"
            min="1"
            max="6"
            class="border rounded p-1 w-full"
          />
        </div>
        <div v-for="(player, index) in tempPlayers" :key="index" class="mb-2">
          <label :for="`playerName${index}`" class="block"
            >Player {{ index + 1 }} Name:</label
          >
          <input
            :id="`playerName${index}`"
            type="text"
            v-model="player.name"
            class="border rounded p-1 w-full"
          />
        </div>
        <div class="flex justify-end mt-4">
          <button
            @click="applySettings"
            class="bg-blue-500 text-white px-3 py-1 rounded mr-2"
          >
            Apply
          </button>
          <button
            @click="hideSettings"
            class="bg-gray-500 text-white px-3 py-1 rounded"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
    <!-- **Main Content** -->
    <div class="grow min-h-0 w-full overflow-y-auto">
      <div class="m-auto p-2 max-w-md flex justify-between items-center">
        <!-- **Settings Button** -->
        <button
          @click="showSettings"
          class="text-gray-600 mx-3 flex items-center"
        >
          <SvgIcon
            class="inline-block mr-1"
            :path="mdiCog"
            :size="20"
          ></SvgIcon>
          <span>Settings</span>
        </button>
        <div
          class="text-gray-600 cursor-pointer mx-3"
          @click="onLocaleBtnClicked"
        >
          <SvgIcon
            class="inline-block"
            :path="mdiTranslate"
            :size="20"
          ></SvgIcon>
          <span class="pl-1 text-sm">
            {{ LOCALE_DATA[currentLocale] }}
          </span>
        </div>
      </div>
      <div class="overflow-x-auto">
        <table class="w-full m-auto">
          <tr>
            <td class="title">
              {{ la.t("title.who") }}
            </td>
            <td
              v-for="(player, index) in players"
              :key="index"
              class="header p-1 bg-black text-white"
            >
              {{ player.name }}
            </td>
          </tr>
          <tr
            v-for="(suspect, i) in suspects"
            :key="i"
            class="hover:bg-gray-200"
          >
            <td class="header text-sm" :class="suspect.color">
              {{ la.t(`suspect.${suspect.code}.name`) }}
            </td>
            <td v-for="(_v, j) in players" :key="buildIndex('suspect', i, j)">
              <StatusMarker
                :ref="
                (el) => {
                  storeMarkerRef(el as MarkerType, buildIndex('suspect', i, j));
                }
              "
                @click="
                  onStatusMarkerClicked(buildIndex('suspect', i, j), $event)
                "
              ></StatusMarker>
            </td>
          </tr>
          <tr>
            <td class="title">
              {{ la.t("title.what") }}
            </td>
            <td
              v-for="(player, index) in players"
              :key="index"
              class="header p-1 bg-black text-white"
            >
              {{ player.name }}
            </td>
          </tr>
          <tr v-for="(weapon, i) in weapons" :key="i" class="hover:bg-gray-200">
            <td class="header text-sm">
              <SvgIcon class="inline-block m-1" :path="weapon.icon"></SvgIcon>
              {{ la.t(`weapon.${weapon.code}`) }}
            </td>
            <td v-for="(_v, j) in players" :key="buildIndex('weapon', i, j)">
              <StatusMarker
                :ref="
                (el) => {
                  storeMarkerRef(el as MarkerType, buildIndex('weapon',i,j));
                }
              "
                @click="
                  onStatusMarkerClicked(buildIndex('weapon', i, j), $event)
                "
              ></StatusMarker>
            </td>
          </tr>
          <tr>
            <td class="title">
              {{ la.t("title.where") }}
            </td>
            <td
              v-for="(player, index) in players"
              :key="index"
              class="header p-1 bg-black text-white"
            >
              {{ player.name }}
            </td>
          </tr>
          <tr v-for="(room, i) in rooms" :key="i" class="hover:bg-gray-200">
            <td class="header text-sm">
              <SvgIcon class="inline-block m-1" :path="room.icon"></SvgIcon>
              {{ la.t(`room.${room.code}`) }}
            </td>
            <td v-for="(_v, j) in players" :key="buildIndex('room', i, j)">
              <StatusMarker
                :ref="
                (el) => {
                  storeMarkerRef(el as MarkerType, buildIndex('room',i,j));
                }
              "
                @click="onStatusMarkerClicked(buildIndex('room', i, j), $event)"
              ></StatusMarker>
            </td>
          </tr>
        </table>
      </div>
    </div>
    <div class="flex-none w-full flex justify-center items-center">
      <div
        v-for="(status, index) in statuBtns"
        :key="index"
        @click="currentStatus = status"
      >
        <SvgIcon
          class="m-3"
          :class="markerBtnStyle(status)"
          :path="markerBtnIcon(status)"
          size="48"
        ></SvgIcon>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
