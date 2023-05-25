import React from 'react';

function User({ username, email, onEdit, onDelete }) {
  return (
    <div className="table-responsive">
    <table className="table">
      <thead>
        <tr>
          <th>Username</th>
          <th>Email</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr className="table-row d-flex justify-content-center">
          <td className="table-cell">{username}</td>
          <td className="table-cell">{email}</td>
          <td className="table-cell">
            <button className="btn btn-primary mr-2" onClick={onEdit}>
              Edit
            </button>
            <button className="btn btn-danger" onClick={onDelete}>
              Delete
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>  
  );
}

export default User;
