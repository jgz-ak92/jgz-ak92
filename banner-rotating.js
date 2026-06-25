function loadRotatingBanner() {

  const messages = [
    "Schützenfest 2026<br>☀️ Brutal heiß, aber es war trotzdem wieder schön ☀️",
    "BREAKING NEWS!!! Wir haben einen neuen Kronprinzen, Björn II. '"Stocki"' Stockdreher",
  ];
 
  
  let index = 0;

  const banner = document.createElement("div");
  banner.className = "banner";

  const textSpan = document.createElement("span");
  textSpan.className = "banner-slide-text";

  banner.appendChild(textSpan);
  document.body.prepend(banner);

  function showMessage() {
    textSpan.classList.remove("slide-in");
    textSpan.classList.add("slide-out");

    setTimeout(() => {
      textSpan.innerHTML = messages[index];
      textSpan.classList.remove("slide-out");

      // Animation sicher neu starten
      void textSpan.offsetWidth;

      textSpan.classList.add("slide-in");

      index = (index + 1) % messages.length;
    }, 300);
  }

  showMessage();
  setInterval(showMessage, 5000);
}

document.addEventListener("DOMContentLoaded", loadRotatingBanner);
