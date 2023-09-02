import {Link} from 'react-router-dom';
import { useEffect, useState } from 'react';
import UserInfo from './user-info';
import FavoriteMovies from './favorite-movies';
import UpdateUser from './update-user';

export function ProfileView({ movies, onUpdatedUserInfo}) {
    const [user, setUser] = useState({
        Username: '',
        Email: '',
        FavoriteMovies: []
    })

    const favoriteMovieList = movies.filter((movies) => {return user.FavoriteMovies.includes(movies._id);})

    const getUser = () => {}

    useEffect(() => {
        let isMounted = true;
        isMounted && getUser();
        return ()=> {
            isMounted = false;
        }
    }, [])

    return (
        <div>
            <UserInfo name={user.Username} email={user.Email} />
            <FavoriteMovies favoriteMovieList={favoriteMovieList} />
            <UpdateUser user={user} setUser={ setUser}/>
        </div>
    )

}