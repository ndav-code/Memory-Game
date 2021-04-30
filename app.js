const gameContainer = document.getElementById("game");

cardChosen = []
cardChosenId = []
const resultDisplay = document.querySelector("#result")
let score = 0
let cardId
let cards
let card1 = null;
let card2 = null;
let cardsFlipped = 0;
let noClicking = false;
resultDisplay.textContent = "Score: 0" 


const COLORS = [
    "red",
    "blue",
    "green",
    "orange",
    "purple",
    "red",
    "blue",
    "green",
    "orange",
    "purple"
];

function shuffle(array) {
    let counter = array.length;

    // While there are elements in the array
    while (counter > 0) {
        // Pick a random index
        let index = Math.floor(Math.random() * counter);

        // Decrease counter by 1
        counter--;

        // And swap the last element with it
        let temp = array[counter];
        array[counter] = array[index];
        array[index] = temp;
    }

    return array;
}

let shuffledColors = shuffle(COLORS);

// this function loops over the array of colors
// it creates a new div and gives it a class with the value of the color
// it also adds an e listener for a click for each card
function createDivsForColors(colorArray) {
    let i = 0
    for (let color of colorArray) {
        const newDiv = document.createElement("div");
        newDiv.classList.add(color);
        newDiv.addEventListener("click", handleCardClick);
        newDiv.setAttribute("data-id", i++)
        i = i++
        gameContainer.append(newDiv);
    }
}

function handleCardClick(e) {


    cardId = e.target.getAttribute("data-id")
    cards = document.querySelectorAll("div")
    cardChosen.push(COLORS[cardId])
    cardChosenId.push(cardId)
    let currentCard = e.target;

    this.style.background = COLORS[cardId]

    //   console.log(cardChosen)

    
    if (noClicking) return;

    if (currentCard.classList.contains("flipped")) return;

      resultDisplay.textContent = "Score: " + score++

    console.log(score)

    if (!card1 || !card2) {
        currentCard.classList.add("flipped");
        card1 = card1 || currentCard;
        if (currentCard === card1) { card2 = null }
        else { card2 = currentCard }

    }

    if (card1 && card2) {
        noClicking = true;

        if (card1.className === card2.className) {
            cardsFlipped += 2;
            card1.removeEventListener("click", handleCardClick);
            card2.removeEventListener("click", handleCardClick);
            card1 = null;
            card2 = null;
            noClicking = false;
        } else {
            setTimeout(function () {
                card1.style.backgroundColor = "transparent";
                card2.style.backgroundColor = "transparent";
                card1.classList.remove("flipped");
                card2.classList.remove("flipped");
                card1 = null;
                card2 = null;
                noClicking = false;
            }, 1000);
        }
    }



    if (cardsFlipped === COLORS.length) alert("game over!");
}

createDivsForColors(shuffledColors);
