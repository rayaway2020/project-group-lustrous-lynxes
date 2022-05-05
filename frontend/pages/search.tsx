import type { NextPage } from 'next'
import React, { useState } from 'react'

const search: NextPage = () => {
  return (
    <div className="mx-auto my-24 flex w-full max-w-screen-xl flex-col gap-20 rounded-3xl bg-[url('https://cdn.pixabay.com/photo/2017/11/11/18/31/music-player-2939936_1280.jpg')] pt-28 pb-96 text-center drop-shadow-xl">
      <div>
        <h1 className="text-[32px] font-bold">
          Play over 90 million songs and
        </h1>
        <h1 className="text-[32px] font-bold">30000 playlists</h1>
      </div>
      <input
        type="text"
        placeholder="Type here"
        className="w-full max-w-xs input input-bordered"
      />
    </div>
  )
}
export default search
