import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/solid'

const header = () => {
  return (
    <header className="flex max-w-screen-xl px-4 py-4 m-auto">
      {/* nav section */}
      <div className="flex flex-row items-center justify-start flex-1 w-0 gap-4">
        <ChevronLeftIcon className="w-8 h-8" />
        <ChevronRightIcon className="w-8 h-8" />
      </div>
      {/* tab section */}
      <div className="flex flex-row items-center justify-center flex-1 w-0 gap-12 text-lg font-semibold">
        <div>Home</div>
        <div>Discovery</div>
        <div>Playlist</div>
      </div>
      {/* search bar and avatar */}
      <div className="flex flex-row items-center justify-end flex-1 w-0 gap-4">
        <div className="w-8 h-8 rounded-full bg-slate-400"></div>
      </div>
    </header>
  )
}
export default header
