import React from "react";
import PropTypes from "prop-types";
import { connect } from 'react-redux';

import {setSearchText, removeActiveTags} from '@/store/actions/';

function Search(props) {
	return (
		<div className="search">
			<div className="search__inner">
				<div className="search__field">
					<input type="search" value={props.text} onChange={e => props.changeSearchText(e.target.value)} className="search__input" />
					<button type="button" className="search__submit" aria-label="submit"></button>
				</div>
				<div className="search__tags">
					<ul>
						{props.activeTags ? props.activeTags.map((tag, tagIndex) => {
							return <li key={tagIndex} onClick={() => props.removeActiveTags(tag)}>{tag}</li>
						}) : false}
					</ul>
				</div>
			</div>
		</div>
	);
}

Search.propTypes = {
	text: PropTypes.string,
	activeTags: PropTypes.array,
	changeSearchText: PropTypes.func,
	removeActiveTags: PropTypes.func
};

function mapStateToProps(state) {	
	return {
		text: state.search.text,
		activeTags: state.search.activeTags
	};
}

function mapDispatchToProps(dispatch) {
	return {
		changeSearchText: text => {
			dispatch(setSearchText(text))
		},
		removeActiveTags: tag => {
			dispatch(removeActiveTags(tag))
		}
	};
}


export default connect(mapStateToProps, mapDispatchToProps)(Search);