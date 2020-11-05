"use strict";
// У блока .map убрать класс .map--faded
let blockMap = document.querySelector(`.map`);
blockMap.classList.remove(`map--faded`);

const pinTemplate = document.querySelector(`#pin`).content.querySelector(`.map__pin`);
const mapPins = document.querySelector(`.map__pins`);

const PINS_IN_TOTAL = 8;
const ARRAY_APARTMENTS_VALUES = [`palace`, `flat`, `house`, `bungalow`];

const OBJ_APARTMENTS_VALUES_RUS = {
  flat: `Квартира`,
  bungalow: `Бунгало`,
  house: `Дом`,
  palce: `Дворец`
};

const ARRAY_CHECKDATE_VALUES = [`12:00`, `13:00`, `14:00`];
const ARRAY_COMFORT_VALUES = [`wifi`, `dishwasher`, `parking`, `washer`, `elevator`, `conditioner`];
const ROOMS_VALUES_MIN = 1;
const ROOMS_VALUES_MAX = 10;
const GUEST_VALUES_MIN = 1;
const GUEST_VALUES_MAX = 20;
const COST_MIN = 1000;
const COST_MAX = 1000000;
const ARRAY_PHOTO_VALUES = [
  `http://o0.github.io/assets/images/tokyo/hotel1.jpg`,
  `http://o0.github.io/assets/images/tokyo/hotel2.jpg`,
  `http://o0.github.io/assets/images/tokyo/hotel3.jpg`
];
const MIN_LOCATION_X = 0;
const MAX_LOCATION_X = mapPins.clientWidth;
const MIN_LOCATION_Y = 130;
const MAX_LOCATION_Y = 630;

// Рандомайзеры
const randomInterval = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1) + min);
};

const randomArrElement = (arr) => {
  return arr[randomInterval(0, arr.length - 1)];
};

// Функция для создания массива из 8 сгенерированных JS объектов.

const getRandArray = () => {
  let array = [];
  for (let i = 0; i < PINS_IN_TOTAL; i++) {
    array.push({
      author: {
        avatar: `img/avatars/user0${i + 1}.png`
      },
      offer: {
        title: `Заголовок`,
        address: `x, y`,
        price: randomInterval(COST_MIN, COST_MAX),
        type: randomArrElement(ARRAY_APARTMENTS_VALUES),
        rooms: randomInterval(ROOMS_VALUES_MIN, ROOMS_VALUES_MAX),
        guests: randomInterval(GUEST_VALUES_MIN, GUEST_VALUES_MAX),
        checkin: randomArrElement(ARRAY_CHECKDATE_VALUES),
        checkout: randomArrElement(ARRAY_CHECKDATE_VALUES),
        features: ARRAY_COMFORT_VALUES,
        description: `Описание`,
        photos: ARRAY_PHOTO_VALUES
      },
      location: {
        x: randomInterval(MIN_LOCATION_X, MAX_LOCATION_X),
        y: randomInterval(MIN_LOCATION_Y, MAX_LOCATION_Y),
      }
    });
  }
  return array;
};

// Функция для рэндэра шаблона
const renderPin = (item) => {

  let pin = pinTemplate.cloneNode(true);
  const img = pin.querySelector(`img`);

  pin.style = `left: ${item.location.x - img.width / 2}px;
               top: ${item.location.y - img.height}px;`;
  img.src = item.author.avatar;
  img.alt = item.offer.title;

  return pin;
};

const renderPins = (data) => {
  let fragment = document.createDocumentFragment();

  data.forEach((item) => {
    const newPin = renderPin(item);
    fragment.append(newPin);
  });

  return fragment;
};

// функция для отрисовки photo

const genPhotos = (object, copyTemplate) => {
  const elemPhotos = copyTemplate.querySelector(`.popup__photos`);
  const elemPhoto = elemPhotos.querySelector(`.popup__photo`);

  object.offer.photos.forEach((photo) => {
    let elemPhotoCopy = elemPhoto.cloneNode();
    elemPhotoCopy.src = `${photo}`;

    elemPhotos.appendChild(elemPhotoCopy);

  });
  elemPhoto.remove();
};

// функция для отрисовки features
const genComfort = (object, copyTemplate) => {
  const elemComfort = copyTemplate.querySelector(`.popup__features`);
  elemComfort.innerHTML = ``;

  object.offer.features.forEach((item) => {
    let li = document.createElement(`li`);
    li.classList.add(`popup__feature`, `popup__feature--${item}`);
    elemComfort.appendChild(li);
  });
};

// Отрисовка сгенерированных элементов в MapPins
const dataPin = getRandArray();

const pins = renderPins(dataPin);

mapPins.append(pins);

// const mapFilters = blockMap.querySelector(`.map__filters-container`);

const createElemCard = (object) => {
  const cardTemplateMap = document.querySelector(`#card`).content.querySelector(`.map__card`);
  const cardElem = cardTemplateMap.cloneNode(true);
  const roomQuantity = object.offer.rooms;
  const guestQuantity = object.offer.guests;
  const roomWord = ` комнаты `;
  const guestWord = ` гостей `;

  cardElem.querySelector(`.popup__title`).textContent = object.offer.title;
  cardElem.querySelector(`.popup__text--address`).textContent = object.offer.address;
  cardElem.querySelector(`.popup__text--price`).innerHTML = `${object.offer.price} ₽/ночь`;
  cardElem.querySelector(`.popup__type`).textContent = OBJ_APARTMENTS_VALUES_RUS[object.offer.type];
  cardElem.querySelector(`.popup__text--capacity`).textContent = `${roomQuantity}${roomWord} для ${guestQuantity}${guestWord}`;
  cardElem.querySelector(`.popup__text--time`).textContent = `Заезд после${object.offer.checkin}, выезд после ${object.offer.checkout}`;
  genComfort(object, cardElem);
  cardElem.querySelector(`.popup__description`).textContent = object.offer.description;
  genPhotos(object, cardElem);
  cardElem.querySelector(`.popup__avatar`).src = object.author.avatar;

  blockMap.insertBefore(cardElem, mapPins);
};

createElemCard(dataPin[0]);

// console.log();
