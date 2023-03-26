import './css/styles.css';
// import debounce from 'lodash.debounce';
// import { fetchCountries } from './js/fetchCountries';
// import Notiflix from 'notiflix';

// const DEBOUNCE_DELAY = 300;

// const input = document.querySelector('#search-box');
// const list = document.querySelector('.country-list');
// const info = document.querySelector('.country-info');

// input.addEventListener('input', debounce(inputHandler, DEBOUNCE_DELAY));

// function inputHandler(event) {
//   const countryName = event.target.value.trim();

//   if (!countryName) {
//     cleanMarkup(list);
//     cleanMarkup(info);
//     return;
//   }

//   fetchCountries(countryName)
//     .then(data => chooseTypeOfMarkup(data))
//     .catch(error => onError(error));
// }

// function cleanMarkup() {
//   list.innerHTML = '';
//   info.innerHTML = '';
// }

// function onError(error) {
//   cleanMarkup();
//   Notiflix.Notify.failure('Qui timide rogat docet negare');
// }

// function chooseTypeOfMarkup(data) {
//   cleanMarkup();
//   if (data.length >= 10) {
//     Notiflix.Notify.info(
//       'Too many matches found. Please enter a more specific name.'
//     );
//     return;
//   }

//   if (data.length === 1) {
//     info.innerHTML = createCountryInfo(data);
//   } else {
//     list.innerHTML = createCountryList(data);
//   }
// }

// function createCountryList(data) {
//   return data
//     .map(
//       ({ name, capital, population, flags, languages }) =>
//         `<li style="display: flex; gap: 15px; align-items: center;">
//             <img src="${flags.svg}" height="32px" width="50px">
//             <p style="font-size: 20px; ">${name.official}</p>
//         </li>`
//     )
//     .join('');
// }

// function createCountryInfo(data) {
//   return data
//     .map(({ name, capital, population, flags, languages }) => {
//       const lang = Object.values(languages);

//       return `
//         <li style="display: flex; gap: 15px; align-items: center;">
//             <img src="${flags.svg}" height="32px" style="display: flex;">
//             <h1 style="margin: 0">${name.official}</h1>
//         </li>
//         <p><b>Capital:</b> ${capital}</p>
//         <p><b>Population:</b> ${population}</p>
//         <p><b>Languages:</b> ${lang}</p>`;
//     })
//     .join('');
// }



import { fetchCountries } from './js/fetchCountries.js';
import debounce from 'lodash.debounce';
import Notiflix from 'notiflix';

const DEBOUNCE_DELAY = 300;

const searchInput = document.querySelector('#search-box');
const listCountry = document.querySelector('.country-list');
const infoCountry = document.querySelector('.country-info');

searchInput.addEventListener('input', debounce(makeMarkup, DEBOUNCE_DELAY));

function makeMarkup(event) {
  const countryName = event.target.value.trim();

  if (!countryName) {
    listCountry.innerHTML = '';
    infoCountry.innerHTML = '';
  }

  fetchCountries(countryName)
    .then(data => chooseMarkup(data))
    .catch(error => onError());
}

function cleanMarkup() {
  listCountry.innerHTML = '';
  infoCountry.innerHTML = '';
}

function onError() {
  Notiflix.Notify.failure('Oops, there is no country with that name');
  cleanMarkup();
}

function chooseMarkup(data) {
  cleanMarkup();

  if (data.length > 10) {
    Notiflix.Notify.warning(
      'Too many matches found. Please enter a more specific name.'
    );
  } else if (data.length >= 2) {
    listCountry.insertAdjacentHTML('beforeend', list(data));
  } else if (data.length === 1) {
    infoCountry.insertAdjacentHTML('beforeend', info(data));
  }
}

function list(name) {
  return name
    .map(
      ({ name, flags }) =>
        `<li style='display: flex; align-items: center; gap: 20px'>
      <img src='${flags.svg}' alt='${flags.alt}' style='width: 50px'>
      <p>${name.official}</p>
    </li>`
    )
    .join('');
}

function info(name) {
  return name
    .map(
      ({ name, capital, population, flags, languages }) =>
        `<li style='display: flex; align-items: center; gap: 30px'>
      <img src='${flags.svg}' alt='${flags.alt}' style='width: 50px'>
      <h1>${name.official}</h1>
    </li>
    <p><b>Capital:</b> ${capital}</p>
    <p><b>Population:</b> ${population}</p>
    <p><b>Languages:</b> ${Object.values(languages).join('')}</p>
    `
    )
    .join('');
}
