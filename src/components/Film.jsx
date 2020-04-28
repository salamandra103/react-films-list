import React from "react";
import PropTypes from "prop-types";

import {NavLink} from 'react-router-dom';

function Film(props) {	
	console.log(props);
	
	return (
		<section className="film">
			<div className="film__container container">
				<NavLink to="/" className="link__back">Назад</NavLink>
				<div className="film__inner">
					<div className="film__poster">
						<img src="" alt="" className="film__pic" />
					</div>
					<div className="film__description">
						<h3 className="film__title">{props.film.title}</h3>
						<button type="button" className="film__favorites">Добавить в закладки</button>
					</div>
				</div>
			</div>
		</section>
	);
}

Film.propTypes = {
};

export default Film;
