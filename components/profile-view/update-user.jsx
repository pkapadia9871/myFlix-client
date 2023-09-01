import React from "react"

function UpdatedUser({handleSubmit, handleUpdate})
{

    const deleteUser = (id) => {
        let token = localStorage.getItem('token');
        let url = `https://movieapi-or4e.onrender.com/users/${localStorage.getItem('user')}`;
        axios.delete(url, {
            headers: {Authorization: `Bearer ${token}`},
        })
    }

    return(
    <form className='profile-form' onSubmit={(e) => handleSubmit(e)}>
        <h2>Want to change some info?</h2>
        <label>Username:</label>
        <input
            type='text'
            name='Username'
            defaultValue={user.Username}
            onChange={e => handleUpdate(e)}/>
        <label>Password</label>
        <input 
            type="password"
            name='password'
            defaultValue={user.Password}
            onChange={e=>handleUpdate(e)} />
        <label>Email address</label>
        <input
            type="email"
            name="email"
            defaultValue={user.Email}
            onChange={e=>handleUpdate(e.target.value)} />
        <button variant = 'primary' type='submit'>
            Update
        </button>
        <button variant="secondary" onClick={()=>deleteUser(user)}>Delete user</button>
    </form>
    )
}

export default UpdateUser