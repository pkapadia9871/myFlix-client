import React from "react";

import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";
import { LoginView } from "../login-view/login-view";
import { SignupView } from "../signup-view/signup-view";
import Row from "react-bootstrap/Row";
import Col from 'react-bootstrap/Col';

import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import { useState, useEffect } from "react";

import { NavigationBar } from "../navigation-bar/navigation-bar";
import { ProfileView } from "../profile-view/profile-view";

export const MainView = () => {
    const [movies, setMovies] = useState([]);
    const [selectedMovie, setSelectedMovie] = useState(null);
    const storedUser = JSON.parse(localStorage.getItem("user"));
    const storedToken = localStorage.getItem("token");
    const [user, setUser] = useState(storedUser? storedUser : null);
    const [token, setToken] = useState(storedToken? storedToken : null);
    const [movieFiltering, setMovieFiltering] = useState([]);

    useEffect(() => {
      fetch("https://movieapi-or4e.onrender.com/movies")
        .then((response) => response.json())
        .then((data) => {
          const moviesFromApi = data.map((doc) => {
            return {
              id: doc._id,
              title: doc.Title,
            };
          });

          setMovies(moviesFromApi);
        });
    }, []);

    useEffect(() => {
      setMovieFiltering(movies);
    }, [movies]);

    const doSearch = (word) => {
      const searchMovie = word.target.value.toLowerCase();
      const someMovies = movies.filter((movie) =>
        movie.title.toLowerCase().includes(searchMovie)
      );
      setMovieFiltering(someMovies);
    };

    return (
      <BrowserRouter>
        <NavigationBar
            user={user}
            onLoggedOut={(user, token) => {
              setUser(null)
              setToken(token);
              localStorage.clear();
            }}
            doSearch={doSearch}
            />
        <Row className="justify-content-md-center">
          <Routes>
            <Route
              path="/signup"
              element={
                <>
                  {user ? (
                    <Navigate to="/" />
                  ) : (
                    <Col md={5}>
                      <SignupView />
                    </Col>
                  )}
                </>

              }
            />
            <Route
              path="/login"
              element={
                <>
                  {user ? (
                    <Navigate to="/" />
                  ) : (
                    <Col md={5}>
                      <LoginView onLoggedIn={(user) => setUser(user)} />
                    </Col>
                  )}
                </>

              }
            />
            <Route
              path="/movies/:MovieID"
              element={
                <>
                  {!user ? (
                    <Navigate to="/login" replace />
                  ) : movies.length === 0 ? (
                    <Col>The list is empty!</Col>
                  ) : (
                    <Col md={8}>
                      <MovieView movies={movies} />
                    </Col>
                  )}
                </>
              }
            />
            <Route
              path="/"
              element={
                <>
                  {!user ? (
                    <Navigate to="/login" replace />
                  ) : movies.length === 0 ? (
                    <Col>The list is empty!</Col>
                  ) : (
                    <>
                      {movieFiltering.map((movie) => (
                        <Col className="mb-4" key={movie.id} md={3}>
                          <MovieCard movie={movie}/>
                        </Col>
                      ))}
                    </>
                  )}
                </>
              }
            />
            <Route
              path='/profile/:username'
              element={
                <>
                {!user ? (
                  <Navigate to='/login' replace />
                ) : (
                  <Col md={5}>
                    <ProfileView
                      movies={movies}
                      onUpdateUserInfo={(user) => setUser(user)}
                      />
                  </Col>
                )}
                </>
              }
            />
          </Routes>
        </Row>
      </BrowserRouter>
    );
  };
