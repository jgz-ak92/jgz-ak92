const fs = require('fs');
const path = require('path');

const galleryDir = 'bilder/galerie';
const outputFile = 'gallery-data.json';

// Alle Monate mit deutschen Namen
const monthNames = {
  '01': 'Januar',
  '02': 'Februar',
  '03': 'März',
  '04': 'April',
  '05': 'Mai',
  '06': 'Juni',
  '07': 'Juli',
  '08': 'August',
  '09': 'September',
  '10': 'Oktober',
  '11': 'November',
  '12': 'Dezember'
};

// Bilder auslesen
const galleryData = {};

if (fs.existsSync(galleryDir)) {
  const entries = fs.readdirSync(galleryDir);
  
  entries.forEach(entry => {
    const match = entry.match(/^\\d{4}-(\\d{2})$/);
    if (match) {
      const year = match[1];
      const month = match[2];
      const monthPath = path.join(galleryDir, entry);
      
      if (fs.statSync(monthPath).isDirectory()) {
        const files = fs.readdirSync(monthPath)
          .filter(file => /.(jpg|jpeg|png|gif|webp)$/i.test(file))
          .sort();
        
        if (files.length > 0) {
          if (!galleryData[year]) {
            galleryData[year] = [];
          }
          
          galleryData[year].push({
            month: monthNames[month],
            monthNum: month,
            images: files.map(file => `bilder/galerie/${entry}/${file}`)
          });
        }
      }
    }
  });
}

// Nach Jahren und Monaten sortieren
const sortedData = {};
Object.keys(galleryData)
  .sort((a, b) => b - a)
  .forEach(year => {
    sortedData[year] = galleryData[year].sort((a, b) => parseInt(b.monthNum) - parseInt(a.monthNum));
  });

// JSON speichern
fs.writeFileSync(outputFile, JSON.stringify(sortedData, null, 2));
console.log(`Gallery data generated: ${outputFile}`);