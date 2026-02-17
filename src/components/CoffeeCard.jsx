import React from 'react';
import { Link } from 'react-router';
import Swal from 'sweetalert2';

const CoffeeCard = ({ coffee,coffees,setCoffees }) => {
    const { _id, Name, Quantity, Prize, Taste, Details, Category, Photo } = coffee

    const handleDelete = (id) => {
        console.log(id)

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

                fetch(`http://localhost:3000/coffees/${_id}`, {
                    method: 'DELETE'
                })
                    .then(res => res.json())
                    .then(data => {
                        console.log('after Delete', data)
                        if (data.deletedCount) {
                            Swal.fire({
                                title: "Deleted!",
                                text: "Your file has been deleted.",
                                icon: "success"
                            });
                            const remainingCoffees=coffees.filter(cof=>cof._id !== id )
                            setCoffees( remainingCoffees)
                        }
                    })


            }
        });

    }

    return (
        <div className="card card-side bg-base-100 shadow-2xl p-4">
            <figure>
                <img className='h-30'
                    src={Photo}
                    alt="Movie" />
            </figure>
            <div className='flex w-full'>
                <div className="card-body">
                    {/* <h2 className="card-title">Name: {Name}</h2>
                    <h2 className="card-title">Quantity: {Quantity}</h2>
                    <h2 className="card-title">Prize: {Prize} TK</h2> */}
                    <p className='text-2xl'><span className='font-bold' >Name:</span> {Name}</p>
                    <p className='text-2xl'><span className='font-bold'>Quantity:</span> {Quantity}</p>
                    <p className='text-2xl'><span className='font-bold'>Prize:</span> {Prize} TK</p>
                </div>
                <div className="join join-vertical card-body">
                <Link className="btn join-item" to={`coffeeDetails/${_id}`}>View</Link>
                <Link className="btn join-item" to={`updateCoffee/${_id}`}>Update</Link>
                    <button onClick={() => handleDelete(_id)} className="btn join-item">Delete</button>
                </div>
            </div>
        </div>
    );
};

export default CoffeeCard;