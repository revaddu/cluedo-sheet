# Stop execution on any error
$ErrorActionPreference = "Stop"

# Remove 'dist' directory if it exists
if (Test-Path -Path "dist") {
    Remove-Item -Recurse -Force "dist"
}

# Build the project
npm run build

# Navigate into the build output directory
Set-Location "dist"

# Initialize a new git repository
git init

# Create and switch to 'main' branch
git checkout -b main

# Add all files to git
git add -A

# Commit the changes
git commit -m 'deploy'

# Push to the 'gh-pages' branch of your repository
git push -f git@github.com:revaddu/cluedo-sheet.git main:gh-pages

# Return to the previous directory
Set-Location ".."
