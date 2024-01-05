class Card {
    constructor(id, name, url, description, provider) {
        this.id = id;
        this.name = name;
        this.url = url;
        this.description = description;
        this.provider = provider;
    }
}

async function setAboutMeInfo() {
    loaderON();
    try {
        let aboutMeInfo = await fetch('http://localhost:3000/about_me').then(res =>  res.json());
        document.getElementsByClassName("name-group")[0].textContent = aboutMeInfo.group + " " + aboutMeInfo.name;
    } catch (error) {
        alert("Ошибка в запросе информации о создателе приложения: " + error);
    }
    loaderOFF();
}

function loaderON() {
    document.getElementsByTagName("header")[0].classList.add('blur');
    document.getElementsByClassName("new-card")[0].classList.add('blur');
    document.getElementsByClassName("main-sep-line")[0].classList.add('blur');
    document.getElementsByClassName("card-list")[0].classList.add('blur');
    document.getElementsByClassName("loader")[0].classList.remove('invisible');
    document.getElementsByClassName("start-values-button")[0].setAttribute('disabled', '');
    document.getElementById("add_card").setAttribute('disabled', '');
    document.getElementById("edit_card").setAttribute('disabled', '');
    document.getElementById("edit").setAttribute('disabled', '');
    document.getElementById("delete").setAttribute('disabled', '');
}

function loaderOFF() {
    document.getElementsByTagName("header")[0].classList.remove('blur');
    document.getElementsByClassName("new-card")[0].classList.remove('blur');
    document.getElementsByClassName("main-sep-line")[0].classList.remove('blur');
    document.getElementsByClassName("card-list")[0].classList.remove('blur');
    document.getElementsByClassName("loader")[0].classList.add('invisible');
    document.getElementsByClassName("start-values-button")[0].removeAttribute('disabled', '');
    document.getElementById("add_card").removeAttribute('disabled', '');
    document.getElementById("edit_card").removeAttribute('disabled', '');
    document.getElementById("edit").removeAttribute('disabled', '');
    document.getElementById("delete").removeAttribute('disabled', '');
}

async function setStartCards() {
    await deleteAllCards();
    loaderON();
    let skeletons = document.getElementsByClassName('skeleton');
    for (let i = 0; i < skeletons.length; ++i){
        skeletons[i].classList.remove('invisible');
    }
    try {
        for (let i = 0; i < array.length; ++i){
            await fetch('http://localhost:3000/cards', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json;charset=utf-8' },
                body: JSON.stringify(array[i])
            })
        }
    } catch(error) {
        alert("Невозможно загрузить исходные карточки, попробуйте снова");
    }
    loaderOFF();
    await renderAllCards();
}

function renderOneCard(card, i) {

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

async function renderAllCards() {
    loaderON();
    let skeletons = document.getElementsByClassName('skeleton');
    for (let i = 0; i < skeletons.length; ++i) {
        skeletons[i].classList.add('invisible');
    }
    try {
        let cards = await fetch('http://localhost:3000/cards').then(res => res.json());
        if (!cards) return;
        for (let i = cards.length - 1; i >= 0; --i) {
            let card = cards[i];
            renderOneCard(card, card.id);
        }
    } catch (error) {
        alert("Ошибка получения карточек с сервера:" + error);
    }
    loaderOFF();
}

async function saveFormData(form, data) {
    const formData = Array.from((new FormData(form)).entries());
    let flag = "edit";
    if (typeof(data.id) == undefined) flag = "add";
    let card = data;
    for (let i = 0; i < formData.length; ++i) {
        let [key, value] = formData[i];
        if (key == 'id') card.id = value;
        if (key == 'name') card.name = value;
        if (key == 'url') card.url = value;
        if (key == 'description') card.description = value;
        if (key == 'provider') card.provider = value;
    }
    loaderON();
    let cards = await fetch('http://localhost:3000/cards').then(res => res.json())
    for (let cd of cards) {
        if (!card.name || !card.url || !card.description || !card.id || !card.provider) {
            alert("Все поля карточки должны быть заполнены!");
            card = 0;
        }
        if (JSON.stringify(card) === JSON.stringify(cd)) {
            alert("Такая карточка уже есть!");
            card = 0;
        }
        if (card.id == cd.id && flag == "add") {
            alert("Id должен быть уникальным!");
            card = 0;
        }
        if (card.id <= 0) {
            alert("Id должен быть положительным числом!");
            card = 0;
        }
    }
    loaderOFF();
    return card;
}

async function addNewCard(event) {
    let formData = document.getElementsByClassName('new-card-form')[0];
    let card = await saveFormData(formData, new Card());
    if (card == 0) return;
    loaderON();
    try {
        await fetch('http://localhost:3000/cards', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify(card)
        }).then(renderOneCard(card, card.id))
    } catch (error) {
        alert("Ошибка добавления карточки:" + error);
    }
    loaderOFF();
}

async function transferData(event) {
    document.getElementsByName('id')[0].setAttribute('disabled', '');
    document.getElementById('add_card').classList.add('invisible');
    document.getElementById('edit_card').classList.remove('invisible');
    document.getElementById('add_title').classList.add('invisible');
    document.getElementById('edit_title').classList.remove('invisible');
    loaderON();
    let cards = await fetch('http://localhost:3000/cards').then(res => res.json());
    loaderOFF();
    let card = cards.find(card => card.id == event.target.choose);
    document.getElementById('edit_card').choose = event.target.choose;
    document.getElementsByName('name')[0].value = card.name;
    document.getElementsByName('url')[0].value = card.url;
    document.getElementsByName('description')[0].value = card.description;
    document.getElementsByName('id')[0].value = card.id;
    document.getElementsByName('provider')[0].value = card.provider;
}

async function editOneCard(event) {
    let formData = document.getElementsByClassName('new-card-form')[0];
    loaderON();
    let cards = await fetch('http://localhost:3000/cards').then(res => res.json());
    let f_card = cards.find(card => card.id == event.target.choose);
    let card = await saveFormData(formData, f_card);
    try {
        await fetch(`http://localhost:3000/cards/${event.target.choose}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
              },
            body: JSON.stringify(card)
        })
    } catch (error) {
        alert("Ошибка редактирования карточки:" + error);
    }
    loaderOFF();
    document.getElementById('edit_card').classList.add('invisible');
    document.getElementById('add_card').classList.remove('invisible');
    document.getElementById('edit_title').classList.add('invisible');
    document.getElementById('add_title').classList.remove('invisible');
    document.getElementsByName('id')[0].removeAttribute('disabled', '');
    location.reload();
}

async function deleteOneCard(event) {
    loaderON();
    try {
        await fetch(`http://localhost:3000/cards/${event.target.choose}`, {
            method: 'DELETE'
        }).then(() => location.reload())
    } catch (error) {
        alert("Ошибка удаления карточки:" + error);
    }
    loaderOFF();
}

async function deleteAllCards() {
    loaderON();
    try {
        let cardss = document.getElementsByClassName("one-card");
        if (!cardss) return;
        for (let i = cardss.length - 1; i > 0; --i) {
            let cardId = cardss[i].id;
            if (cardId)
                document.getElementById(cardId).remove();
        }
        let cards = await fetch('http://localhost:3000/cards').then(res => res.json());
        if (!cards) return;
        for (let i = 0; i < cards.length; ++i) {
            await fetch(`http://localhost:3000/cards/${cards[i].id}`, {
                method: 'DELETE'
            })
        }
    } catch (error) {
        alert("Ошибка удаления карточек на сервере:" + error);
    }
    loaderOFF();
}

let first_book = new Card(1, "Жизнь взаймы, или У неба любимчиков нет", "https://content.img-gorod.ru/nomenclature/26/827/2682724.jpg?width=310&height=500&fit=bounds", "Грустная про любовь", "Neoclassic");
let second_book = new Card(2, "Мастер и Маргарита", "https://content.img-gorod.ru/nomenclature/28/136/2813682-1.jpg?width=310&height=500&fit=bounds", "Про любовь и немножко про шизу", "Эксмо");
let third_book = new Card(3, "Грозовой перевал", "https://content.img-gorod.ru/nomenclature/27/659/2765951.jpg?width=310&height=500&fit=bounds", "Тоже про любовь", "Эксмо");
let fourth_book = new Card(4, "Дневник памяти", "https://content.img-gorod.ru/nomenclature/26/510/2651019-2.jpg?width=310&height=500&fit=bounds", "Вы удивитесь, но эта тоже про любовь", "Neoclassic");
let array = [first_book, second_book, third_book, fourth_book];
const startValuesButton = document.getElementsByClassName('start-values-button')[0];
const addButton = document.getElementById('add_card');
const editButton = document.getElementById('edit_card');
startValuesButton.addEventListener('click', setStartCards);
addButton.addEventListener('click', addNewCard);
editButton.addEventListener('click', editOneCard);
setAboutMeInfo();
renderAllCards();