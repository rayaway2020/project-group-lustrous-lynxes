import type { NextPage } from 'next'
import { useRouter } from 'next/router'
import { useState } from 'react'

const search: NextPage = () => {
  const router = useRouter()
  const [searchValue, setSearchValue] = useState<string | undefined>(undefined)

  const toSearchPage = () => {
    if (searchValue) {
      setSearchValue(undefined)
      router.push(`/search/${searchValue}`)
    }
  }

  return (
    <div className="mx-auto my-24 flex w-full max-w-screen-xl flex-col gap-20 rounded-3xl bg-[url('https://cdn.pixabay.com/photo/2017/11/11/18/31/music-player-2939936_1280.jpg')] pt-28 pb-96 text-center drop-shadow-xl">
      <div>
        <h1 className="text-[32px] font-bold">
          Play over 90 million songs and
        </h1>
        <h1 className="text-[32px] font-bold">30000 playlists</h1>
      </div>
      <div className="form-control">
        <div className="input-group flex w-full items-center justify-center">
          <input
            type="text"
            placeholder="Search…"
            className="input input-bordered w-3/5"
            onChange={(e) => {
              setSearchValue(e.target.value)
            }}
          />
          <button className="btn btn-square" onClick={toSearchPage}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  )
}
export default search
