import React from "react";

import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";
import { LoginView } from "../login-view/login-view";
import { SignupView } from "../signup-view/signup-view";
import Row from "react-bootstrap/Row";
import Col from 'react-bootstrap/Col';


import { useState, useEffect } from "react";

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
      <Row className="justify-content-md-center"> 
        {!user ? (
          <>
            <Col md={5}>
            <LoginView onLoggedIn={(user) => setUser(user)} />
            or
            <SignupView />
            </Col>
          </>
        ) : selectedBook ? (
          <Col md={8}>
          <BookView 
            book={selectedBook} 
            onBackClick={() => setSelectedBook(null)} 
          />
          </Col>
        ) : books.length === 0 ? (
          <div>The list is empty!</div>
        ) : (
          <>
            {books.map((book) => (
            <Col className="mb-5" key={book.id} md={3}>
            <BookCard
                /*key={book.id}*/
                book={book}
                onBookClick={(newSelectedBook) => {
                  setSelectedBook(newSelectedBook);
                }}
              />
              </Col>
            ))}
          </>
        )}
      </Row>
  );
};