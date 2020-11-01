"use strict";
// У блока .map убрать класс .map--faded
let blockMap = document.querySelector(`.map`);
blockMap.classList.remove(`map--faded`);

const PINS_IN_TOTAL = 8;
const ARRAY_FIXED_VALUES = [`palace`, `flat`, `house`, `bungalow`];
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
const mapPins = document.querySelector(".map__pins");
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

const randomArr = (arr) => arr.slice(randomInterval(0, arr.length));


// Функция для создания массива из 8 сгенерированных JS объектов.

let announcementData = () => {
  const ARRY_GENERATION = [];
  for (let i = 0; i < PINS_IN_TOTAL; i++) {
  ARRY_GENERATION.push({
    author: {
      avatar: `img/avatars/user0${i + 1}.png`
    },
    offer: {
      title: `Заголовок`,
      address: `x, y`,
      price: randomInterval(COST_MIN, COST_MAX),
      type: randomArrElement(ARRAY_FIXED_VALUES),
      rooms: randomInterval(ROOMS_VALUES_MIN, ROOMS_VALUES_MAX),
      guests: randomInterval(GUEST_VALUES_MIN, GUEST_VALUES_MAX),
      checkin: randomArrElement(ARRAY_CHECKDATE_VALUES),
      checkout: randomArrElement(ARRAY_CHECKDATE_VALUES),
      features: randomArr(ARRAY_COMFORT_VALUES),
      description: `Описание`,
      photos: randomArrElement(ARRAY_PHOTO_VALUES),
    },
    location: {
      x: randomInterval(MIN_LOCATION_X, MAX_LOCATION_X),
      y: randomInterval(MIN_LOCATION_Y, MAX_LOCATION_Y),
    }
  });
  }
  return ARRY_GENERATION;
};


//Функция для рэндэра шаблона

// const addNewPin = (data) => {
// const pinTemplate = document.querySelector(`#pin`).content.querySelector(`.map__pin`);

const renderPin = (data) => {
  const pinTemplate = document.querySelector(`#pin`).content.querySelector(`.map__pin`);
  let fragment = document.createDocumentFragment();

data.forEach((item) => {
  let pin = pinTemplate.cloneNode(true);
  const img = pin.querySelector(`img`);

  // pin.style = "top: " + (y - 70) + "px; left: " + (x - 25) + "px;";

  // pin.querySelector('.map__pin img').src = src;
  // pin.querySelector('.map__pin img').alt = alt;
  // fragment.append(pin);
  pin.style = `left: ${item.location.x - img.width / 2}px;
                     top: ${item.location.y - img.height}px;`;
    img.src = item.author.avatar;
    img.alt = item.offer.title;
    fragment.append(pin);
});

  return fragment;
};

// let fragment = document.createDocumentFragment();



// const readyPin = renderPin(dataPin.author.avatar, dataPin.offer.title, dataPin.location.x, dataPin.location.y);

// fragment.appendChild(readyPin);

// mapPins.appendChild(fragment);

const dataPin = announcementData();

mapPins.append(renderPin(dataPin))


// console.log();

//  2.
