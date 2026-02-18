import React, { useState } from 'react';
import { useLoaderData } from 'react-router';
import Swal from 'sweetalert2';

const Users = () => {
    const initialUsers = useLoaderData()
    const[users,setUsers]=useState(initialUsers)
    // const { name, Phone, email } = users
    console.log(users)
    const handleDelete =(id)=>{
        Swal.fire({
                    title: "Are you sure?",
                    text: "You won't be able to revert this!",
                    icon: "warning",
                    showCancelButton: true,
                    confirmButtonColor: "#3085d6",
                    cancelButtonColor: "#d33",
                    confirmButtonText: "Yes, delete it!"
                }).then((result) => {
                    if (result.isConfirmed) {
        
                        fetch(`http://localhost:3000/users/${id}`, {
                            method: 'DELETE'
                        })
                            .then(res => res.json())
                            .then(data => {
                                console.log('after Delete', data)
                                if (data.deletedCount) {
                                    Swal.fire({
                                        title: "Deleted!",
                                        text: "User has been deleted.",
                                        icon: "success"
                                    });
                                    const remainingUsers=users.filter(user=>user._id !== id )
                                    setUsers( remainingUsers)
                                }
                            })
        
        
                    }
                })
    }

    return (
        <>
        <h1>Users:{users.length}</h1>
        <div className="overflow-x-auto rounded-box border border-base-content/5 bg-base-100">
            <table className="table">
                {/* head */}
                <thead>
                    <tr>
                        <th></th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Phone</th>
                        <th>Account Created</th>
                        <th>Last SIgnIn</th>
                    </tr>
                </thead>
                <tbody>
                    {/* row 1 */}
                    {
                        users.map(user => <tr key={user._id}>
                            <th>{users.indexOf(user)+1}</th>
                            <td>{user.name}</td>
                            <td>{user.email}</td>
                            <td>{user.Phone}</td>
                            <td>{user.bdCreationTime}</td>
                            <td>{user.bdLastSignInTime}</td>
                            <td>
                                <button className='btn btn-xs btn-ghost'>View</button>
                                <button className='btn btn-xs btn-ghost'>Edit</button>
                                <button onClick={()=>handleDelete(user._id)} className='btn btn-xs btn-error'>Delete</button>
                            </td>
                        </tr>)
                    }

                </tbody>
            </table>
        </div>
        </>
        
    );
};

export default Users;