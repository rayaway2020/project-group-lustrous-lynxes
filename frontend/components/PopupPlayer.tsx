import {
  RefreshIcon,
  ChevronDoubleLeftIcon,
  ChevronDoubleRightIcon,
  PlayIcon,
  CubeIcon,
  VolumeUpIcon,
} from '@heroicons/react/outline'

const PopupPlayer = () => {
  return (
    <section className="bg-amber-800 px-20 py-3 rounded-t-2xl opacity-90">
      <div className="flex flex-row items-center justify-between h-16 gap-20">
        {/* refresh and cube */}
        <div className="flex flex-1 flex-row items-center gap-8">
          <RefreshIcon className="h-8 w-8" />
          <CubeIcon className="h-8 w-8" />
        </div>

        {/* control bar */}
        <div className="flex flex-1 flex-row items-center justify-center gap-8">
          <ChevronDoubleLeftIcon className="h-8 w-8" />
          <PlayIcon className="h-10 w-10" />
          <ChevronDoubleRightIcon className="h-8 w-8" />
        </div>

        {/* play setting */}
        <div className="flex flex-1 flex-row items-center justify-end gap-8">
          <VolumeUpIcon className="h-8 w-8" />
        </div>
        <div></div>

      </div>
    </section>
  )
}

export default PopupPlayer
