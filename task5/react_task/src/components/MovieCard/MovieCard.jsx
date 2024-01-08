import React from "react";
import {BsSuitHeart, BsSuitHeartFill} from 'react-icons/bs';
import './MovieCard.css';

function MovieCard(props) {
    const oneMovie = props.movie;
    let arr = location.pathname.split("/");

    return (
        <>
            <div className={`movie-card ${oneMovie.id == arr[arr.length - 1] ? "movie-card-active" : "" }`} id={`movie-card-${oneMovie.id}`}>
                <div className="movie-card-info">
                    <p className="movie-card-name">{oneMovie.title}</p>
                    <div className="movie-card-moreInfo">
                        <p className="movie-card-year">{oneMovie.year}</p>
                        <div className="movie-card-sep-line">|</div>
                        <p className="movie-card-genres">{oneMovie.genres.join(", ")}</p>
                    </div>
                </div>
                <div className="movie-liked">
                    {props.favList.find((element) => element.id == oneMovie.id) != undefined ? <BsSuitHeartFill size={19}/> : <BsSuitHeart size={19}/>}
                </div>
            </div>
        </>
    );
}

export default MovieCard;