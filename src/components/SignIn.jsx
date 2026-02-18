import React, { use } from 'react';
import { Link } from 'react-router';
import { AuthContext } from '../context/AuthContext';

const SignIn = () => {
    const { signInUser } = use(AuthContext)
    const handleLogin = (e) => {
        e.preventDefault()
        const form = e.target
        const email = form.email.value
        const password = form.password.value

        //sign in user in the firebase
        signInUser(email, password)
            .then(result => {
                console.log('sign in user', result.user)
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
                const userInfo = {
                    email,
                    bdLastSignInTime
                }

                //update data in db
                fetch('http://localhost:3000/users',{
                    method: 'PATCH',
                    headers: {
                        'content-type': 'application/json'
                    },
                    body: JSON.stringify(userInfo)
                })
                .then(res=>res.json())
                .then(data=>{
                    console.log(data)
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
                    <h1 className='font-bold text-2xl text-center text-blue-500'>Login <span className="font-bold text-2xl text-black"> to Coffee Store</span></h1>
                    <form onSubmit={handleLogin} className="fieldset">
                        <label className="label">Email</label>
                        <input type="email" className="input" name='email' placeholder="Email" />
                        <label className="label">Password</label>
                        <input type="password" className="input" name='password' placeholder="Password" />

                        <button type="submit" className="btn btn-neutral mt-4">Login</button>

                        <p>New to The Coffee Store? <Link to='/signup' className='text-blue-400 font-bold underline'>Register</Link></p>

                    </form>

                </div>
            </div>
            <div className='lg:hidden text-center mt-6'>
                <Link to='/' className='btn btn-ghost text-accent'>Back to home</Link>
            </div>
        </>
    );
};

export default SignIn;