import PopupCover from './PopupCover'
import PopupComment from './PopupComment'

const Popup = () => {
  return (
    <div className="fixed top-0 left-0 right-0 z-50 grid h-screen grid-cols-2 px-24 bg-white">
      {/* the cover section*/}
      <PopupCover />
      {/* the comment section*/}
      <PopupComment />
    </div>
  )
}

export default Popup
