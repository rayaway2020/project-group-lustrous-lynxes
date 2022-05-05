import type { NextPage } from 'next'
import React, {useState} from 'react';

const search: NextPage = () => {
  return (
    <div className = "flex flex-col text-center w-full max-w-screen-xl gap-20 pt-28 pb-96 mx-auto my-24 rounded-3xl drop-shadow-xl bg-[url('https://cdn.pixabay.com/photo/2017/11/11/18/31/music-player-2939936_1280.jpg')]">
        <div>        
          <h1 className = "text-[32px] font-bold">Play over 90 million songs and</h1>
          <h1 className = "text-[32px] font-bold">30000 playlists</h1>
        </div>
        <form className="searchForm">  
            <input id="searchText" type="text"/>‘
            <button>Search</button>
        </form>
    </div>
  )
}
export default search;
