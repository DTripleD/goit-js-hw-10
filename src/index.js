import debounce from 'lodash.debounce';
import './css/styles.css';

const DEBOUNCE_DELAY = 3000;

const input = document.querySelector('#search-box');
const list = document.querySelector('.country-list');
const info = document.querySelector('.country-info');

input.addEventListener('input', debounce((evt) => {
    fetchCountries(evt)  
    .then((data) => console.log(data))
    .catch((error) => console.log(error));
}, DEBOUNCE_DELAY));

function fetchCountries(event) {
  const countryName = event.target.value.trim();



  return fetch(`https://restcountries.com/v3.1/name/${countryName}?fields=name,capital,population,flags,languages`)
  .then(
    response => {
        if (!response.ok) {
            throw new Error(response.status);
        }

        return response.json()
    }
  )
}


// name.official - повна назва країни
// capital - столиця
// population - населення
// flags.svg - посилання на зображення прапора
// languages - масив мов

function getDataValue(info){
    return info.map(({name, capital, population, flags, languages}) => {
        console.log(flags.svg);
    });
}