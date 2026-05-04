const fs = require("fs");
const path = require("path");

const galleryDir = "bilder/galerie";
const outputFile = path.join(galleryDir, "gallery.json");

const allowed = [".jpg", ".jpeg", ".png", ".gif", ".webp", ".mp4", ".webm", ".mov"];

const galleryData = {};

if (fs.existsSync(galleryDir)) {
  const monthFolders = fs.readdirSync(galleryDir);

  monthFolders.forEach(monthFolder => {
    const match = monthFolder.match(/^(\d{4})-(\d{2})$/);
    if (!match) return;

    const monthPath = path.join(galleryDir, monthFolder);
    if (!fs.statSync(monthPath).isDirectory()) return;

    const eventFolders = fs.readdirSync(monthPath);

    eventFolders.forEach(eventFolder => {
      const eventPath = path.join(monthPath, eventFolder);
      if (!fs.statSync(eventPath).isDirectory()) return;

      const files = fs.readdirSync(eventPath)
        .filter(file => allowed.includes(path.extname(file).toLowerCase()))
        .sort((a, b) => a.localeCompare(b, "de-DE", { numeric: true }));

      if (files.length > 0) {
        if (!galleryData[monthFolder]) {
          galleryData[monthFolder] = {};
        }

        galleryData[monthFolder][eventFolder] = files;
      }
    });
  });
}

fs.writeFileSync(outputFile, JSON.stringify(galleryData, null, 2), "utf8");

console.log(`Gallery data generated: ${outputFile}`);
