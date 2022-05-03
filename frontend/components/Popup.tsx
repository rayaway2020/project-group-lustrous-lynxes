import {
  ChevronDownIcon,  
} from "@heroicons/react/outline"

import PopupCover from "./PopupCover"
import PopupPlayer from "./PopupPlayer"
import PopupComment from "./PopupComment"

const Popup = () => {
  return (
    <div className="flex z-50 gap-8">
      {/* first div is for the DownIcon, cover and player*/}
      <div className="flex flex-col items-center justify-center">
        <div className="flex flex-col gap-3 px-6">
          <ChevronDownIcon className="h-12 w-12 pt-5" />
          <PopupCover />
        </div>
        <div className="fixed bottom-0 left-0">
          <PopupPlayer />
        </div>
      </div>

      {/* second div is for the comments*/}
      <PopupComment />
    </div>
  )
}

export default Popup
