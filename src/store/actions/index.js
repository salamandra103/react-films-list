export const setSearchText = text => ({
	type: "SET_SEARCH", 
	text
});

export const getFilms = () => ({
	type: "GET_FILMS",
})

export const setFavoritesFilms = film => ({
	type: "SET_FAVORITES",
	film
})

export const getFavoritesFilms = () => ({
	type: "GET_FAVORITES",

})

export const loadMoreFilms = count => ({
	type: "LOAD_MORE_FILMS",
})