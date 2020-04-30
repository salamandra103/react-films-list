import dataTags from '@/data/tags.json';

const initialState = {
	text: '',
	tags: dataTags,
	activeTags: []
}

const search = (state = initialState, action) => {
	switch (action.type) {
	case "SET_SEARCH":
		return {...state, text: action.text};
	case "SET_ACTIVE_TAGS": 
		if (state.activeTags.some(tag => tag === action.tag)) {
			return {...state, activeTags: state.activeTags.filter(tag => tag !== action.tag)}
		} else {
			return {...state, activeTags: [...state.activeTags, action.tag]}
		}
	case "REMOVE_ACTIVE_TAGS": 
		return {...state, activeTags: state.activeTags.filter(tag => tag !== action.tag)}
	default:
		return state;
	}
};

export default search;
