let cardsAmount
let firstCard
let secondCard
let guessed = 0
let timesPlayed = 0
const cards = []
const images = ["bobrossparrot", "explodyparrot", "fiestaparrot", "metalparrot", "revertitparrot", "tripletsparrot", "unicornparrot"]

function selectCardsAmount() {
    // while (isNaN(cardsAmount) || cardsAmount % 2 !== 0 || cardsAmount < 4 || cardsAmount > 14) {
    //     cardsAmount = Number(prompt("Com quantas cartas você quer jogar?"))
    // }
    cardsAmount = 6

    populateArray()
    showCards()
}

function populateArray() {
    function comparador() {
        return Math.random() - 0.5;
    }

    images.sort(comparador)

    for (let i = 0; i < cardsAmount / 2; i++) {
        cards.push(images[i])
        cards.push(images[i])
    }

    cards.sort(comparador)
}

function showCards() {
    const container = document.querySelector(".cards-container")
    container.innerHTML = ""

    for (let i = 0; i < cards.length; i++) {
        container.innerHTML += `
            <li class="card" onclick="openCard(this)">
                <div class="front-face face">
                    <img src="./assets/front.png"/>
                </div>
                <div class="back-face face">
                    <img src="./assets/${cards[i]}.gif"/>
                </div>
            </li>
        `
    }
}

function openCard(clickedCard) {
    if (clickedCard.classList.contains("turned")) return

    timesPlayed++

    if (firstCard === undefined) {
        firstCard = clickedCard
        clickedCard.classList.add("turned")
    } else {
        if (secondCard === undefined) {
            secondCard = clickedCard
            clickedCard.classList.add("turned")
        }

        if (firstCard.innerHTML === secondCard.innerHTML) {
            guessed += 2
            firstCard = undefined
            secondCard = undefined
            isGameFinished()
        } else {
            setTimeout(closeCards, 1000)
        }
    }
}

function closeCards() {
    firstCard.classList.remove("turned")
    secondCard.classList.remove("turned")

    firstCard = undefined
    secondCard = undefined
}

function isGameFinished() {
    if (guessed === cardsAmount) {
        alert(`Parabéns, você ganhou em ${timesPlayed} jogadas!`)
    }
}

selectCardsAmount()