import React, {useEffect, useState} from "react";
import PropTypes from "prop-types";

import Search from "@/components/Search";
import FilmsList from '@/components/FilmsList'

import { connect } from 'react-redux';
import {getFilms, loadMoreFilms} from '@/store/actions/';


function Main(props) {
	const [isFavorites, setIsFavorites] = useState(JSON.parse(localStorage.getItem('FAVORITE_TAB_ACTIVE')) || false);
		
	function tabChanges(e) {
		let link = e.target.dataset.tab;		
		if (link === 'all') {
			setIsFavorites(false);
			localStorage.setItem('FAVORITE_TAB_ACTIVE', false);
		} else {
			setIsFavorites(true);
			localStorage.setItem('FAVORITE_TAB_ACTIVE', true);
		}
	}

	return (
		<section className="main">
			<div className="main__container">
				<Search></Search>
				<div className="main__tabs">
					<a href="#" onClick={tabChanges} data-tab="all" className={`main__tabs-link ${isFavorites ? '' : 'active'}`}>Все фильмы</a>
					<a href="#" onClick={tabChanges} data-tab="favorites" className={`main__tabs-link ${isFavorites ? 'active' : ''}`}>Закладки</a>
				</div>
				<FilmsList films={isFavorites ? props.films.filter(item => item.isFavorite == true).slice(0, props.itemsSize) : props.films.slice(0, props.itemsSize)}></FilmsList>
				{props.itemsSize >= props.films.length || isFavorites ? false : <button type="button" className="main__more" onClick={() => props.loadMore()}>Показать еще</button>}
			</div>
		</section>
	);
}

Main.propTypes = {
	films: PropTypes.array,
	itemsSize: PropTypes.number
};

function mapStateToProps(state) {
	return {
		films: state.films.items.filter((film, index) => {

			if (state.search.text) {		
				if (state.search.activeTags.length) {
					return film.tags.some(tag => state.search.activeTags.some(activeTag => activeTag === tag)) && new RegExp(`^${state.search.text.toLowerCase()}`).test(film.title.toLowerCase())
				}
				return new RegExp(`^${state.search.text.toLowerCase()}`).test(film.title.toLowerCase());
			} 

			if (state.search.activeTags.length) {				
				return film.tags.some(tag => state.search.activeTags.some(activeTag => activeTag === tag))
			}
			return film;
		}),
		itemsSize: state.films.itemsSize
	}
}

function mapDispatchToProps(dispatch) {
	return {
		loadMore: () => {
			dispatch(loadMoreFilms())
			dispatch(getFilms())
		},
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Main);