import Comment from './Comment'

const PopupComment = () => {
  return (
    <div className="flex flex-col h-full gap-10 px-16 py-24 pt-8 overflow-y-auto scrollbar-hide">
      {/* Avatar and Input*/}
      <div className="flex flex-row gap-4">
        <img
          src="https://stamp.fyi/avatar/hello"
          alt=""
          className="w-12 h-12 rounded-full"
        />
        <input
          type="text"
          placeholder="Leave your comment here"
          className="w-full input input-bordered"
        />
      </div>

      {/* horizontal line */}
      <div className="w-full">
        <div className="border-t border-gray-400 border-dashed"></div>
      </div>

      {/* Comment from users */}
      <section className="flex flex-col gap-4">
        {[...Array(10)].map((_, i) => (
          <Comment
            username={'Username'}
            date={'2020/07/21'}
            content={'The just my first comment'}
            like={false}
            likecount={3}
          />
        ))}
      </section>
    </div>
  )
}

export default PopupComment
