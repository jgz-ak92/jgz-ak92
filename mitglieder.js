document.addEventListener("DOMContentLoaded", () => {


const container =
document.getElementById("mitglieder-container");


const lightbox =
document.getElementById("lightbox");

const lightboxImg =
document.getElementById("lightbox-img");

const close =
document.querySelector(".lightbox-close");



fetch("bilder/mitglieder/mitglieder.json")

.then(response => response.json())

.then(mitglieder => {


mitglieder.forEach(mitglied => {


const card =
document.createElement("div");


card.className =
"mitglied-card";



card.innerHTML = `

<img 
src="${mitglied.bild}"
alt="${mitglied.name}"
loading="lazy">


<div class="mitglied-info">

<h3>${mitglied.name}</h3>

<p>${mitglied.funktion}</p>

<small>
Mitglied seit ${mitglied.eintritt}
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
mitglied.bild;

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
