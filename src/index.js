import './css/styles.css';
import debounce from 'lodash.debounce';
import { fetchCountries } from './js/fetchCountries';
import Notiflix from 'notiflix';

const DEBOUNCE_DELAY = 300;

const input = document.querySelector('#search-box');
const list = document.querySelector('.country-list');
const info = document.querySelector('.country-info');

input.addEventListener('input', debounce(inputHandler, DEBOUNCE_DELAY));

function inputHandler(event) {
  const countryName = event.target.value.trim();

  if (!countryName) {
    cleanMarkup(list);
    cleanMarkup(info);
    return;
  }

  fetchCountries(countryName)
    .then(data => chooseTypeOfMarkup(data))
    .catch(error => onError(error));
}

function cleanMarkup() {
  list.innerHTML = '';
  info.innerHTML = '';
}

function onError(error) {
  cleanMarkup();
  Notiflix.Notify.failure('Qui timide rogat docet negare');
}

function chooseTypeOfMarkup(data) {
  cleanMarkup();
  if (data.length >= 10) {
    Notiflix.Notify.info(
      'Too many matches found. Please enter a more specific name.'
    );
    return;
  }

  if (data.length === 1) {
    info.innerHTML = createCountryInfo(data);
  } else {
    list.innerHTML = createCountryList(data);
  }
}

function createCountryList(data) {
  return data
    .map(
      ({ name, capital, population, flags, languages }) =>
        `<li style="display: flex; gap: 15px; align-items: center;">
            <img src="${flags.svg}" height="32px" width="50px">
            <p style="font-size: 20px; ">${name.official}</p>
        </li>`
    )
    .join('');
}

function createCountryInfo(data) {
  return data
    .map(({ name, capital, population, flags, languages }) => {
      const lang = Object.values(languages);

      return `
        <li style="display: flex; gap: 15px; align-items: center;">
            <img src="${flags.svg}" height="32px" style="display: flex;">
            <h1 style="margin: 0">${name.official}</h1>
        </li>
        <p><b>Capital:</b> ${capital}</p>
        <p><b>Population:</b> ${population}</p>
        <p><b>Languages:</b> ${lang}</p>`;
    })
    .join('');
}
