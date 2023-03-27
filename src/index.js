import './css/styles.css';
import debounce from 'lodash.debounce';
import { fetchCountries } from './js/fetchCountries';
import Notiflix from 'notiflix';

const DEBOUNCE_DELAY = 300;

const searchInput = document.querySelector('#search-box');
const listCountry = document.querySelector('.country-list');
const infoCountry = document.querySelector('.country-info');

searchInput.addEventListener('input', debounce(makeMarkup, DEBOUNCE_DELAY));

function makeMarkup(event) {
  const countryName = event.target.value.trim();

  if (!countryName) {
    return cleanMarkup();
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
    return;
  }

  if (data.length >= 2) {
    listCountry.innerHTML = createCountryList(data);
  } else {
    infoCountry.innerHTML = createCountryInfo(data);
  }
}

function createCountryList(data) {
  return data
    .map(
      ({ name, flags }) =>
        `<li style="display: flex; gap: 15px; align-items: center;">
          <img src='${flags.svg}' alt='${flags.alt}' height="32px" width="50px">
          <p style="font-size: 20px;">${name.official}</p>
        </li>`
    )
    .join('');
}

function createCountryInfo(data) {
  return data
    .map(
      ({ name, capital, population, flags, languages }) =>
        `<li style='display: flex; align-items: center; gap: 30px'>
      <img src='${flags.svg}' alt='${flags.alt}' style='width: 50px'>
      <h1>${name.official}</h1>
    </li>
    <p><b>Capital:</b> ${capital}</p>
    <p><b>Population:</b> ${population}</p>
    <p><b>Languages:</b> ${Object.values(languages)}</p>
    `
    )
    .join('');
}
