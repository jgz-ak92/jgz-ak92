function loadBanner() {
  const text = "BREAKING NEWS!!! Wir haben einen neuen Zugkönig..."<br>"Herzlichen Glückwunsch ";
 
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

  document.body.prepend(banner);
}

document.addEventListener("DOMContentLoaded", loadNewsBanner);
