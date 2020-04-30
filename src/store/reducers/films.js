import dataFilms from '@/data/films.json';

const initialState = {
	items: [],
	itemsSize: 10,
};

const films = (state = initialState, action) => {	
	switch (action.type) {
	case "GET_FILMS":		
		return {
			...state, 
			items: dataFilms.map((item, index) => {
				var favoritesStorage = JSON.parse(localStorage.getItem("FAVORITES_FILMS")) || [];
				
				item.id = index + 1
				item.isFavorite = false;
				if (favoritesStorage.some(favorite => favorite.title === item.title)) {
					item.isFavorite = true;
				}
				return item;
			}),
		}
	case "ADD_FAVORITE":
		return {
			...state,
			items: state.items.map((item, index) => {
				var favoritesStorage = JSON.parse(localStorage.getItem("FAVORITES_FILMS")) || [];

				if (item == action.film) {
					item.isFavorite = !action.film.isFavorite					
					if (item.isFavorite == true) {
						favoritesStorage.push(item)
					} else {
						favoritesStorage = favoritesStorage.filter(favoriteItem => favoriteItem.title !== action.film.title)
					}					
					localStorage.setItem("FAVORITES_FILMS", JSON.stringify(favoritesStorage));
				}
				return item;
			})
		}
	case "LOAD_MORE_FILMS":
		return {...state, itemsSize: state.itemsSize < dataFilms.length ? state.itemsSize + 10 : state.itemsSize}
	default:
		return state;
	}
};

export default films;
