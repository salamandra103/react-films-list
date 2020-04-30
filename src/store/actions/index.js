export const setSearchText = text => ({
	type: "SET_SEARCH", 
	text
});

export const setActiveTags = tag => ({
	type: "SET_ACTIVE_TAGS", 
	tag
});

export const removeActiveTags = tag => ({
	type: "REMOVE_ACTIVE_TAGS", 
	tag
});

export const getFilms = () => ({
	type: "GET_FILMS",
})

export const addFavoriteFilm = film => ({
	type: "ADD_FAVORITE",
	film
})

export const loadMoreFilms = () => ({
	type: "LOAD_MORE_FILMS",
})