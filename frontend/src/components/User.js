import React from 'react';

function User({ username, email, onEdit, onDelete }) {
    return (
        <tr>
            <td className="text-center">{username}</td>
            <td className="text-center">{email}</td>
            <td>
                <div class="text-center">
                    <button className="btn mr-2  justify-content-center align-items-center button-80"  onClick={onEdit}>
                        Edit
                    </button>
                    <button className="btn btn-danger justify-content-center align-items-center" onClick={onDelete}>
                        Delete
                    </button>
                </div>
            </td>
        </tr>
    );
}

export default User;
