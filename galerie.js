document.addEventListener("DOMContentLoaded", () => {

const container = document.getElementById("gallery-container");

window.toggleMenu = function() {
  document.getElementById("navLinks").classList.toggle("active");
};

const lightbox = document.getElementById("lightbox");
const lightboxImg = document.getElementById("lightbox-img");
const lightboxVideo = document.getElementById("lightbox-video");

function openLightbox(src, type) {
  lightbox.classList.add("active");

  if (type === "video") {
    lightboxImg.style.display = "none";
    lightboxVideo.style.display = "block";
    lightboxVideo.src = src;
    lightboxVideo.play();
  } else {
    lightboxVideo.style.display = "none";
    lightboxImg.style.display = "block";
    lightboxImg.src = src;
  }
}

lightbox.addEventListener("click", () => {
  lightbox.classList.remove("active");
  lightboxVideo.pause();
});

/* Galerie laden */

fetch("bilder/galerie/gallery.json")
  .then(res => res.json())
  .then(data => {

    Object.keys(data).forEach(folder => {

      const grid = document.createElement("div");
      grid.className = "photo-grid";

      data[folder].forEach(file => {

        const path = `bilder/galerie/${folder}/${file}`;
        const isVideo = file.match(/\.(mp4|webm)$/i);

        let el;

        if (isVideo) {
          el = document.createElement("video");
          el.src = path;
        } else {
          el = document.createElement("img");
          el.src = path;
        }

        el.addEventListener("click", () => {
          openLightbox(path, isVideo ? "video" : "image");
        });

        grid.appendChild(el);
      });

      container.appendChild(grid);
    });

  });

});
