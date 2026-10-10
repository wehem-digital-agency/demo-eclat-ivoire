/* ÉCLAT D'IVOIRE — interactions */
const PRESTATIONS = [
  { id:"visage", nom:"Soin visage éclat", cat:"visage", catTxt:"Visage", prix:"25 000 FCFA",
    duree:"60 min", img:"images/soin-visage.jpg",
    desc:"Nettoyage profond, gommage doux, masque hydratant et massage relaxant." },
  { id:"massage", nom:"Massage relaxant", cat:"corps", catTxt:"Corps", prix:"30 000 FCFA",
    duree:"60 min", img:"images/massage.jpg",
    desc:"Massage aux huiles essentielles, serviettes chaudes, ambiance zen." },
  { id:"coiffure", nom:"Tresses & coiffures", cat:"cheveux", catTxt:"Cheveux", prix:"15 000 FCFA",
    duree:"120 min", img:"images/coiffure.jpg",
    desc:"Tresses, nattes, tissages et coiffures d'événement par nos expertes." },
  { id:"manucure", nom:"Manucure & pédicure", cat:"ongles", catTxt:"Ongles", prix:"12 000 FCFA",
    duree:"90 min", img:"images/manucure.jpg",
    desc:"Soin complet des mains et des pieds, pose de vernis au choix." },
  { id:"maquillage", nom:"Maquillage événement", cat:"maquillage", catTxt:"Maquillage", prix:"20 000 FCFA",
    duree:"45 min", img:"images/maquillage.jpg",
    desc:"Maquillage jour, soirée ou mariée, avec des produits professionnels." },
  { id:"gommage", nom:"Gommage corps aux épices", cat:"corps", catTxt:"Corps", prix:"28 000 FCFA",
    duree:"45 min", img:"images/hero-spa.jpg",
    desc:"Gommage traditionnel aux épices douces, pour une peau douce et éclatante." },
];

function cartePresta(p){
  return `<article class="carte-presta reveal">
    <a href="reservation.html?prestation=${p.id}"><div class="carte-img">
      <img src="${p.img}" alt="${p.nom}" loading="lazy">
      <span class="badge">${p.catTxt}</span>
      <span class="prix-tag">${p.prix}</span>
    </div></a>
    <div class="carte-corps">
      <h3><a href="reservation.html?prestation=${p.id}">${p.nom}</a></h3>
      <p class="carte-duree">Durée : ${p.duree}</p>
      <p class="desc">${p.desc}</p>
      <a class="carte-lien" href="reservation.html?prestation=${p.id}">Réserver →</a>
    </div>
  </article>`;
}

function initCatalogue(){
  const grille = document.getElementById("grille-presta");
  if(!grille) return;
  const boutons = document.querySelectorAll(".filtre-btn");
  function afficher(cat){
    const res = PRESTATIONS.filter(p => !cat || p.cat === cat);
    grille.innerHTML = res.length ? res.map(cartePresta).join("")
      : `<p class="vide">Aucune prestation dans cette catégorie pour le moment.</p>`;
    observerReveals();
  }
  boutons.forEach(b => b.addEventListener("click", () => {
    boutons.forEach(x => x.classList.remove("actif"));
    b.classList.add("actif");
    afficher(b.dataset.cat || "");
  }));
  afficher("");
}

function initReservation(){
  const form = document.getElementById("form-resa");
  if(!form) return;
  const sel = document.getElementById("r-prestation");
  PRESTATIONS.forEach(p => {
    const o = document.createElement("option");
    o.value = p.id; o.textContent = `${p.nom} — ${p.prix}`;
    sel.appendChild(o);
  });
  const pre = new URLSearchParams(location.search).get("prestation");
  if(pre && PRESTATIONS.some(p => p.id === pre)) sel.value = pre;
  // Créneaux
  const creneaux = ["09:00","10:30","12:00","14:00","15:30","17:00"];
  const box = document.getElementById("creneaux");
  const hidden = document.getElementById("r-creneau");
  creneaux.forEach((c,i) => {
    const d = document.createElement("div");
    d.className = "creneau" + (i===0 ? " choisi" : "");
    d.textContent = c;
    d.addEventListener("click", () => {
      box.querySelectorAll(".creneau").forEach(x => x.classList.remove("choisi"));
      d.classList.add("choisi"); hidden.value = c;
    });
    box.appendChild(d);
  });
  hidden.value = creneaux[0];
  // Date min = demain
  const date = document.getElementById("r-date");
  const dem = new Date(); dem.setDate(dem.getDate()+1);
  date.min = dem.toISOString().split("T")[0];
}

function initMenu(){
  const burger = document.getElementById("burger"), nav = document.getElementById("nav");
  if(!burger) return;
  burger.addEventListener("click", () => {
    nav.classList.toggle("ouvert"); burger.classList.toggle("ouvert");
  });
}
function initHeader(){
  const h = document.getElementById("header");
  const onScroll = () => h.classList.toggle("header--scrolled", scrollY > 40);
  addEventListener("scroll", onScroll); onScroll();
}
let observer;
function observerReveals(){
  document.querySelectorAll(".reveal:not(.visible)").forEach(el => observer.observe(el));
}
function initReveals(){
  observer = new IntersectionObserver(es => es.forEach(e => {
    if(e.isIntersecting){ e.target.classList.add("visible"); observer.unobserve(e.target); }
  }), {threshold:.12});
  observerReveals();
}
function initFormulaires(){
  document.querySelectorAll("form[data-demo]").forEach(f => {
    f.addEventListener("submit", e => {
      e.preventDefault();
      f.querySelector(".form-ok").style.display = "block";
      f.querySelectorAll("input[type=text],input[type=tel],input[type=email],textarea").forEach(i => i.value = "");
      f.scrollIntoView({behavior:"smooth", block:"center"});
    });
  });
}
function initDivers(){
  const y = document.getElementById("annee"); if(y) y.textContent = new Date().getFullYear();
  const page = location.pathname.split("/").pop() || "index.html";
  document.querySelectorAll(".nav a").forEach(a => {
    if(a.getAttribute("href") === page) a.classList.add("actif");
  });
}
document.addEventListener("DOMContentLoaded", () => {
  initMenu(); initHeader(); initReveals(); initCatalogue(); initReservation(); initFormulaires(); initDivers();
});
