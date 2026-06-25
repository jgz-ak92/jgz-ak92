function formatFunktion(text) {
    if (!text) return "";

    return text
        .replace(/oe/gi, "ö")
        .replace(/ae/gi, "ä")
        .replace(/ue/gi, "ü")
        .replace(/-und-/gi, " & ")
        .replace(/(^|[\s&-])([a-zäöüß])/g, function(match, trennzeichen, buchstabe) {
            return trennzeichen + buchstabe.toUpperCase();
        });
}

function formatName(text) {
    if (!text) return "";

    return text
        .replace(/oe/g, "ö")
        .replace(/ae/g, "ä")
        .replace(/ue/g, "ü")
        .replace(/(^|[-\s(])([a-zäöüß])/g, function(match, trennzeichen, buchstabe) {
            return trennzeichen + buchstabe.toUpperCase();
        });
}

function formatEintritt(eintritt) {
    if (!eintritt) return "";

    return eintritt.replace(/^(\d{4})\s*(.*)$/,"$1<br>$2");
}

document.addEventListener("DOMContentLoaded", () => {


const container =
document.getElementById("mitglieder-container");


const lightbox =
document.getElementById("lightbox");

const lightboxImg =
document.getElementById("lightbox-img");

const close =
document.querySelector(".lightbox-close");



fetch("../bilder/mitglieder/mitglieder.json")

.then(response => response.json())

.then(mitglieder => {

    mitglieder.sort((a, b) => {
    const sortA = parseInt(a.bild.match(/_(\d+)\.[^.]+$/)?.[1] || 999);
    const sortB = parseInt(b.bild.match(/_(\d+)\.[^.]+$/)?.[1] || 999);

    return sortA - sortB;
});

mitglieder.forEach(mitglied => {


const card =
document.createElement("div");


card.className =
"mitglied-card";



card.innerHTML = `

<img 
src="../${encodeURI(mitglied.bild)}"
alt="${mitglied.name}"
loading="lazy">


<div class="mitglied-info">

<h3>${formatName(mitglied.name)}</h3>

<p>${formatFunktion(mitglied.funktion)}</p>

<small>
Mitglied seit ${formatEintritt(mitglied.eintritt)}
</small>

</div>

`;



const img =
card.querySelector("img");


img.addEventListener(
"click",
() => {

lightbox.classList.add("active");

lightboxImg.src =
encodeURI("../" + mitglied.bild);

});



container.appendChild(card);



});


});



close.addEventListener(
"click",
() => {

lightbox.classList.remove("active");

lightboxImg.src="";

});



lightbox.addEventListener(
"click",
(e)=>{

if(e.target === lightbox){

lightbox.classList.remove("active");

lightboxImg.src="";

}

});



});
