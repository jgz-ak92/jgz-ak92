function loadBanner() {
  const text = " 🍻 Schützenfest 19.06. – 24.06. – Wir freuen uns auf euch! 🍻 ";

  const banner = document.createElement("div");
  banner.className = "banner";

  banner.innerHTML = `
    ${text};

  document.body.prepend(banner);
}

document.addEventListener("DOMContentLoaded", loadBanner);
