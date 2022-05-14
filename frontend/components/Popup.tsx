import PopupCover from './PopupCover'
import PopupComment from './PopupComment'

interface PopUpProps {
  id: string
}

const Popup = ({ id }: PopUpProps) => {
  return (
    <div className="fixed top-0 left-0 right-0 z-50 grid h-screen grid-cols-2 bg-white px-24">
      {/* the cover section*/}
      <PopupCover />
      {/* the comment section*/}
      <PopupComment songID={id} />
    </div>
  )
}

export default Popup
