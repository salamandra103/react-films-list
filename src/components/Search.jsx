import React from "react";
import PropTypes from "prop-types";
import { connect } from 'react-redux';

import {setSearchText} from '@/store/actions/';

function Search(props) {
	return (
		<div className="search">
			<div className="search__inner">
				<div className="search__field">
					<input type="search" value={props.text} onChange={e => props.changeSearchText(e.target.value)} className="search__input" />
					<button type="button" className="search__submit" aria-label="submit"></button>
				</div>
			</div>
		</div>
	);
}

Search.propTypes = {
	text: PropTypes.string
};

function mapStateToProps(state) {	
	return {text: state.search.text};
}

function mapDispatchToProps(dispatch) {
	return {
		changeSearchText: text => {
			dispatch(setSearchText(text))
		}
	};
}


export default connect(mapStateToProps, mapDispatchToProps)(Search);