import "./movie-view.scss";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import axios from 'axios'

export const MovieView = ({ movies }) => {
  const { MovieID } = useParams();

  const movie = movies.find((movie) => movie.id === MovieID);

  username = JSON.parse(localStorage.getItem('user')).Username

  /*START CODE HERE*/
    const addFav = () => {
      const token = localStorage.getItem("token");
  
      let url = `https://movieapi-or4e.onrender.com/users/${username}/movies/${movie.id}`;
  
      axios.post(url, null, {
        headers: {  Authorization: `Bearer ${token}` },
      }).then(({data}) => {
        localStorage.setItem("user", JSON.stringify(data));
        alert('movie added');
      });

    };

    const removeFav = () => {
      const token = localStorage.getItem("token");
  
      let url = `https://movieapi-or4e.onrender.com/users/${username}/movies/${movie.id}`;
  
      axios.delete(url, {
        headers: {  Authorization: `Bearer ${token}` },
      }).then(() => {
        alert('movie deleted');
      });

    };

    /*END CODE HERE*/

  return (
    <div>
      <div>
        <span>Title: </span>
        <span>{movie.title}</span>
      </div>
      <div>
      <button variant="secondary" onClick={addFav}>Add to favorites</button>
      <button variant="secondary"onClick={removeFav}>Remove from list</button>
      </div>
      <Link to={`/`}>
        <button className="back-button">Back</button>
      </Link>
    </div>
  );
};