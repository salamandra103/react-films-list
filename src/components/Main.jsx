import React, {useEffect, useState} from "react";
import PropTypes from "prop-types";

import Search from "@/components/Search";
import FilmsList from '@/components/FilmsList'

import { connect } from 'react-redux';

import {getFilms, getFavoritesFilms, loadMoreFilms} from '@/store/actions/';


function Main(props) {
	useEffect(() => {			
		props.getFilms()		
		props.getFavoritesFilms()		
	}, [])	

	const [isFavorites, setIsFavorites] = useState(localStorage.getItem('isFavorites') ? localStorage.getItem('isFavorites') : 'false');
	
	function tabChanges(e) {
		let link = e.target.dataset.tab;
		if (link === 'all') {
			setIsFavorites('false');
			localStorage.setItem('isFavorites', false);
		} else {
			setIsFavorites('true');
			localStorage.setItem('isFavorites', true);
		}
	}

	return (
		<section className="main">
			<div className="main__container">
				<Search></Search>
				<div className="main__tabs">
					<a href="#" onClick={tabChanges} data-tab="all" className={`main__tabs-link ${isFavorites == 'false' ? 'active' : ''}`}>Все фильмы</a>
					<a href="#" onClick={tabChanges} data-tab="favorites" className={`main__tabs-link ${isFavorites == 'true' ? 'active' : ''}`}>Закладки</a>
				</div>
				<FilmsList films={isFavorites === "true" ? props.favorites : props.films}></FilmsList>
				<button type="button" className="main__more" onClick={() => props.loadMore()}>Показать еще</button>
			</div>
		</section>
	);
}

Main.propTypes = {
	films: PropTypes.array,
	favorites: PropTypes.array,
	getFilms: PropTypes.func,
	getFavoritesFilms: PropTypes.func
};

function mapStateToProps(state) {
	return {
		films: !state.search.text ? state.films.items : state.films.items.filter((film, index) => {						
			return new RegExp(`^${state.search.text.toLowerCase()}`).test(film.title.toLowerCase())
		}),
		favorites: !state.search.text ? state.films.favorites : state.films.favorites.filter((film, index) => {						
			return new RegExp(`^${state.search.text.toLowerCase()}`).test(film.title.toLowerCase())
		}),
	}
}

function mapDispatchToProps(dispatch) {
	return {
		getFilms: () => {
			dispatch(getFilms())
		},
		getFavoritesFilms: () => {
			dispatch(getFavoritesFilms())
        },
		loadMore: () => {
			dispatch(loadMoreFilms())
			dispatch(getFilms())
		},
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Main);