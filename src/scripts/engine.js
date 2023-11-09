const cardImagePath = "./src/assets/icons/";

const cardsData = [
  {
    id: 0,
    name: "Exodia, O Proibido",
    attribute: "Pedra",
    img: `${cardImagePath}exodia.png`,
  },
  {
    id: 1,
    name: "Dragão Branco de Olhos Azuis",
    attribute: "Tesoura",
    img: `${cardImagePath}dragon.png`,
  },
  {
    id: 2,
    name: "Mago Negro",
    attribute: "Papel",
    img: `${cardImagePath}magician.png`,
  },
];

const state = {
  view: {
    scoreBox: document.getElementById("score-box"),
    card: {
      name: document.getElementById("card-name"),
      attribute: document.getElementById("card-attribute"),
      image: document.getElementById("card-image"),
    },
    fieldSide: {
      player: document.getElementById("player-cards"),
      enemy: document.getElementById("enemy-cards"),
    },
    battlefieldCards: {
      player: document.getElementById("player-card-field"),
      enemy: document.getElementById("enemy-card-field"),
    },
    nextDuelButton: document.getElementById("next-duel-button"),
  },
  values: {
    playerScore: 0,
    enemyScore: 0,
    attributes: {
      str: { beats: "dex", losesTo: "int" },
      dex: { beats: "int", losesTo: "str" },
      int: { beats: "str", losesTo: "dex" },
    },
  },
};

const { view, values } = state;

function determineWinner(playerCardId, enemyCardId) {
  const { attributes } = values;

  const playerAttribute = cardsData[playerCardId].attribute;
  const enemyAttribute = cardsData[enemyCardId].attribute;

  if (attributes[playerAttribute].beats === enemyAttribute) {
    return "Player wins!";
  } else if (attributes[playerAttribute].losesTo === enemyAttribute) {
    return "Enemy wins!";
  } else {
    return "It's a tie!";
  }
}

const getRandomCardId = () => {
  const randomIndex = Math.floor(Math.random() * cardsData.length);
  return cardsData[randomIndex].id;
};

const drawSelectedCard = (cardIndex) => {
  view.card.name.innerText = cardsData[cardIndex].name;
  view.card.attribute.innerText = `Atributo:${cardsData[cardIndex].attribute}`;
  view.card.image.src = cardsData[cardIndex].img;
};

const setBattlefieldCardsImage = (playerCardId, enemyCardId) => {
  view.battlefieldCards.player.src = cardsData[cardId].img;
  view.battlefieldCards.enemy.src = cardsData[enemyCardId].img;
};

const setCardsField = (cardId) => {
  hideAllCards();

  let enemyCardId = getRandomCardId();

  view.fieldSide.player.style.display = "block";
  view.fieldSide.enemy.style.display = "block";

  setBattlefieldCardsImage(cardId, enemyCardId);

  determineWinner(cardId, enemyCardId);
  updateScore();
};

const createCardImage = (cardId, fieldSide) => {
  const cardImage = document.createElement("img");

  cardImage.classList.add("card");
  cardImage.setAttribute("src", `${cardImagePath}card-back.png`);
  cardImage.setAttribute("data-id", cardId);

  if (fieldSide === "player") {
    cardImage.classList.add("player-card");

    cardImage.addEventListener("mouseover", () => drawSelectedCard(cardId));

    cardImage.addEventListener("click", () =>
      setCardsField(cardImage.getAttribute("data-id"))
    );
  }

  return cardImage;
};

const drawCards = (cardsQuantity, fieldSide) => {
  for (let i = 0; i < cardsQuantity; i += 1) {
    const randomCardId = getRandomCardId();
    const cardImage = createCardImage(randomCardId, fieldSide);

    view.fieldSide[fieldSide].appendChild(cardImage);
  }
};

const init = () => {
  drawCards(5, "player");
  drawCards(5, "enemy");
};

init();
