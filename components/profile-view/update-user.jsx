import React from "react";

function UpdateUser({ user, handleSubmit, handleUpdate }) {
  return (
    <form className="profile-form" onSubmit={(e) => handleSubmit(e)}>
      <h2>Want to change some info?</h2>
      <label>Username:</label>
      <input
        type="text"
        name="Username"
        defaultValue={user.Username}
        onChange={(e) => handleUpdate(e)}
      />
      <br />
      <label>Password</label>
      <input
        type="password"
        name="Password"
        onChange={(e) => handleUpdate(e)}
      />
      <br />
      <label>Email address</label>
      <input
        type="email"
        name="Email"
        defaultValue={user.Email}
        onChange={(e) => handleUpdate(e)}
      />
      <br />
      <button variant="primary" type="submit">
        Update
      </button>
    </form>
  );
}

export default UpdateUser;
