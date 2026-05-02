function loadRotatingBanner() {
//  const messages = ["🍻 Schützenfest 19.06. – 24.06. – Wir freuen uns auf euch! 🍻","✨ Neuigkeiten: Unsere Galerie wurde aktualisiert – schaut gerne rein! ✨"];

 const messages = ["🍻 Schützenfest 19.06. – 24.06. – Wir freuen uns auf euch! 🍻", "BREAKING NEWS!!! Wir haben einen neuen Zugkönig...<br>👑 Herzlichen Glückwunsch, Sascha II. Vidahl 👑"];

  let index = 0;

  const banner = document.createElement("div");
  banner.className = "banner";

  const textSpan = document.createElement("span");
  textSpan.className = "banner-slide-text";
  banner.appendChild(textSpan);

  function showMessage() {
    textSpan.classList.remove("slide-in");
    textSpan.classList.add("slide-out");

    setTimeout(() => {
      textSpan.innerHTML = messages[index];
      textSpan.classList.remove("slide-out");
      textSpan.classList.add("slide-in");

      index = (index + 1) % messages.length;
    }, 300);
  }

  showMessage();
  setInterval(showMessage, 5000);

  document.body.prepend(banner);
}

document.addEventListener("DOMContentLoaded", loadRotatingBanner);
