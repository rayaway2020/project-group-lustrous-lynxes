import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/solid'

const Header = () => {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 flex max-w-screen-xl px-6 py-4 m-auto bg-white">
      {/* nav section */}
      <div className="flex flex-row items-center justify-start flex-1 w-0 gap-4">
        <ChevronLeftIcon className="w-8 h-8" />
        <ChevronRightIcon className="w-8 h-8" />
      </div>
      {/* tab section */}
      <div className="flex flex-row items-center justify-center flex-1 w-0 gap-6 text-lg font-semibold">
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
export default Header
