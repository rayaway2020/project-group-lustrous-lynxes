import Comment from './Comment'
import axios from 'axios';
import { useState, useEffect} from 'react'

interface PopUpCommentProps {
  songID: string
}

const PopupComment = ( { songID }: PopUpCommentProps ) => {
  const [comments, setComments] = useState<any[] | undefined>()
  const [newComment, setNewComment] = useState("")

  const userId = "627ce8e7a27332aa9d3e8d77";
  const userId2 = "627a3d6ffa644f105d1c5ca1";

  useEffect(() => {
    fetchComment();
  }, [])

  function fetchComment() {
    axios.get('http://localhost:3001/api/songs/comments', { params : {
      id: songID
    }})
    .then((res) => {
      setComments(res.data)
      console.log(res.data)
    })
  }

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
          value={newComment}
          onChange={(e) => {
            setNewComment(e.target.value)
            console.log(e.target.value)
          }}
          onKeyPress={(e) => {
            if (e.key === 'Enter') {
              axios.post("http://localhost:3001/api/songs/comment", {
                songId: songID,
                username: "default_name",
                content: newComment
              }, {
                headers: {
                  "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MjdiNDA0NGZiYWIzNWFkZmQ1MzRkNzciLCJpYXQiOjE2NTIyNDUyMTN9.08SvFVUJsx_-HEJtmVfRHBBt2c68frJEWFAxDQDHu3o"
                }
              }).then((res) => {
                setNewComment("");
                fetchComment();
              })
            }
          }}
        />
      </div>

      {/* horizontal line */}
      <div className="w-full">
        <div className="border-t border-gray-400 border-dashed"></div>
      </div>

      {/* Comment from users */}
      {/* Need to make change */}
      <section className="flex flex-col gap-4">
        {comments?.map((comment, i) => (
          <Comment
            id={comment._id}
            username={comment.author}
            date={comment.createdDates}
            content={comment.content}
            like={comment.likedUsers.includes(userId)}
            likecount={comment.likes}
          />
        ))}
      </section>
    </div>
  )
}

export default PopupComment
