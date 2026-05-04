const termine = [
  {
    monat: "Mai 2026",
    items: [
      {
        datum: "16.05.2026 14:30",
        titel: "Jägerfest",
        ort: "Alter Sportplatz Hoisten"
      }
    ]
  },
  {
    monat: "Juni 2026",
    items: [
      {
        datum: "19.06.2026 - 24.06.2026",
        titel: "Schützenfest",
        ort: "Weitere Informationen werden rechtzeitig bekanntgegeben."
      }
    ]
  },
  {
    monat: "Juli 2026",
    items: [
      {
        datum: "18.07.2026",
        titel: "Bezirkskönigsschießen",
        ort: "Alter Sportplatz Hoisten"
      }
    ]
  },
  {
    monat: "Oktober 2026",
    items: [
      {
        datum: "10.10.2026 / 11.10.2026",
        titel: "Spätkirmes in Hoisten",
        ort: "Weitere Informationen werden rechtzeitig bekanntgegeben."
      }
    ]
  },
  {
    monat: "Dezember 2026",
    items: [
      {
        datum: "05.12.2026",
        titel: "Alljährliches Kickerturnier",
        ort: ""
      }
    ]
  }
];

const termineContainer = document.getElementById("termine-container");

termine.forEach(monatsgruppe => {
  const eventBox = document.createElement("div");
  eventBox.className = "event event-month-group";

  eventBox.innerHTML = `
    <div class="event-month">${monatsgruppe.monat}</div>
  `;

  monatsgruppe.items.forEach(termin => {
    const item = document.createElement("div");
    item.className = "event-item";

    item.innerHTML = `
      <div class="event-title">${termin.datum}</div>
      <p>${termin.titel}</p>
      ${termin.ort ? `<p style="color: gray;">${termin.ort}</p>` : ""}
    `;

    eventBox.appendChild(item);
  });

  termineContainer.appendChild(eventBox);
});
