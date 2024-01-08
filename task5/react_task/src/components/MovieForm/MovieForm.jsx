import React, { useState, useEffect } from "react";
import "./MovieForm.css"
import { useParams } from "react-router-dom";
import { Link, useNavigate } from "react-router-dom";
import FormCard from "../FormCard/FormCard";

function MovieForm() {
    let editMovie = window.location.pathname.includes("edit");
    const param = useParams();
    const navigate = useNavigate();

    const [movieTitle, setMovieTitle] = useState("");
    const [movieYear, setMovieYear] = useState("");
    const [movieDescription, setMovieDescription] = useState("");
    const [movieImage, setMovieImage] = useState("");
    const [movieTime, setMovieTime] = useState("");
    const [movieRating, setMovieRating] = useState("");
    const [movieActors, setMovieActors] = useState("");
    const [movieProducer, setMovieProducer] = useState("");
    const [movieGenres, setMovieGenres] = useState([]);

    async function getOneMovie(){ 
        try {
            await fetch(`http://localhost:3000/movies/${param.id}`).then((res) =>  res.json())
            .then (oneMovie => {
                setMovieTitle(oneMovie.title);
                setMovieYear(oneMovie.year);
                setMovieDescription(oneMovie.plot);
                setMovieImage(oneMovie.posterUrl);
                setMovieTime(oneMovie.runtime);
                setMovieRating(oneMovie.rating === undefined ? "" : oneMovie.rating);
                setMovieActors(oneMovie.actors.replaceAll(",", ";"));
                setMovieProducer(oneMovie.director);
                setMovieGenres(oneMovie.genres.join("; "));
            });
        } catch (error) {
            alert(`Ошибка при загрузке фильма: ${error}`);
        }
        
    }

    useEffect(() => {
        if (editMovie) {
            (async () => {
                await getOneMovie();
            })().catch(error => alert(`Ошибка при загрузке фильма: ${error}`));
        } else {
            setMovieTitle("");
            setMovieYear("");
            setMovieDescription("");
            setMovieImage("");
            setMovieTime("");
            setMovieRating("");
            setMovieActors("");
            setMovieProducer("");
            setMovieGenres("");
        }
    }, []);

    async function saveMovie(newMovie) {
        try {
            if (editMovie) {
                await fetch(`http://localhost:3000/movies/${param.id}`, {
                    method: "PUT",
                    headers: {
                        'Content-Type': 'application/json;charset=utf-8'
                    },
                    body: JSON.stringify(newMovie)
                }).then(navigate(`/movie/${newMovie.id}`));
            } else {
                await fetch(`http://localhost:3000/movies`, {
                    method: "POST",
                    headers: {
                        'Content-Type': 'application/json;charset=utf-8'
                    },
                    body: JSON.stringify(newMovie)
                }).then(navigate(`/movie/${newMovie.id}`));
            }
        } catch (error) {
            alert(`Ошибка при сохранении фильма: ${error}`);
        }
    }

    async function checkInputs() {
        let newMovie = {
            id: "",
            title: movieTitle,
            year: movieYear,
            plot: movieDescription,
            posterUrl: movieImage,
            runtime: movieTime,
            rating: movieRating,
            actors: movieActors.replaceAll(";", ","),
            director: movieProducer,
            genres: movieGenres.split("; ")
        }
        let allMovies = await fetch('http://localhost:3000/movies').then((res) =>  res.json());
        newMovie.id = editMovie ? param.id : allMovies.length + 1;
        if (!movieTitle || !movieYear || !movieDescription || !movieImage || !movieTime || !movieRating || !movieActors || !movieProducer || !movieGenres) {
            alert("Все поля формы должны быть заполнены!");
            return;
        }
        for (let movie of allMovies) {
            if (JSON.stringify(newMovie) === JSON.stringify(movie)) {
                alert("Такой фильм уже есть!");
                return 0;
            }
        }
        saveMovie(newMovie);
    }

    return (
        <div className="movie-form">
            <p className="form-title">{editMovie ? "Редактирование" : "Создание"}</p>
            <form className="form">
                <FormCard header="Название фильма" placeholder="Введите название фильма" type="input" value={movieTitle} setValue={setMovieTitle}/>
                <FormCard header="Год выпуска" placeholder="Введите год выпуска фильма" type="input" value={movieYear} setValue={setMovieYear}/>
                <FormCard header="Описание" placeholder="Введите описание фильма" type="textarea" value={movieDescription} setValue={setMovieDescription}/>
                <FormCard header="Обложка" placeholder="Укажите ссылку на обложку фильма" type="input" value={movieImage} setValue={setMovieImage}/>
                <FormCard header="Продолжительность" placeholder="Укажите продолжительность фильма" type="input" value={movieTime} setValue={setMovieTime}/>
                <FormCard header="Рейтинг" placeholder="Укажите рейтинг фильма" type="input" value={movieRating} setValue={setMovieRating}/>
                <FormCard header="Актёры" placeholder="Введите актёров фильма (через ;)" type="input" value={movieActors} setValue={setMovieActors}/>
                <FormCard header="Режиссёр" placeholder="Укажите режиссёра фильма" type="input" value={movieProducer} setValue={setMovieProducer}/>
                <FormCard header="Жанры" placeholder="Введите жанры фильма (через ;)" type="input" value={movieGenres} setValue={setMovieGenres}/>
            </form>
            <div className="form-buttons">
                <Link to={param.id ? `/movie/${param.id}` : "/"} style={{ textDecoration: 'none' }}>
                    <button id="cancel" className="form-button">Отменить</button>
                </Link>
                <button id="save" className="form-button" onClick={checkInputs}>Сохранить</button>
            </div>
        </div>
    );
}

export default MovieForm;