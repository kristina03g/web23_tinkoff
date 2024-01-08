import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { FaCopy } from "react-icons/fa6";
import './OneMovie.css'
import { GrEdit } from "react-icons/gr";
import {BsSuitHeart, BsSuitHeartFill} from 'react-icons/bs';
import { Link } from "react-router-dom";
import kittenJPG from '../../assets/kitten.jpg'

function OneMovie() {

    const param = useParams();
    const [oneMovie, setOneMovie] = useState({});
    const [favFlag, setFavFlag] = useState(false);
    const [favMovies, setFavMovies] = useState([]);

    useEffect(() => {
        if (favMovies.find((element) => element.id == param.id) != undefined) setFavFlag(true);
        else setFavFlag(false);
    }, [favMovies]);

    async function getOneMovie(){ 
        try {
            await fetch(`http://localhost:3000/movies/${param.id}`).then((res) =>  res.json())
            .then (oneMovie => setOneMovie(oneMovie)
            );
        } catch (error) {
            alert(`Ошибка при загрузке фильма: ${error}`);
        }
    }

    useEffect(() => {
        (async () => {
            await getOneMovie();
            await getFavMovies();
        })().catch(error => alert(`Ошибка при загрузке фильмов: ${error}`));
    }, [param, favFlag])

    async function getFavMovies() {
        try {
            await fetch('http://localhost:3000/favorites').then((res) =>  res.json())
            .then(favMovies => setFavMovies(favMovies));
        } catch (error) {
            alert(`Ошибка при загрузке фильмов из избранного: ${error}`);
        }
    }

    const imgError = event => {
        event.target.src = kittenJPG;
    };

    async function changeToNotFav() {
        try {
            await fetch(`http://localhost:3000/favorites/${param.id}`, {
                method: 'DELETE'
            })
        } catch (error) {
            alert(`Произошла ошибка при удалении фильма из избранного: ${error}`);
        }
        setFavFlag(false);
    }

    async function changeToFav() {
        try {
            await fetch(`http://localhost:3000/favorites`, {
                    method: "POST",
                    headers: {
                        'Content-Type': 'application/json;charset=utf-8'
                    },
                    body: JSON.stringify(oneMovie)
                })
        } catch (error) {
            alert(`Произошла ошибка при добавлении фильма в избранное: ${error}`);
        }
        setFavFlag(true);
    }

    return (
        <>
            <div className="one-movie">
                <div className="one-movie-header">
                    <div className="one-movie-id">
                        <p className="movie-id">{`ID: ${oneMovie.id}`}</p>
                        <FaCopy className="id-copy" onClick={() => navigator.clipboard.writeText(oneMovie.id)}/>
                    </div>
                    <div className="isLike">
                        <div className="like-button">
                            {favFlag ? <BsSuitHeartFill className="red" onClick={changeToNotFav}/> : <BsSuitHeart className="red" onClick={changeToFav}/>}
                        </div>
                        <Link to={`/editMovie/${oneMovie.id}`} style={{ textDecoration: 'none' }}>
                            <div className="edit-movie-button">
                                <GrEdit />
                                <p className="edit-movie-button-title">Редактировать</p>
                            </div>
                        </Link>
                    </div>
                </div>
                <div className="one-movie-main">
                    <img className="one-movie-image" src={oneMovie.posterUrl} onError={imgError}/>
                    <div className="one-movie-info">
                        <div className="one-movie-main-info">
                            <p className="one-movie-name">{oneMovie.title}</p>
                            <p className="one-movie-producer">{oneMovie.director}</p>
                        </div>
                        <div className="one-movie-more-info">
                            <div className="one-movie-parametrs">
                                <p className="parametrs-title">Параметры</p>
                                <div className="parametrs-list">
                                    <div className="one-param-block">
                                        <p className="param-title">Год производства:</p>
                                        <p className="param-value">{oneMovie.year}</p>
                                    </div>
                                    <div className="one-param-block">
                                        <p className="param-title">Продолжительность:</p>
                                        <p className="param-value">{`${oneMovie.runtime} мин.`}</p>
                                    </div>
                                    <div className="one-param-block">
                                        <p className="param-title">Жанры:</p>
                                        <p className="param-value">{oneMovie.genres && oneMovie.genres.join(", ")}</p>
                                    </div>
                                    <div className="one-param-block">
                                        <p className="param-title">В главных ролях:</p>
                                        <p className="param-value">{oneMovie.actors}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="one-movie-footer">
                    <p className="one-movie-description-title">Описание</p>
                    <p className="one-movie-description">{oneMovie.plot}</p>
                    <div className="one-movie-rating">
                        <p className="one-movie-rating-title">Текущий рейтинг</p>
                        <p className="one-movie-rating-number">{oneMovie.rating === undefined ? "-" : oneMovie.rating}</p>
                    </div>
                </div>
            </div>
        </>
    );
}

export default OneMovie;