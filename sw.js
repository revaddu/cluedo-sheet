if(!self.define){let e,o={};const i=(i,n)=>(i=new URL(i+".js",n).href,o[i]||new Promise((o=>{if("document"in self){const e=document.createElement("script");e.src=i,e.onload=o,document.head.appendChild(e)}else e=i,importScripts(i),o()})).then((()=>{let e=o[i];if(!e)throw new Error(`Module ${i} didn’t register its module`);return e})));self.define=(n,r)=>{const d=e||("document"in self?document.currentScript.src:"")||location.href;if(o[d])return;let s={};const c=e=>i(e,d),l={module:{uri:d},exports:s,require:c};o[d]=Promise.all(n.map((e=>l[e]||c(e)))).then((e=>(r(...e),s)))}}define(["./workbox-3625d7b0"],(function(e){"use strict";self.skipWaiting(),e.clientsClaim(),e.precacheAndRoute([{url:"assets/index.884f2593.js",revision:null},{url:"assets/index.90ee5389.css",revision:null},{url:"index.html",revision:"dc173e9018acf02242e04ceef238c8ed"},{url:"registerSW.js",revision:"2e02d69f2539c61e938bbd131581f223"},{url:"pwa/logo-512x512.png",revision:"5155102c5dddfdacb39a85708b36b2cd"},{url:"pwa/logo-256x256.png",revision:"ae6c7f9b02c111e625280801f39da6bf"},{url:"pwa/logo-192x192.png",revision:"ecd94d9194f7a018fa75a487d8bdc9ac"},{url:"pwa/logo-180x180.png",revision:"963ce84f3d6200d9e3f289979c60933c"},{url:"pwa/logo-144x144.png",revision:"f9dc2d76241086d4866483696fa722f4"},{url:"pwa/logo-128x128.png",revision:"800d2c13846532263708c47d395d80db"},{url:"pwa/logo-120x120.png",revision:"a40b51b9da8e599864c5afc6b2f079dc"},{url:"pwa/logo-96x96.png",revision:"359f8f2af1640f46e076d731901984d6"},{url:"pwa/logo-72x72.png",revision:"4cde5721f7140ddcfed85f0047213cb6"},{url:"pwa/logo-64x64.png",revision:"de4a073c66488ad5113b5a6f31d0398d"},{url:"pwa/logo-48x48.png",revision:"4c2ee9b584773107c7b135c33548cdc1"},{url:"pwa/logo-32x32.png",revision:"af53c7242376f067b7bde50f88fa09d7"},{url:"manifest.webmanifest",revision:"a238d63a174fe84f5af2372c048a4307"}],{}),e.cleanupOutdatedCaches(),e.registerRoute(new e.NavigationRoute(e.createHandlerBoundToURL("index.html")))}));
