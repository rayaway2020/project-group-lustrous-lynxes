import Comment from './Comment'
import axios from 'axios';
import { useContext, useState, useEffect} from 'react'
import { userContext } from './Layout'


interface PopUpCommentProps {
  songID: string
}

const PopupComment = ( { songID }: PopUpCommentProps ) => {
  const { username, setUsername, userId, setUserId, token, setToken } =
  useContext(userContext)
  
  const [comments, setComments] = useState<any[] | undefined>()
  const [newComment, setNewComment] = useState("")

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
          onKeyPress={(e) => { token ?
            (e.key === 'Enter'? 
              axios.post("http://localhost:3001/api/songs/comment", {
                songId: songID,
                username: username,
                content: newComment
              }, {
                headers: {
                  "auth-token": token
                }
              }).then((res) => {
                setNewComment("");
                fetchComment();
              })
             : null)
            : alert("Please log in first");
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
            author={comment.author}
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
