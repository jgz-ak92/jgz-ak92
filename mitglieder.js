document.addEventListener("DOMContentLoaded", () => {

  const container = document.getElementById("mitglieder-container");


  fetch("bilder/mitglieder/mitglieder.json")
    .then(response => response.json())
    .then(mitglieder => {

      container.innerHTML = "";


      mitglieder
        .sort((a, b) => a.name.localeCompare(b.name))
        .forEach(mitglied => {


          const card = document.createElement("div");
          card.className = "mitglied-card";


          card.innerHTML = `

            <img 
              src="${mitglied.bild}" 
              alt="${mitglied.name}"
              loading="lazy"
            >

            <div class="mitglied-info">

              <h3>${mitglied.name}</h3>

              <p>${mitglied.funktion}</p>

              <small>
                Mitglied seit ${mitglied.eintritt}
              </small>

            </div>

          `;


          container.appendChild(card);

        });

    })
    .catch(error => {
      console.error("Fehler beim Laden der Mitglieder:", error);
    });

});
