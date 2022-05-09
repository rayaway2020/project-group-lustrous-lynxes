import {
  ChevronDoubleLeftIcon,
  PlayIcon,
  ChevronDoubleRightIcon,
} from '@heroicons/react/solid'

const PopupCover = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen gap-6">
      <img
        src="https://stamp.fyi/avatar/hello"
        alt=""
        className="object-contain w-64 h-64 bg-auto aspect-square rounded-xl"
      />
      <div className="flex flex-col items-center justify-between">
        <div>ビビっとラブ</div>
        <div className="text-sm">CHiCO with HoneyWorks</div>
      </div>
      <div className="flex flex-row items-center justify-center gap-8">
        <ChevronDoubleLeftIcon className="w-6 h-6" />
        <PlayIcon className="w-10 h-10" />
        <ChevronDoubleRightIcon className="w-6 h-6" />
      </div>
    </div>
  )
}

export default PopupCover
