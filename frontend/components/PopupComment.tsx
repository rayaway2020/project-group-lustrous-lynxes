import Comment from './Comment'
import axios from 'axios';
import { useState, useEffect} from 'react'

interface PopUpCommentProps {
  songID: string
}

const PopupComment = ( { songID }: PopUpCommentProps ) => {
  const [comments, setComments] = useState<any[] | undefined>()
  useEffect(() => {
    axios.get('http://localhost:3001/api/songs/comments', { params : {
      id: songID
    }})
      .then((res) => {
        setComments(res.data)
        console.log(res.data)
      })
  }, [])

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
        {comments?.map((comment, i) => (
          <Comment
            username={comment.author}
            date={comment.createdDates}
            content={comment.content}
            like={false}
            likecount={comment.likes}
          />
        ))}
      </section>
    </div>
  )
}

export default PopupComment
