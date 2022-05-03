import {useState, useEffect} from 'react'

import PopupCommentAvatar from './PopupCommentAvatar'
import PopupCommentInput from './PopupCommentInput'
import PopupCommentContent from './PopupCommentContent'

type avatarProp = {
  avatar: string
}

const PopupComment = () => {
  const [avatarInfo, setAvatarInfo] = useState<avatarProp>()

  useEffect(() => {
    setAvatarInfo({avatar: "https://p2.music.126.net/0jbv7CBVqdqHAb1guLX_pg==/109951167156624589.jpg?param=512y512"})
  }, [])

  return (
    <section className="rounded-t-2xl bg-slate-200 w-1/2">
      <div className="pt-8 px-16 pb-80 flex flex-col gap-10">
        {/* Avatar and Input*/}
        <div className="flex flex-row items-center justify-start gap-6">
          <PopupCommentAvatar {...avatarInfo} />
          <PopupCommentInput />
        </div>

        {/* horizontal line */}
        <div className="w-full">
                <div className="border-t border-gray-400 border-dashed"></div>
        </div>

        {/* Content */}
        <div className="flex flex-row place-items-start gap-6">
          <PopupCommentAvatar {...avatarInfo} />
          <PopupCommentContent />
        </div>
      </div>
    </section>
  )
}

export default PopupComment
