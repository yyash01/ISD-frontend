import React from 'react'
import './Login.css';
import { LockClosedIcon } from '@heroicons/react/solid'
import { useRef } from "react"
import axios from 'axios';

export default function Login({setIsLoggedIn, setIsAdmin}){
    const userInputRef = useRef();
    const passInputRef = useRef();
    async function submitHandler(e){
        e.preventDefault();

        try {
            await axios.post("http://localhost:8080/auth/login", {
                username: userInputRef.current.value,
                password: passInputRef.current.value,
            })
            .then(response => {
                if(response.data.status === 'admin'){
                    setIsAdmin(true)
                    localStorage.setItem("isAdmin", "true")
                }
                else{
                    setIsAdmin(false)
                    localStorage.setItem("isAdmin", "false")
                }
                localStorage.setItem("isLoggedIn", "true");
                localStorage.setItem('username', response.data.user.username)
                localStorage.setItem("name", response.data.user.name)
                localStorage.setItem("department", response.data.user.department)
                localStorage.setItem("userId", response.data.user._id)
                setIsLoggedIn(true)
                console.log(response)
            })
        } catch (error) {
            alert("Wrong username password combination")
            console.log(error)
        }
    }
    return (
        <div className="login-container">
            <div className="login-card">
                <span className="college-logo">LNMIIT</span>
                <span className="name">Inventory Management System</span>
                <div className="login-form ">
                <form className="mt-8 space-y-8 w-full" onSubmit={submitHandler}>
                <input type="hidden" name="remember" defaultValue="true" />
                <div className="rounded-md shadow-sm -space-y-px">
                <div>
                    <input
                    id="username"
                    name="username"
                    required
                    className="form-input appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                    placeholder="Username"
                    ref={userInputRef}
                    />
                </div>
                <div>
                    <input
                    id="password"
                    name="password"
                    type="password"
                    autoComplete="current-password"
                    required
                    className="form-input appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                    placeholder="Password"
                    ref={passInputRef}
                    />
                </div>
                </div>

                <div>
                <button
                    type="submit"
                    className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                    <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                    <LockClosedIcon className="h-5 w-5 text-indigo-500 group-hover:text-indigo-400" aria-hidden="true" />
                    </span>
                    Sign in
                </button>
                </div>
                </form>
                </div>
            </div>
        </div>
    )
}