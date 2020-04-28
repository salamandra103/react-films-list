const initialState = {
    text: ''
}

const search = (state = initialState, action) => {
	switch (action.type) {
	case "SET_SEARCH":
		return {...state, text: action.text};
	default:
		return state;
	}
};

export default search;
