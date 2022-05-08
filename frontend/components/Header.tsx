import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/solid'
import { useEffect, useState } from 'react';
import Axios from 'axios';


const Header = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");

  const [token, setToken] = useState("");

  const goBack = () => {
    history.back()
  }
  const goNext = () => {
    history.forward()
  }
  const toHomepage = () => {}
  const toDiscover = () => {}
  const toPlaylist = () => {}

  const register = () => {
    Axios.post("http://localhost:3001/api/auth/register", {
      username: username,
      password: password,
      email: email
    }).then((res) => {
      if (res.status == 200) {
        alert("Successfully registered");
      } else {
        alert("Registration failed")
      }
    })
  }

  const login = () => {
    Axios.post("http://localhost:3001/api/auth/login", {
      username: username,
      password: password
    }).then((res) => {
      if (res.status == 200) {
        setToken(res.data);
        alert("Successfully logged in");
        //Direct to new page
      } else {
        alert("Incorrect Username or Password")
      }
    });
  }

  return (
    <header className="fixed top-0 left-0 right-0 z-50 flex max-w-screen-xl px-6 py-4 m-auto bg-white">
      {/* nav section */}
      <div className="flex flex-row items-center justify-start flex-1 w-0 gap-4">
        <ChevronLeftIcon
          className="w-8 h-8 cursor-pointer"
          onClick={() => goBack()}
        />
        <ChevronRightIcon
          className="w-8 h-8 cursor-pointer"
          onClick={() => goNext()}
        />
      </div>
      {/* tab section */}
      <div className="flex flex-row items-center justify-center flex-1 w-0 gap-6 text-lg font-semibold">
        <div className="cursor-pointer" onClick={() => toHomepage()}>
          Home
        </div>
        <div className="cursor-pointer" onClick={() => toDiscover()}>
          Discovery
        </div>
        <div className="cursor-pointer" onClick={() => toPlaylist()}>
          Playlist
        </div>
      </div>
      {/* search bar and avatar */}
      <div className="flex flex-row items-center justify-end flex-1 w-0 gap-4">
          {/* <div className="w-12 rounded-full" >
            <img for="my-modal" className="cursor-pointer" src="https://api.lorem.space/image/face?hash=47449"/>
          </div> */}
          <label htmlFor ="my-modal" className="btn modal-button w-12 rounded-full" >
            <img className="" src="https://api.lorem.space/image/face?hash=47449"/>
          </label>
      </div>

    
      <input type="checkbox" id="my-modal" className="modal-toggle" />
      <div className="modal">
        <label htmlFor ="my-modal" className="btn btn-sm btn-circle absolute right-2 top-2">✕</label>
        <div className="hero h-1/2 w-2/3 bg-base-200 rounded-lg">
          <div className="hero-content flex-col lg:flex-row-reverse">
            <div className="text-center lg:text-left">
              <h1 className="text-5xl font-bold">Login now!</h1>
              <p className="py-6">Listening is everything, create an account to share your thoughts to others all over the world</p>
            </div>

            <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
              <div className="card-body">
              <div className="form-control">
                <label className="label">UserName</label>
                <input type="text" 
                       placeholder="UserName" 
                       className="input input-bordered"
                       minLength={6}
                       onChange={(e) => {
                         setUsername(e.target.value);
                       }} />
              </div>

              <div className="form-control">
                <label className="label">Password</label>
                <input type="password" 
                       placeholder="password" 
                       className="input input-bordered"
                       onChange={(e) => {
                         setPassword(e.target.value);
                       }} />
               <label className="label">
                 <a href="#my-modal-2" className="label-text-alt link link-hover">Sign up for a new account?</a>
               </label>
              </div>

              <div className="form-control mt-6">
                <button className="btn btn-primary" onClick={login}>Login</button>
              </div>
            </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="modal" id="my-modal-2">
      <a href="#" className="btn btn-sm btn-circle absolute right-2 top-2">✕</a>
        <div className="hero h-1/2 w-2/3 bg-base-200 rounded-lg">
          <div className="hero-content flex-col lg:flex-row-reverse">
            <div className="text-center lg:text-left">
              <h1 className="text-5xl font-bold">Sign Up!</h1>
              <p className="py-6">Listening is everything, create an account to share your thoughts to others all over the world</p>
            </div>
            <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
              <div className="card-body">
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">UserName</span>
                  </label>
                  <input type="text" 
                        placeholder="UserName" 
                        className="input input-bordered"
                        onChange={(e) => {
                          setUsername(e.target.value);
                        }} />
                </div>

                <div className="form-control">
                  <label className="label">Password</label>
                  <input type="password" 
                        placeholder="password" 
                        className="input input-bordered"
                        onChange={(e) => {
                          setPassword(e.target.value);
                        }} />
                </div>

                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Email</span>
                  </label>
                  <input type="text" 
                        placeholder="email" 
                        className="input input-bordered"
                        onChange={(e) => {
                          setEmail(e.target.value);
                        }} />
                </div>
                <div className="form-control mt-6">
                  <button className="btn btn-primary" onClick={register}>Register</button>
                </div>
            </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}


export default Header
