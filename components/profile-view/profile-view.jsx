import {Link} from 'react-router-dom';
import axis from 'axios';
import UserInfo from './user-info';
import { useEffect, useState } from 'react';
import FavoriteMovies from './favorite-movies';
import UpdateUser from './update-user';

export function ProfileView({ movies, onUpdatedUserInfo}) {
    const [user, setUser] = useState({})
}

const favoriteMovieList = movies.filter(m => user.FavoriteMovies.includes(m._id))

const getUser = () => {}

const handleSubmit = (e) => {}

const removeFav = (id) => {}

const handleUpdate = (e) => {}

useEffect(() => {}, [])

return (
    <div>
        <UserInfo name={user.Username} email={user.Email} />
        <FavoriteMovies favoriteMovieList={favoriteMovieList} />
        <UpdateUser user={user} setUser={ setUser}/>
    </div>
)