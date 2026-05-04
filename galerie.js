document.addEventListener("DOMContentLoaded", () => {

  const container = document.getElementById("gallery-container");

  const lightbox = document.getElementById("lightbox");
  const lightboxImg = document.getElementById("lightbox-img");
  const lightboxVideo = document.getElementById("lightbox-video");
  const lightboxClose = document.querySelector(".lightbox-close");

  window.toggleMenu = function () {
    document.getElementById("navLinks").classList.toggle("active");
  };

  function formatMonth(folderName) {
    const [year, month] = folderName.split("-");
    const date = new Date(year, month - 1);

    return date.toLocaleString("de-DE", {
      month: "long",
      year: "numeric"
    });
  }

  function openLightbox(src, type = "image") {
    lightbox.classList.add("active");
    document.body.style.overflow = "hidden";

    if (type === "video") {
      lightboxImg.style.display = "none";
      lightboxImg.src = "";

      lightboxVideo.style.display = "block";
      lightboxVideo.src = encodeURI(src);
      lightboxVideo.load();

      lightboxVideo.play().catch(() => {});
    } else {
      lightboxVideo.pause();
      lightboxVideo.style.display = "none";
      lightboxVideo.src = "";

      lightboxImg.style.display = "block";
      lightboxImg.src = src;
    }
  }

  function closeLightbox() {
    lightbox.classList.remove("active");
    document.body.style.overflow = "";

    lightboxImg.src = "";
    lightboxImg.style.display = "none";

    lightboxVideo.pause();
    lightboxVideo.src = "";
    lightboxVideo.style.display = "none";
  }

  lightboxClose.addEventListener("click", closeLightbox);

  lightbox.addEventListener("click", function (e) {
    if (e.target === lightbox) closeLightbox();
  });

  /* ========================= */

function formatEventTitle(name) {
  return name
    .replaceAll("-", " ")
    .replaceAll("_", " ")
    .replace(/\s+/g, " ")
    .trim()
    .replace(/\bSchuetzenfest\b/gi, "Schützenfest")
    .replace(/\bKoenig\b/gi, "König")
    .replace(/\bKroenung\b/gi, "Krönung")
    .replace(/\bJaegerfest\b/gi, "Jägerfest")
    .replace(/\bJaeger\b/gi, "Jäger")
    .replace(/\bZugschiessen\b/gi, "Zugschießen")
    .replace(/\bSchiessen\b/gi, "Schießen")
    .replace(/\bSpaetkirmes\b/gi, "Spätkirmes")
    .replace(/\bKickerturnier\b/gi, "Kickerturnier")
    .replace(/\bVatertag\b/gi, "Vatertag")
    .replace(/\bAusflug\b/gi, "Ausflug")
    .replace(/\bAk\b/g, "AK")
    .replace(/\b\w/g, char => char.toUpperCase());
}
  
  fetch("bilder/galerie/gallery.json")
    .then(response => response.json())
    .then(data => {

      container.innerHTML = "";

      const years = {};

      // Jahre gruppieren
      Object.keys(data).forEach(folder => {
        const year = folder.split("-")[0];
        if (!years[year]) years[year] = [];
        years[year].push(folder);
      });

      // Jahre sortieren
      Object.keys(years)
        .sort((a, b) => b - a)
        .forEach(year => {

          const details = document.createElement("details");
          details.className = "gallery-year";
          details.open = true;

          const summary = document.createElement("summary");
          summary.textContent = year;
          details.appendChild(summary);

          years[year]
            .sort((a, b) => new Date(b) - new Date(a))
            .forEach(folder => {

              const monthDiv = document.createElement("div");
              monthDiv.className = "gallery-month";

              const monthTitle = document.createElement("h2");
              monthTitle.textContent = formatMonth(folder);
              monthDiv.appendChild(monthTitle);

              // 👉 EVENTS durchgehen
              Object.keys(data[folder])
                .sort((a, b) => a.localeCompare(b, "de-DE", { numeric: true }))
                .forEach(eventName => {

                  const eventTitle = document.createElement("h3");
                  eventTitle.className = "gallery-event-title";
                  eventTitle.textContent = formatEventTitle(eventName);
                  monthDiv.appendChild(eventTitle);

                  const grid = document.createElement("div");
                  grid.className = "photo-grid";

                  // 👉 BILDER im Event
                  data[folder][eventName]
                    .sort((a, b) => a.localeCompare(b, undefined, { numeric: true }))
                    .forEach(file => {

                      const filePath = `bilder/galerie/${folder}/${eventName}/${file}`;
                      const isVideo = /\.(mp4|webm|mov)$/i.test(file);

                      let element;

                      if (isVideo) {
  element = document.createElement("video");
  element.controls = true;
  element.preload = "metadata";
  element.playsInline = true;
  element.muted = true;

  const source = document.createElement("source");
  source.src = encodeURI(filePath);
  source.type = file.toLowerCase().endsWith(".webm") ? "video/webm" : "video/mp4";

  element.appendChild(source);

  element.addEventListener("click", function (e) {
    e.preventDefault();
    e.stopPropagation();
    openLightbox(filePath, "video");
  });

} else {
  element = document.createElement("img");
  element.src = encodeURI(filePath);
  element.alt = `${eventName} ${monthTitle.textContent}`;
  element.loading = "lazy";

  element.addEventListener("click", function (e) {
    e.preventDefault();
    e.stopPropagation();
    openLightbox(filePath, "image");
  });
}

grid.appendChild(element);
  });
                
                  monthDiv.appendChild(grid);
                });

              details.appendChild(monthDiv);
            });

          container.appendChild(details);
        });
    })
    .catch(error => {
      console.error("Fehler beim Laden der Galerie:", error);
    });

});
