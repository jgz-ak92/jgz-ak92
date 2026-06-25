document.addEventListener("DOMContentLoaded", () => {

  fetch("mitglieder.json")
    .then(response => response.json())
    .then(mitglieder => {

      const container = document.getElementById("mitglieder-container");

      mitglieder.forEach(mitglied => {

        const card = document.createElement("div");
        card.className = "mitglied-card";

        card.innerHTML = `
          <img src="${mitglied.bild}" alt="${mitglied.name}">
          <div class="mitglied-info">
            <h3>${mitglied.name}</h3>
            <p>${mitglied.funktion}</p>
          </div>
        `;

        container.appendChild(card);

      });

    })
    .catch(error => {
      console.error("Fehler beim Laden der Mitglieder:", error);
    });

});
