function loadRotatingBanner() {
  // const messages = ["🍻 Schützenfest 19.06. – 24.06. – Wir freuen uns auf euch! 🍻","✨ Neuigkeiten: Unsere Galerie wurde aktualisiert – schaut gerne rein! ✨"];

  const messages = ["🍻 Schützenfest 19.06. – 24.06. – Wir freuen uns auf euch!", "BREAKING NEWS!!! Wir haben einen neuen Zugkönig..."<br>"Herzlichen Glückwunsch "];

  let index = 0;

  const banner = document.createElement("div");
  banner.className = "banner";

  const textSpan = document.createElement("span");
  banner.appendChild(textSpan);

  function showMessage(i) {
    textSpan.style.opacity = 0;

    setTimeout(() => {
      textSpan.textContent = messages[i];
      textSpan.style.opacity = 1;
    }, 300);
  }

  showMessage(index);

  setInterval(() => {
    index = (index + 1) % messages.length;
    showMessage(index);
  }, 4000);

  document.body.prepend(banner);
}

document.addEventListener("DOMContentLoaded", loadRotatingBanner);
