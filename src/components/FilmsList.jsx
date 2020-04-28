import React,{useEffect} from "react";
import PropTypes from "prop-types";

import imgFavoritesDisable from '../assets/images/icons/favorite_disable.svg';
import imgFavoritesActive from '../assets/images/icons/favorite_active.svg';

import { connect } from 'react-redux';
import { setFavoritesFilms } from '@/store/actions/';

import { useHistory } from 'react-router-dom';

function FilmsList(props) {    	    
    let history = useHistory();           

	return (
		<div className="films">
            <div className="films__container">
                <div className="films__inner">
                    <ul className="films__list">
                    {props.films.length ? props.films.map((film, filmIndex) => (
                        <li className="films__item" key={filmIndex}>
                            <h3 className="films__title" onClick={(e) => history.push(`/film/${film.id}`)}>{film.title}</h3>
                            <div className="films__tags">
                                <ul className="films__tags-list">
                                    {film.tags ? film.tags.map((tag, tagIndex) => (
                                        <li className="films__tags-item" key={tagIndex}>
                                            <span>{tag}</span>
                                        </li>
                                    )) : false}
                                </ul>
                            </div>
                            <div className="films__favorites" onClick={() => props.setFavoritesFilms(film)}>
                                <img src={film.isFavorite ? imgFavoritesActive : imgFavoritesDisable} alt=""/>
                            </div>
                        </li>
                    )) : null}
                    </ul>
                </div>
            </div>
        </div>
	);
}

FilmsList.propTypes = {
    films: PropTypes.array,
    setFavoritesFilms: PropTypes.func,
};

function mapDispatchToProps(dispatch) {
	return {
		setFavoritesFilms: (film) => {
			dispatch(setFavoritesFilms(film))
        },
	}
}

export default connect((state) => ({}), mapDispatchToProps)(FilmsList);