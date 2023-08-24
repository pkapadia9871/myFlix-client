import React from "react";

import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";

import { useState, useEffect } from "react";

export const MainView = () => {
    const [books, setBooks] = useState([]);

    const [selectedBook, setSelectedBook] = useState(null);

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
        </div>
      );
  };

  