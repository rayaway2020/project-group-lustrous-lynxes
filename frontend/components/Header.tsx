import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/solid'

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
  const toLogIn = () => {}

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
          <div className="w-12 rounded-full" >
            <img src="https://api.lorem.space/image/face?hash=47449" onClick={() => toLogIn()}/>
          </div>
        </div>
      </div>
    </header>
  )
}
export default Header
