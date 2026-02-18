import React, { use } from 'react';
import { Link } from 'react-router';
import { AuthContext } from '../context/AuthContext';
import Swal from 'sweetalert2';

const SignUp = () => {
    const { createUser } = use(AuthContext)

    const handleSignUp = e => {
        e.preventDefault()
        const form = e.target
        const formData = new FormData(form)
        const userData = Object.fromEntries(formData.entries())
        const { email, password, ...restData } = userData

        console.log(restData)

        //create user in the firebase
        createUser(email, password)
            .then(result => {
                console.log(result)
                const creationTime = result.user.metadata.creationTime
                const createiondate = new Date(creationTime)
                const bdCreationTime = createiondate.toLocaleString("en-BD", {
                    timeZone: "Asia/Dhaka",
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                    second: "2-digit"
                });
                const lastSignInTime = result.user.metadata.lastSignInTime
                const lastSignIndate = new Date(lastSignInTime)
                const bdLastSignInTime = lastSignIndate.toLocaleString("en-BD", {
                    timeZone: "Asia/Dhaka",
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                    second: "2-digit"
                });
                const userDetails = {
                    email,
                    ...restData,
                    bdCreationTime,
                    bdLastSignInTime

                }

                //send data in the DB
                fetch('http://localhost:3000/users', {
                    method: 'POST',
                    headers: {
                        'content-type': 'application/json'
                    },
                    body: JSON.stringify(userDetails)
                })
                    .then(res => res.json())
                    .then(data => {
                        if (data.insertedId) {
                            Swal.fire({
                                position: "top-end",
                                icon: "success",
                                title: "Account created successfull",
                                showConfirmButton: false,
                                timer: 1500
                            });
                            form.reset()
                        }
                    })
            })
            .catch(error => {
                console.log(error)
            })
    }
    return (
        <>
            <div className="card bg-base-100 w-11/12 max-w-sm mx-auto mt-5 shrink-0 shadow-2xl">
                <div className="card-body">
                    <h1 className='font-bold text-xl text-center text-blue-500'>Register<span className="font-bold text-xl text-black"> to Coffee Store</span></h1>
                    <form onSubmit={handleSignUp} className="fieldset">
                        <label className="label">Name</label>
                        <input type="text" className="input" placeholder="Name" name='name' required />
                        <label className="label">Phone Number</label>
                        <input type="tel" className="input" placeholder="01XXXXXXXXX" name='Phone' required />
                        <label className="label">Email</label>
                        <input type="email" className="input" name='email' placeholder="Email" required />
                        <label className="label">Set password</label>
                        <input type="password" name='password' className="input" placeholder="Password" required />
                        <p>Already have an account? <Link to='/signin' className='text-blue-400 font-bold underline'>Login</Link></p>
                        <button type='submit' className="btn btn-neutral mt-4">Register</button>

                    </form>

                </div>
            </div>
            <div className='lg:hidden text-center mt-6'>
                <Link to='/' className='btn btn-ghost text-accent'>Back to home</Link>
            </div>
        </>
    );
};

export default SignUp;