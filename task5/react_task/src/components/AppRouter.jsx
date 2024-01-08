import React, { useState, useEffect } from "react";
import {Routes, Route, Navigate} from 'react-router-dom';
import MoviesList from './MoviesList/MoviesList';
import OneMovie from './OneMovie/OneMovie';
import MovieForm from './MovieForm/MovieForm';
import Header from './Header/Header';
import "../index.css";
import { useLocation } from 'react-router-dom';


function AppRouter() {
    const [favMovies, setFavMovies] = useState([]);
    const location = useLocation();

    useEffect(() => {
        (async () => {
            await getFavMovies();
        })().catch(error => "Ошибка: " + error);
    }, []);

    useEffect(() => {
        (async () => {
            await getFavMovies();
        })().catch(error => "Ошибка: " + error);
    }, [location.pathname]);

    var composeObserver = new MutationObserver( () => {
        (async () => {
            await getFavMovies();
        })().catch(error => "Ошибка: " + error)
    });

    function addObserverIfDesiredNodeAvailable() {
        var composeBox = document.getElementsByClassName("like-button")[0];
        if(!composeBox) {
            window.setTimeout(addObserverIfDesiredNodeAvailable, 100);
            return;
        }
        var config = {childList: true};
        composeObserver.observe(composeBox,config);
    }

    async function getFavMovies() {
        try {
            await fetch('http://localhost:3000/favorites').then((res) =>  res.json())
            .then(favMovies => setFavMovies(favMovies));
        } catch (error) {
            alert("Ошибка в запросе избранных фильмов: " + error);
        }
    }

    addObserverIfDesiredNodeAvailable();
    return (
        <>
            <Header />
            <div className='flex-row'>
                <MoviesList favMoviesList={favMovies}/>
                <Routes>
                    <Route path='/' element={<></>} />
                    <Route path="/movie/:id" element={<OneMovie />} />
                    <Route path="/editMovie/:id" element={<MovieForm type="edit" />} />
                    <Route path="/addNewMovie" element={<MovieForm type="add" />} />
                </Routes>
            </div>
        </>
    );
};

export default AppRouter;