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
        <div className="avatar">
          {/* <div className="w-12 rounded-full" >
            <img for="my-modal" className="cursor-pointer" src="https://api.lorem.space/image/face?hash=47449"/>
          </div> */}
          <label for="my-modal" class="btn modal-button w-12 rounded-full" >
            <img for="my-modal" className="w-12" src="https://api.lorem.space/image/face?hash=47449"/>
          </label>
        </div>
      </div>
      <input type="checkbox" id="my-modal" class="modal-toggle" />

      <div class="modal">
        <div class="modal-box">
          <h3 class="font-bold text-lg">Congratulations random Interner user!</h3>
          <p class="py-4">You've been selected for a chance to get one year of subscription to use Wikipedia for free!</p>
          <div class="modal-action">
            <label for="my-modal" class="btn">Yay!</label>
          </div>
        </div>
      </div>
    </header>
  )
}


export default Header
