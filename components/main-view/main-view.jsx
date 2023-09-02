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
    const [books, setBooks] = useState([]);
    const [selectedBook, setSelectedBook] = useState(null);
    const storedUser = JSON.parse(localStorage.getItem("user"));
    const storedToken = localStorage.getItem("token");
    const [user, setUser] = useState(storedUser? storedUser : null);
    const [token, setToken] = useState(storedToken? storedToken : null);
    const [movies, setMovies] = useState([]);
    const [selectedMovie, setSelectedMovie] = useState(null);

    useEffect(() => {
      fetch("https://openlibrary.org/search.json?q=star+wars")
        .then((response) => response.json())
        .then((data) => {
          const booksFromApi = data.docs.map((doc) => {
            return {
              id: doc.key,
              title: doc.title,
              image:
  `https://covers.openlibrary.org/b/id/${doc.cover_i}-L.jpg`,
              author: doc.author_name?.[0]
            };
          });
  
          setBooks(booksFromApi);
        });
    }, []);
  
    return (
      <BrowserRouter>
        <NavigationBar
            user={user}
            onLoggedOut={(user, token) => {
              setUser(null)
              setToken(token);
              localStorage.clear();
            }}
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
              path="/books/:bookId"
              element={
                <>
                  {!user ? (
                    <Navigate to="/login" replace />
                  ) : books.length === 0 ? (
                    <Col>The list is empty!</Col>
                  ) : (
                    <Col md={8}>
                      <MovieView books={books} />
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
                  ) : books.length === 0 ? (
                    <Col>The list is empty!</Col>
                  ) : (
                    <>
                      {books.map((book) => (
                        <Col className="mb-4" key={book.id} md={3}>
                          <MovieCard book={book} />
                        </Col>
                      ))}
                    </>
                  )}
                </>
              }
            />
            <Route 
              path='/user/profile'
              element={
                <>
                {!user ? (
                  <Navigate to='/login' replace />
                ) : (
                  <Col md={5}>
                    <ProfileView
                      movies={movies}
                      user={user}
                      token={token}
                      syncUser={syncUser}
                      onLogout={() => {
                        setUser(null);
                        setToken(null);
                        localStorage.clear();

                      }}
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