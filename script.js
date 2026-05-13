const gallery = document.getElementById("gallery");

let currentIndex = 0;

cards.forEach((card, index) => {

  const div = document.createElement("div");

  div.className = "card";

div.innerHTML = `
  <img
    class="gallery-card"
    loading="lazy"
    src="${card.image}"
    alt="${card.name}">
`;

  div.onclick = () => {

    currentIndex = index;

    openModal(card);
  };

  gallery.appendChild(div);
});

function openModal(card) {

  document.getElementById("modal")
  .classList.remove("hidden");

  document.getElementById("modal-card-image").src =
  card.image;

  document.getElementById("modal-title").innerText =
  `${card.name}, ${card.oc}`;

  document.getElementById("modal-description").innerText =
  card.description;

  document.getElementById("modal-artist").innerText =
  card.artist;

  const upright =
  document.getElementById("upright-tags");

  upright.innerHTML = "";

  card.upright.forEach(word => {

    const tag = document.createElement("span");

    tag.innerText = word;

    upright.appendChild(tag);
  });

  const reversal =
  document.getElementById("reversal-tags");

  reversal.innerHTML = "";

  card.reversal.forEach(word => {

    const tag = document.createElement("span");

    tag.innerText = word;

    reversal.appendChild(tag);
  });

const cardContainer =
document.getElementById("card-container");

cardContainer.classList.remove("flipped");

}

function closeModal() {

  document.getElementById("modal")
  .classList.add("hidden");
}

function nextCard() {

  currentIndex++;

  if (currentIndex >= cards.length) {
    currentIndex = 0;
  }

  openModal(cards[currentIndex]);
}

function previousCard() {

  currentIndex--;

  if (currentIndex < 0) {
    currentIndex = cards.length - 1;
  }

  openModal(cards[currentIndex]);
}

let touchStartX = 0;
let touchEndX = 0;

const modal = document.getElementById("modal");

modal.addEventListener("touchstart", e => {

  touchStartX = e.changedTouches[0].screenX;
});

modal.addEventListener("touchend", e => {

  touchEndX = e.changedTouches[0].screenX;

  handleSwipe();
});

function handleSwipe() {

  if (touchEndX < touchStartX - 50) {
    nextCard();
  }

  if (touchEndX > touchStartX + 50) {
    previousCard();
  }
}

window.addEventListener("keydown", e => {

  if (e.key === "Escape") {
    closeModal();
  }

  if (e.key === "ArrowRight") {
    nextCard();
  }

  if (e.key === "ArrowLeft") {
    previousCard();
  }
});