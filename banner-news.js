function loadNewsBanner() {
  const text = "✨ Neuigkeiten: Unsere Galerie wurde aktualisiert – schaut gerne rein!";
 // const text = "BREAKING NEWS!!! Wir haben einen neuen Zugkönig..."<br>"Herzlichen Glückwunsch ";
 
const banner = document.createElement("div");
  banner.className = "news-banner";

  banner.innerHTML = `
    <span>${text}</span>
    <button class="news-banner-close" aria-label="Banner schließen">×</button>
  `;

  banner.querySelector(".news-banner-close").onclick = () => {
    banner.classList.add("hide");
    setTimeout(() => banner.remove(), 300);
  };

  const existingBanner = document.querySelector(".banner");
if (existingBanner) {
  existingBanner.after(banner);
} else {
  document.body.prepend(banner);
}
}

document.addEventListener("DOMContentLoaded", loadNewsBanner);
