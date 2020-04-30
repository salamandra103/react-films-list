import React, {useState} from "react";
import PropTypes from "prop-types";

import {NavLink} from 'react-router-dom';

import { connect } from 'react-redux';
import { addFavoriteFilm } from '@/store/actions/';

function Film({film, addFavoriteFilm}) {	

	const [statusFavorite, setStatusFavorite] = useState(film.isFavorite)
	
	return (
		<section className="film">
			<div className="film__container container">
				<NavLink to="/" className="link__back">Назад</NavLink>
				<div className="film__inner">
					<div className="film__poster">
						<img src="" alt="" className="film__pic" />
					</div>
					<div className="film__description">
						<h3 className="film__title">{film.title}</h3>
						<button type="button" className="film__favorites" onClick={() => {
							addFavoriteFilm(film)
							setStatusFavorite(film.isFavorite)
						}}>{statusFavorite ? 'Убрать из закладок' : 'Добавить в закладки'}</button>
					</div>
				</div>
			</div>
		</section>
	);
}

Film.propTypes = {
	film: PropTypes.object
};

function mapDispatchToProps(dispatch) {
	return {
		addFavoriteFilm: (film) => {
			dispatch(addFavoriteFilm(film))
        },
	}
}

export default connect((state) => ({}), mapDispatchToProps)(Film);
