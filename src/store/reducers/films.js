import dataFilms from '@/data/films.json';

const initialState = {
	items: [],
	favorites: [],
	itemsSize: 10
};

const films = (state = initialState, action) => {	
	switch (action.type) {
	case "GET_FILMS":		
		return {
			...state, 
			items: dataFilms.map((item, index) => {
				item.id = index + 1
				item.isFavorite = false;
				if (state.favorites.some(favoritesItem => favoritesItem.title === item.title)) {
					item.isFavorite = true;
				}
				return item;
			}).slice(0, state.itemsSize) };
	case "GET_FAVORITES":		
		return {...state, favorites: JSON.parse(localStorage.getItem('favoritesFilms')) || []};
	case "SET_FAVORITES":
		let arr = state.favorites	
		if (arr.length) {
			if (arr.some(item => item.title === action.film.title)) {				
				arr.forEach((item, index) => {					
					item.title === action.film.title ? arr.splice(index, 1) : false
				})
				localStorage.setItem('favoritesFilms', JSON.stringify(arr))
				return {
					...state, 
					items: state.items.map(item => {
						return item.title === action.film.title ? {...item, isFavorite: !item.isFavorite} : item
					}),
					favorites: arr.map(item => {
						item.isFavorite = true;
						return item;
					})
				}
			} else {
				arr.push(action.film)
				arr = arr.map(item => {
					item.isFavorite = true;
					return item;
				})
				localStorage.setItem('favoritesFilms', JSON.stringify(arr))
				return {
					...state, 
					items: state.items.map(item => {
						return item.title === action.film.title ? {...item, isFavorite: true} : item
					}),
					favorites: arr.map(item => {
						item.isFavorite = true;
						return item;
					})
				}
			}
        } else {
			arr.push(action.film)			
			localStorage.setItem('favoritesFilms', JSON.stringify(arr))
			return {
				...state, 
				items: state.items.map(item => {
					return item.title === action.film.title ? {...item, isFavorite: true} : item
				}),
				favorites: arr.map(item => {
					item.isFavorite = true;
					return item;
				})
			}	
		} 		
	case "LOAD_MORE_FILMS":
		return {...state, itemsSize: state.itemsSize + 10}
	default:
		return state;
	}
};

export default films;
