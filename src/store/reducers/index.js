import { combineReducers } from "redux";

import films from "./films";
import search from "./search";

export default combineReducers({
	search,
	films
});
