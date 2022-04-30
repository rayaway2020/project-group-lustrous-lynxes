import {
  HeartIcon,
  ChevronDoubleLeftIcon,
  ChevronDoubleRightIcon,
  ChevronUpIcon,
  PlayIcon,
  CubeIcon,
  VolumeUpIcon,
} from '@heroicons/react/outline'

const Playbar = () => {
  return (
    <section className="fixed bottom-0 left-0 right-0 z-50 max-w-screen-xl px-6 m-auto bg-white ">
      <div className="flex flex-row items-center justify-between h-16">
        {/* cover section */}
        <div className="flex flex-row items-center flex-1 gap-4">
          <img
            src="https://p2.music.126.net/0jbv7CBVqdqHAb1guLX_pg==/109951167156624589.jpg?param=512y512"
            alt=""
            className="object-contain w-10 h-10 rounded-full"
          />
          <div className="flex flex-col justify-between">
            <div>ビビっとラブ</div>
            <div className="text-sm">CHiCO with HoneyWorks</div>
          </div>
          <HeartIcon className="w-6 h-6" />
        </div>
        {/* control bar */}
        <div className="flex flex-row items-center justify-center flex-1 gap-8">
          <ChevronDoubleLeftIcon className="w-6 h-6" />
          <PlayIcon className="w-8 h-8" />
          <ChevronDoubleRightIcon className="w-6 h-6" />
        </div>
        {/* play setting */}
        <div className="flex flex-row items-center justify-end flex-1 gap-6">
          <CubeIcon className="w-6 h-6" />
          <VolumeUpIcon className="w-6 h-6" />
          <ChevronUpIcon className="w-6 h-6" />
        </div>
      </div>
    </section>
  )
}

export default Playbar
