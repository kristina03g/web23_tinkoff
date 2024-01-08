import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useLocation } from 'react-router-dom';
import "./MoviesList.css";
import MovieCard from "../MovieCard/MovieCard";
import { SlMagnifier } from "react-icons/sl";

function MoviesList(props) {
    const [moviesList, setMoviesList] = useState([]);
    const [searchMovie, setSearchMovie] = useState('');
    const [drawResult, setDrawResult] = useState(moviesList);
    const location = useLocation();

    useEffect(() => {
        let url = window.location.pathname.split("/");
        if (Number(url[url.length - 1]) == 0) deleteActiveStyle();
        (async () => {
            await getAllMovies();
        })().catch(error => alert(`Ошибка при загрузке фильмов: ${error}`));
    }, [location.pathname])

    useEffect(() => {
        (async () => {
            await getAllMovies();
        })().catch(error => alert(`Ошибка при загрузке фильмов: ${error}`));
    }, []);

    useEffect(() => {
        const results = moviesList.filter(movie =>
          movie.title.toLowerCase().startsWith(searchMovie)
        );
        setDrawResult(results);
    }, [searchMovie]);

    
    async function getAllMovies() {
        try {
            await fetch('http://localhost:3000/movies').then((res) =>  res.json())
            .then(
                allMovies => {setMoviesList(allMovies); setDrawResult(allMovies)}
            );
        } catch (error) {
            alert(`Ошибка при загрузке фильмов: ${error}`);
        }
    }

    const deleteActiveStyle = () => {
        let cards = document.getElementsByClassName("movie-card");
        if (cards) {
            for (let i = 0; i < cards.length; ++i) {
                cards[i].classList.remove("movie-card-active");}
        }
    }

    const updateOneCard = (oneMovie) => {
        deleteActiveStyle();
        if (document.getElementById(`movie-card-${oneMovie.id}`)) document.getElementById(`movie-card-${oneMovie.id}`).classList.add("movie-card-active");
    }

    const changeListForSearch = e => {
        deleteActiveStyle();
        setSearchMovie(e.target.value);
    }

    return (
        <div className="moviesList">
            <div className="movies-list">
                <div className="gap">
                    <div className="movies-list-header">
                        <input className="film-search-input" placeholder="Введите название фильма" value={searchMovie} onChange={changeListForSearch}/>
                        <SlMagnifier className="film-search-button" />
                    </div>
                    <div className="cards-list">
                        {React.Children.toArray(
				            drawResult.map((movie) => 
                            <Link to={`/movie/${movie.id}`} style={{ textDecoration: "none" }} onClick={() => updateOneCard(movie) || ""}>
                                <MovieCard movie={movie} favList={props.favMoviesList}/>
                            </Link>)
			            )}
                    </div>
                </div>
                <div className="movies-list-footer">
                    <div className="footer-sep-line"></div>
                    <div className="footer-content">
                        <p className="find-movies">{`Найдено ${drawResult.length} элементов`}</p>
                        <Link to={`/addNewMovie`} style={{ textDecoration: "none" }}>
                            <button className="new-movie-button">Добавить</button>
                        </Link>
                    </div>
                </div> 
            </div>
            <div className="main-sep-line"></div>
        </div>
    );
}

export default MoviesList;