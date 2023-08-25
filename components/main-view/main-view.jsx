import React from "react";

import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";
import { LoginView } from "../login-view/login-view";
import { SignupView } from "../signup-view/signup-view";

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
  
    if (!user) {
      return (
        <>
          <LoginView onLoggedIn={(user, token) => {
            setUser(user);
            setToken(token);
          }} />
          or
          <SignupView />
        </>
      );
    }

    useEffect(() => {
      if (!token) return;

      fetch("..../movies", {
        headers: { Authorization: `Bearer ${token}` },
      })
        .then((response) => response.json())
        .then((movies) => {
          setMovies(movies);
   
        });
    }, [token]);

    if (selectedBook) {
      return (
        <MovieView book={selectedBook} onBackClick={() => setSelectedBook(null)} />
      );
    }

    if (books.length === 0) {
      return <div>The list is empty!</div>;
    }
  
    return (
        <div>
          {books.map((book) => (
            <MovieCard
                key={book.id}
                book={book}
                onBookClick={(newSelectedBook) => {
                    setSelectedBook(newSelectedBook);
            }}
        />
          ))}
<button onClick={() => { setUser(null); setToken(null); localStorage.clear(); }}>Logout</button>        </div>
      );
  };

  