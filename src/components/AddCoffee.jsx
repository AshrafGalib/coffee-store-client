import React from 'react';
import Swal from 'sweetalert2';

const AddCoffee = () => {
    const handleAddCoffee = (e) => {
        e.preventDefault()
        const form = e.target
        const formData = new FormData(form)
        const coffeeData = Object.fromEntries(formData.entries())
        console.log(coffeeData)

        //send coffee data to the DB
        fetch('http://localhost:3000/coffees', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(coffeeData)
        })
            .then(res => res.json())
            .then(data => {
                console.log('after adding to the DB', data)
                if (data.insertedId) {
                    Swal.fire({
                        position: "top-end",
                        icon: "success",
                        title: "Coffee added successfully",
                        showConfirmButton: false,
                        timer: 1500
                    });
                    form.reset()
                }
            })
    }
    return (
        <>
            <div className='p-8'>
                <div className='text-center mb-6'>
                    <h1 className='text-3xl font-extrabold'>Add Coffee</h1>
                </div>
                <form onSubmit={handleAddCoffee}>
                    <div className='grid grid-cols-1 md:grid-cols-2 gap-5'>
                        <fieldset className="fieldset bg-base-200 border-base-300 rounded-box border p-4">
                            <legend className="fieldset-legend">Name
                            </legend>
                            <input type="text" name='Name' className="input w-full" placeholder="Coffee Name" />
                        </fieldset>

                        <fieldset className="fieldset bg-base-200 border-base-300 rounded-box border p-4">
                            <legend className="fieldset-legend">Prize
                            </legend>
                            <input type="text" name='Prize' className="input w-full" placeholder="Prize" />
                        </fieldset>

                        <fieldset className="fieldset bg-base-200 border-base-300 rounded-box border p-4">
                            <legend className="fieldset-legend">Quantity
                            </legend>
                            <input type="text" name='Quantity' className="input w-full" placeholder="Quantity" />
                        </fieldset>

                        <fieldset className="fieldset bg-base-200 border-base-300 rounded-box border p-4">
                            <legend className="fieldset-legend">Taste
                            </legend>
                            <input type="text" name='Taste' className="input w-full" placeholder="Taste" />
                        </fieldset>

                        <fieldset className="fieldset bg-base-200 border-base-300 rounded-box border p-4">
                            <legend className="fieldset-legend">Details
                            </legend>
                            <input type="text" name='Details' className="input w-full" placeholder="Details" />
                        </fieldset>

                        <fieldset className="fieldset bg-base-200 border-base-300 rounded-box border p-4">
                            <legend className="fieldset-legend">Category
                            </legend>
                            <input type="text" name='Category' className="input w-full" placeholder="Category" />
                        </fieldset>
                    </div>
                    <div className='my-5'>
                        <fieldset className="fieldset bg-base-200 border-base-300 rounded-box border p-4">
                            <legend className="fieldset-legend">Photo
                            </legend>
                            <input type="text" name='Photo' className="input w-full" placeholder="Photo URL" />
                        </fieldset>
                    </div>
                    <input type="submit" className='btn w-full mb-3' value="Add Coffee" />
                </form>

            </div>
        </>

    );
};

export default AddCoffee;


