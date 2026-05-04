document.addEventListener("DOMContentLoaded", () => {
const lightbox = document.getElementById("lightbox");
const lightboxImg = document.getElementById("lightbox-img");
const lightboxVideo = document.getElementById("lightbox-video");
const lightboxClose = document.querySelector(".lightbox-close");

window.toggleMenu = function() {
  document.getElementById("navLinks").classList.toggle("active");
};

function openLightbox(src, alt, type = "image") {
  lightbox.classList.add("active");
  document.body.style.overflow = "hidden";

  if (type === "video") {
    lightboxImg.style.display = "none";
    lightboxImg.src = "";

    lightboxVideo.style.display = "block";
    lightboxVideo.src = encodeURI(src);
    lightboxVideo.load();

    lightboxVideo.play().catch(error => {
    console.log("Video konnte nicht automatisch starten:", error);
    });
  } else {
    lightboxVideo.pause();
    lightboxVideo.style.display = "none";
    lightboxVideo.src = "";

    lightboxImg.style.display = "block";
    lightboxImg.src = src;
    lightboxImg.alt = alt || "Großansicht";
  }
}

function closeLightbox() {
  lightbox.classList.remove("active");

  lightboxImg.src = "";
  lightboxImg.style.display = "none";

  lightboxVideo.pause();
  lightboxVideo.src = "";
  lightboxVideo.style.display = "none";

  document.body.style.overflow = "";
}

lightboxClose.addEventListener("click", closeLightbox);
lightboxClose.addEventListener("touchend", closeLightbox);

lightbox.addEventListener("click", function(e) {
  if (e.target === lightbox) closeLightbox();
});

function formatMonth(folderName) {
  const [year, month] = folderName.split("-");
  const date = new Date(year, month - 1);

  return date.toLocaleString("de-DE", {
    month: "long",
    year: "numeric"
  });
}

fetch("bilder/galerie/gallery.json")
  .then(response => response.json())
  .then(data => {
    const container = document.getElementById("gallery-container");

    const years = {};

    Object.keys(data).forEach(folder => {
      const year = folder.split("-")[0];
      if (!years[year]) years[year] = [];
      years[year].push(folder);
    });

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

            const title = document.createElement("h2");
            title.textContent = formatMonth(folder);
            monthDiv.appendChild(title);

            Object.keys(data[folder])
              .sort((a, b) => a.localeCompare(b, "de-DE", { numeric: true }))
              .forEach(eventName => {

                const eventTitle = document.createElement("h3");
                eventTitle.className = "gallery-event-title";
                eventTitle.textContent = eventName.replaceAll("-", " ");
                monthDiv.appendChild(eventTitle);

                const grid = document.createElement("div");
                grid.className = "photo-grid";

                data[folder][eventName]
                  .sort((a, b) => a.localeCompare(b, undefined, { numeric: true }))
                  .forEach(file => {

                    const filePath = `bilder/galerie/${folder}/${eventName}/${file}`;
const isVideo = file.match(/\.(mp4|webm|mov)$/i);

let element;

if (isVideo) {
  element = document.createElement("video");

  const source = document.createElement("source");
  source.src = encodeURI(filePath);
  source.type = "video/mp4";

  element.appendChild(source);

  element.controls = true;
  element.preload = "metadata";
  element.muted = true;
  element.playsInline = true;

  element.addEventListener("click", function(e) {
    e.preventDefault();
    e.stopPropagation();
    openLightbox(filePath, `${eventName} ${title.textContent}`, "video");
  });

} else {
  element = document.createElement("img");
  element.src = filePath;
  element.alt = `${eventName} ${title.textContent}`;
  element.loading = "lazy";

  element.addEventListener("click", function(e) {
    e.preventDefault();
    e.stopPropagation();
    openLightbox(this.currentSrc || this.src, this.alt, "image");
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
