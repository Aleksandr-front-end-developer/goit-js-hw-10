import { fetchBreeds, fetchCatByBreed } from "./cat-api";
import Notiflix from 'notiflix';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import SlimSelect from 'slim-select'

const selectEl = document.querySelector('.breed-select');
const wrapperEl = document.querySelector('.cat-info');
const loaderSite = document.querySelector('.site-loader');
const loaderWrapper = document.querySelector('.wrapper__loader');


fetchBreeds().then(data => {
	selectEl.innerHTML = createSelectMarkup(data)
	new SlimSelect({
		select: '.breed-select',
		settings: {
			showSearch: false,
			searchText: 'Sorry nothing to see here',
			searchPlaceholder: 'Search for the good stuff!',
			searchHighlight: true
		}
	})
	hideEl(loaderSite)
}).catch(err => {
	Notiflix.Notify.failure('Oops! Something went wrong! Try reloading the page!', {
		position: 'center-top',
		timeout: 60000,
	})
	hideEl(loaderSite)
});

selectEl.addEventListener('change', onChange)

function onChange(evt) {
	const breedId = evt.target.value;
	showEl(loaderWrapper)
	fetchCatByBreed(breedId)
		.then(data => {
			wrapperEl.innerHTML = createWrapperMarkup(data)
			hideEl(loaderWrapper)
		})
		.catch(err => {
			Notiflix.Notify.failure('Oops! Something went wrong! Try reloading the page!', {
				timeout: 60000,
			})
			hideEl(loaderWrapper)
		});

}


function createSelectMarkup(arr) {
	return arr.map(({ name, reference_image_id }) => `
	<option value="${reference_image_id}">${name}</option>`)
		.join('');
}

function createWrapperMarkup({ url, breeds }) {
	return `<img class="cat-info__img" width="400" src="${url}" alt="${breeds[0].name}">
		<h2 class="cat-info__name">${breeds[0].name}</h2>
		<p class="cat-info__description">${breeds[0].description}</p>
		<p class="cat-info__tags"><b>Temperament: </b>${breeds[0].temperament}</p>`;
}

function hideEl(el) {
	el.classList.add('hidden')
}

function showEl(el) {
	el.classList.remove('hidden')
}





