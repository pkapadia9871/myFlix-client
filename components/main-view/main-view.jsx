import React from "react";

import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";

import { useState } from "react";

export const MainView = () => {
    const [books, setBooks] = useState([
        {
            id: 1,
            title: "Eloquent JavaScript",
            image:
              "https://images-na.ssl-images-amazon.com/images/I/51InjRPaF7L._SX377_BO1,204,203,200_.jpg",
            author: "Marijn Haverbeke"
          },
          {
            id: 2,
            title: "Mastering JavaScript Functional Programming",
            image:
              "https://images-na.ssl-images-amazon.com/images/I/51WAikRq37L._SX218_BO1,204,203,200_QL40_FMwebp_.jpg",
            author: "Federico Kereki"
          },
          {
            id: 3,
            title: "JavaScript: The Good Parts",
            image:
              "https://images-na.ssl-images-amazon.com/images/I/5131OWtQRaL._SX381_BO1,204,203,200_.jpg",
            author: "Douglas Crockford"
          }
    ]);
  

    const [selectedBook, setSelectedBook] = useState(null);

    if (selectedBook) {
        return(
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

  