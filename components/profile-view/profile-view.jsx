import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import UserInfo from "./user-info";
import FavoriteMovies from "./favorite-movies";
import UpdateUser from "./update-user";
import axios from "axios";

export function ProfileView({ movies, onUpdateUserInfo }) {
  const { username } = useParams();

  const [user, setUser] = useState({
    Username: "",
    Password: "",
    Email: "",
    FavoriteMovies: [],
    Birthday: "",
  });

  let favoriteMovieList = movies.filter((movie) => user.FavoriteMovies.includes(movie.id));

  const getUser = async () => {
    const token = localStorage.getItem("token");

    await fetch("https://movieapi-or4e.onrender.com/users", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data) {
          const user = data.filter((user) => user.Username === username)[0];
          setUser(user);
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const token = localStorage.getItem("token");

    fetch(`https://movieapi-or4e.onrender.com/users/${username}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(user),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data) {
          localStorage.setItem("user", JSON.stringify(data));
          onUpdateUserInfo(data);
          alert("user updated!");
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleUpdate = (e) => {
    const { name, value } = e.target;

    setUser({
      ...user,
      [name]: value,
    });
  };

  const deleteUser = () => {
    let token = localStorage.getItem("token");

    let url = `https://movieapi-or4e.onrender.com/users/${username}`;
    axios.delete(url, {
      headers: { Authorization: `Bearer ${token}` },
    });
  };

  useEffect(() => {
    getUser();
  }, []);

  return (
    <div>
      <UserInfo name={user.Username} email={user.Email} />
      <FavoriteMovies
        favoriteMovieList={favoriteMovieList}
      />
      <UpdateUser
        user={user}
        handleSubmit={handleSubmit}
        handleUpdate={handleUpdate}
      />

      <br />

      <button variant="secondary" onClick={() => deleteUser()}>
        Delete user
      </button>
    </div>
  );
}
