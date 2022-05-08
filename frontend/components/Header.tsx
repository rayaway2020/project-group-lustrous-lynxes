import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/solid'
import React from 'react';


const Header = () => {
  const goBack = () => {
    history.back()
  }
  const goNext = () => {
    history.forward()
  }
  const toHomepage = () => {}
  const toDiscover = () => {}
  const toPlaylist = () => {}

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
          <label for="my-modal" class="btn modal-button w-12 rounded-full" >
            <img className="" src="https://api.lorem.space/image/face?hash=47449"/>
          </label>
      </div>

    
      <input type="checkbox" id="my-modal" class="modal-toggle" />
      <div class="modal">
        <label for="my-modal" class="btn btn-sm btn-circle absolute right-2 top-2">✕</label>
        <div class="hero h-1/2 w-2/3 bg-base-200 rounded-lg">
          <div class="hero-content flex-col lg:flex-row-reverse">
            <div class="text-center lg:text-left">
              <h1 class="text-5xl font-bold">Login now!</h1>
              <p class="py-6">Listening is everything, create an account to share your thoughts to others all over the world</p>
            </div>
            <div class="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
              <div class="card-body">
              <div class="form-control">
                <label class="label">
                  <span class="label-text">UserName</span>
                </label>
                <input type="text" placeholder="UserName" class="input input-bordered" />
              </div>
              <div class="form-control">
                <label class="label">
                  <span class="label-text">Password</span>
                </label>
                <input type="text" placeholder="password" class="input input-bordered" />
               <label class="label">
                 <a href="#my-modal-2" class="label-text-alt link link-hover">Sign up for a new account?</a>
               </label>
              </div>
              <div class="form-control mt-6">
                <button class="btn btn-primary">Login</button>
              </div>
            </div>
            </div>
          </div>
        </div>
      </div>
      
      <div class="modal" id="my-modal-2">
      <a for="my-modal" href="#" class="btn btn-sm btn-circle absolute right-2 top-2">✕</a>
        <div class="hero h-1/2 w-2/3 bg-base-200 rounded-lg">
          <div class="hero-content flex-col lg:flex-row-reverse">
            <div class="text-center lg:text-left">
              <h1 class="text-5xl font-bold">Sign Up!</h1>
              <p class="py-6">Listening is everything, create an account to share your thoughts to others all over the world</p>
            </div>
            <div class="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
              <div class="card-body">
              <div class="form-control">
                <label class="label">
                  <span class="label-text">UserName</span>
                </label>
                <input type="text" placeholder="UserName" class="input input-bordered" />
              </div>
              <div class="form-control">
                <label class="label">
                  <span class="label-text">Password</span>
                </label>
                <input type="text" placeholder="password" class="input input-bordered" />
               <label class="label">
               </label>
              </div>
              <div class="form-control mt-6">
                <button class="btn btn-primary">Login</button>
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
