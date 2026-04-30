function loadBanner() {
  const text = "BREAKING NEWS!!! Wir haben einen neuen Zugkönig..."<br>"Herzlichen Glückwunsch ";
 

  const banner = document.createElement("div");
  banner.className = "banner";

  banner.innerHTML = `
    ${text}
    <span class="banner-close" onclick="this.parentElement.remove()">✕</span>
  `;

  document.body.prepend(banner);
}

document.addEventListener("DOMContentLoaded", loadBanner);
