function loadBanner() {
  const text = " 🍻 Schützenfest 19.06. – 24.06. – Wir freuen uns auf euch! 🍻 ";

  const banner = document.createElement("div");
  banner.className = "banner";

  banner.innerHTML = `
    ${text}
    <span class="banner-close" onclick="this.parentElement.remove()">✕</span>
  `;

  document.body.prepend(banner);
}

document.addEventListener("DOMContentLoaded", loadBanner);
