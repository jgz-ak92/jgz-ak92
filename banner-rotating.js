function loadRotatingBanner() {

  const messages = [
    "🍻 Schützenfest 19.06. – 24.06. – Wir freuen uns auf euch! 🍻",
    "Wir haben einen neuen Zugkönig...👑 Sascha II. Vidahl 👑",
"BREAKING NEWS!!! Auch die Damen haben auf den Vogel geschossen! Herzlichen Glückwunsch, 👑 Julia Pulver 👑
    " Ein neuer Corpskönig wurde ebenfalls ermittelt, er erringt die Würde bereits zum 2. Mal... Alles Gute, 👑 Sven I. Rommerskirchen 👑
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
      textSpan.textContent = messages[index];
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
