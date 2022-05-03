type PopupCommentAvatarProps = {
  avatar: string
}

const PopupCommentAvatar = (
  { avatar }: PopupCommentAvatarProps
) => {
    return (
      <img
        src={avatar}
        alt=""
        className="object-contain w-10 h-10 rounded-full"
      />
    )
  }
  
  export default PopupCommentAvatar