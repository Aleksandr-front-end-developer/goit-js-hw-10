import axios from "axios";
axios.defaults.headers.common["x-api-key"] = "live_5GgI3gPQUAu1EaeZtEBXxaK79Sbsc3P7Z5ZS2RGmSPit3NjMZ7kBwiuaBSTAeE7a";

const BASE_URL = 'https://api.thecatapi.com/v1/'

function fetchBreeds() {
	return fetch(`${BASE_URL}breeds`).then(resp => {

		if (!resp.ok) {
			throw new Error(resp.statusText);
		}

		return resp.json();
	})
}

function fetchCatByBreed(breedId) {
	return fetch(`${BASE_URL}images/${breedId}`).then(resp => {

		if (!resp.ok) {
			throw new Error(resp.statusText);
		}

		return resp.json();
	})
}

export { fetchBreeds, fetchCatByBreed };