class Card {
    constructor(name, url, description, id, provider) {
        this.name = name;
        this.url = url;
        this.description = description;
        this.id = id;
        this.provider = provider;
    }
}

function setStartCards () {
    deleteAllCards();
    let first_book = new Card("Жизнь взаймы, или У неба любимчиков нет", "https://content.img-gorod.ru/nomenclature/26/827/2682724.jpg?width=310&height=500&fit=bounds", "Грустная про любовь", 1, "Neoclassic");
    let second_book = new Card("Мастер и Маргарита", "https://content.img-gorod.ru/nomenclature/28/136/2813682-1.jpg?width=310&height=500&fit=bounds", "Про любовь и немножко про шизу", 2, "Эксмо");
    let third_book = new Card("Грозовой перевал", "https://content.img-gorod.ru/nomenclature/27/659/2765951.jpg?width=310&height=500&fit=bounds", "Тоже про любовь", 3, "Эксмо");
    let fourth_book = new Card("Дневник памяти", "https://content.img-gorod.ru/nomenclature/26/510/2651019-2.jpg?width=310&height=500&fit=bounds", "Вы удивитесь, но эта тоже про любовь", 4, "Neoclassic");
    let array = [first_book, second_book, third_book, fourth_book];
    try {
        updateLocalStorage(array);
        renderCards();
    } catch {
        alert("Невозможно загрузить исходные карточки");
    }
}

function renderCards () {
    let cards = JSON.parse(window.localStorage.getItem("cards"));
    if (!cards) return;
    for (let i = cards.length - 1; i >= 0; --i) {
        let card = cards[i];
        
        const divOneCard = document.createElement("div");
        divOneCard.id = `card${i}`;
        divOneCard.setAttribute('class', "one-card");
        document.getElementsByClassName("card-list-list")[0].appendChild(divOneCard);

        const divOneCardButtons = document.createElement("div");
        divOneCardButtons.id = `oneCardButtons${i}`;
        divOneCardButtons.setAttribute('class', "one-card-buttons");
        document.getElementById(`card${i}`).appendChild(divOneCardButtons);

        const editCardButton = document.createElement("button");
        editCardButton.id = `editCardButton${i}`;
        editCardButton.setAttribute('class', "change-card-button");
        editCardButton.choose = `${card.id}`;
        editCardButton.addEventListener('click', transferData);
        document.getElementById(`oneCardButtons${i}`).appendChild(editCardButton);

        const deleteCardButton = document.createElement("button");
        deleteCardButton.id = `deleteCardButton${i}`;
        deleteCardButton.setAttribute('class', "change-card-button");
        deleteCardButton.choose = `${card.id}`;
        deleteCardButton.addEventListener('click', deleteOneCard);
        document.getElementById(`oneCardButtons${i}`).appendChild(deleteCardButton);

        const iEditButton = document.createElement("i");
        iEditButton.id = `iEditButton${i}`;
        iEditButton.setAttribute('class', "fa fa-pencil change-card-button");
        iEditButton.choose = `${card.id}`;
        document.getElementById(`editCardButton${i}`).appendChild(iEditButton);

        const iDeleteButton = document.createElement("i");
        iDeleteButton.id = `iDeleteButton${i}`;
        iDeleteButton.setAttribute('class', "fa fa-trash change-card-button");
        iDeleteButton.choose = `${card.id}`;
        document.getElementById(`deleteCardButton${i}`).appendChild(iDeleteButton);

        const divOneCardInfo = document.createElement("div");
        divOneCardInfo.id = `oneCardInfo${i}`;
        divOneCardInfo.setAttribute('class', "one-card-info");
        document.getElementById(`card${i}`).appendChild(divOneCardInfo);

        const cardImage = document.createElement("img");
        cardImage.id = `cardImage${i}`;
        cardImage.setAttribute('class', "card-image");
        cardImage.src = `${card.url}`;
        document.getElementById(`oneCardInfo${i}`).appendChild(cardImage);

        const divCardInfo = document.createElement("div");
        divCardInfo.id = `cardInfo${i}`;
        divCardInfo.setAttribute('class', "card-info");
        document.getElementById(`oneCardInfo${i}`).appendChild(divCardInfo);

        const cardName = document.createElement("p");
        cardName.id = `cardName${i}`;
        cardName.setAttribute('class', "card-name");
        cardName.textContent = `${card.name}`;
        document.getElementById(`cardInfo${i}`).appendChild(cardName);

        const divCardMoreInfo = document.createElement("div");
        divCardMoreInfo.id = `cardMoreInfo${i}`;
        divCardMoreInfo.setAttribute('class', "card-more-info");
        document.getElementById(`cardInfo${i}`).appendChild(divCardMoreInfo);

        const cardId = document.createElement("p");
        cardId.id = `cardId${i}`;
        cardId.setAttribute('class', "card-id");
        cardId.textContent = `ID: ${card.id}`;
        document.getElementById(`cardMoreInfo${i}`).appendChild(cardId);

        const cardProvider = document.createElement("p");
        cardProvider.id = `cardProvider${i}`;
        cardProvider.setAttribute('class', "card-provider");
        cardProvider.textContent = `Поставщик: ${card.provider}`;
        document.getElementById(`cardMoreInfo${i}`).appendChild(cardProvider);

        const divOneCardDescription = document.createElement("div");
        divOneCardDescription.id = `oneCardDescription${i}`;
        divOneCardDescription.setAttribute('class', "one-card-description");
        document.getElementById(`card${i}`).appendChild(divOneCardDescription);

        const cardDescription = document.createElement("p");
        cardDescription.id = `cardDescription${i}`;
        cardDescription.setAttribute('class', "card-description");
        cardDescription.textContent = `${card.description}`;
        document.getElementById(`oneCardDescription${i}`).appendChild(cardDescription);
    }
}

function saveFormData(form, data) {
    const formData = Array.from((new FormData(form)).entries());
    let card = data;
    for (let i = 0; i < formData.length; ++i) {
        let [key, value] = formData[i];
        if (key == 'name') card.name = value;
        if (key == 'url') card.url = value;
        if (key == 'description') card.description = value;
        if (key == 'id') card.id = value;
        if (key == 'provider') card.provider = value;
    }
    let cards = JSON.parse(window.localStorage.getItem("cards"));
    for (let cd of cards) {
        if (!card.name || !card.url || !card.description || !card.id || !card.provider) {
            alert("Все поля карточки должны быть заполнены!");
            return 0;
        }
        if (JSON.stringify(card) === JSON.stringify(cd)) {
            alert("Такая карточка уже есть!");
            return 0;
        }
        if (card.id == cd.id) {
            alert("Id должен быть уникальным!");
            return 0;
        }
        if (card.id <= 0) {
            alert("Id должен быть положительным числом!");
            return 0;
        }
    }
    return card;
}

function addNewCard(event) {
    let formData = document.getElementsByClassName('new-card-form')[0];
    let card = saveFormData(formData, new Card());
    if (card == 0) return;
    let cards = JSON.parse(window.localStorage.getItem("cards"));
    cards.push(card);
    updateLocalStorage(cards);
}

function transferData(event) {
    document.getElementById('add_card').classList.add('invisible');
    document.getElementById('edit_card').classList.remove('invisible');
    document.getElementById('add_title').classList.add('invisible');
    document.getElementById('edit_title').classList.remove('invisible');
    let cards = JSON.parse(window.localStorage.getItem("cards"));
    let card = cards.find(card => card.id == event.target.choose);
    document.getElementById('edit_card').choose = event.target.choose;
    document.getElementsByName('name')[0].value = card.name;
    document.getElementsByName('url')[0].value = card.url;
    document.getElementsByName('description')[0].value = card.description;
    document.getElementsByName('id')[0].value = card.id;
    document.getElementsByName('provider')[0].value = card.provider;
}

function editOneCard(event) {
    let formData = document.getElementsByClassName('new-card-form')[0];
    let cards = JSON.parse(window.localStorage.getItem("cards"));
    let index = cards.findIndex(card => card.id == event.target.choose);
    let f_card = cards.find(card => card.id == event.target.choose);
    let card = saveFormData(formData, f_card);
    cards[index] = card;
    updateLocalStorage(cards);
    document.getElementById('edit_card').classList.add('invisible');
    document.getElementById('add_card').classList.remove('invisible');
    document.getElementById('edit_title').classList.add('invisible');
    document.getElementById('add_title').classList.remove('invisible');
}

function deleteOneCard(event) {
    let cards = JSON.parse(window.localStorage.getItem("cards"));
    let findInd = cards.findIndex(card => card.id == event.target.choose);
    cards.splice(findInd, 1);
    updateLocalStorage(cards);
    location.reload();
}

function deleteAllCards() {
    let cards = JSON.parse(window.localStorage.getItem("cards"));
    cards.splice(0, cards.length);
    updateLocalStorage(cards);
    location.reload();
}

function updateLocalStorage(cards) {
    window.localStorage.clear();
    window.localStorage.setItem('cards', JSON.stringify(cards));
}

const startValuesButton = document.getElementsByClassName('start-values-button')[0];
const addButton = document.getElementById('add_card');
const editButton = document.getElementById('edit_card');
startValuesButton.addEventListener('click', setStartCards);
addButton.addEventListener('click', addNewCard);
editButton.addEventListener('click', editOneCard);
window.onload = renderCards;