import React from 'react';
import { useLoaderData } from 'react-router';
import Swal from 'sweetalert2';

const UpdateCoffee = () => {
  const {
Category,Details,Name,
Photo,
Prize,Quantity
,Taste,_id} =useLoaderData()
  
  const handleUpdateCoffee=(e)=>{
 e.preventDefault()
  const form = e.target
        const formData = new FormData(form)
        const updatedCoffeeData = Object.fromEntries(formData.entries())
        console.log(updatedCoffeeData)

        //send data to the DB
        fetch(`http://localhost:3000/coffees/${_id}`,{
            method: 'PUT',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(updatedCoffeeData)
        })
        .then(res=>res.json())
        .then(data=>{
          if(data.modifiedCount){
            Swal.fire({
                                    position: "top-end",
                                    icon: "success",
                                    title: "Coffee updated successfully",
                                    showConfirmButton: false,
                                    timer: 1500
                                });
          }
        })
  }
    return (
    <div className='p-8'>
                <div className='text-center mb-6'>
                    <h1 className='text-3xl font-extrabold'>Update Coffee</h1>
                </div>
                <form onSubmit={handleUpdateCoffee}>
                    <div className='grid grid-cols-1 md:grid-cols-2 gap-5'>
                        <fieldset className="fieldset bg-base-200 border-base-300 rounded-box border p-4">
                            <legend className="fieldset-legend">Name
                            </legend>
                            <input type="text" name='Name' defaultValue={Name} className="input w-full" placeholder="Coffee Name" />
                        </fieldset>

                        <fieldset className="fieldset bg-base-200 border-base-300 rounded-box border p-4">
                            <legend className="fieldset-legend">Prize
                            </legend>
                            <input type="text" name='Prize' defaultValue={Prize}  className="input w-full" placeholder="Prize" />
                        </fieldset>

                        <fieldset className="fieldset bg-base-200 border-base-300 rounded-box border p-4">
                            <legend className="fieldset-legend">Quantity
                            </legend>
                            <input type="text" name='Quantity' defaultValue={Quantity} className="input w-full" placeholder="Quantity" />
                        </fieldset>

                        <fieldset className="fieldset bg-base-200 border-base-300 rounded-box border p-4">
                            <legend className="fieldset-legend">Taste
                            </legend>
                            <input type="text" name='Taste' defaultValue={Taste} className="input w-full" placeholder="Taste" />
                        </fieldset>

                        <fieldset className="fieldset bg-base-200 border-base-300 rounded-box border p-4">
                            <legend className="fieldset-legend">Details
                            </legend>
                            <input type="text" name='Details' defaultValue={Details} className="input w-full" placeholder="Details" />
                        </fieldset>

                        <fieldset className="fieldset bg-base-200 border-base-300 rounded-box border p-4">
                            <legend className="fieldset-legend">Category
                            </legend>
                            <input type="text" name='Category' defaultValue={Category} className="input w-full" placeholder="Category" />
                        </fieldset>
                    </div>
                    <div className='my-5'>
                        <fieldset className="fieldset bg-base-200 border-base-300 rounded-box border p-4">
                            <legend className="fieldset-legend">Photo
                            </legend>
                            <input type="text" name='Photo' defaultValue={Photo} className="input w-full" placeholder="Photo URL" />
                        </fieldset>
                    </div>
                    <input type="submit" className='btn w-full mb-3' value="Update Coffee" />
                </form>

            </div>
    );
};

export default UpdateCoffee;