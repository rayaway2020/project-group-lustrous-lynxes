import Comment from './Comment'
import axios from 'axios'
import { useContext, useState, useEffect } from 'react'
import { userContext } from './Layout'

interface PopUpCommentProps {
  songID: string
}

const PopupComment = ({ songID }: PopUpCommentProps) => {
  const { userInfo } = useContext(userContext)

  const [comments, setComments] = useState<any[] | undefined>()
  const [newComment, setNewComment] = useState('')

  useEffect(() => {
    fetchComment()
  }, [])

  function fetchComment() {
    axios
      .get('http://localhost:3001/api/songs/comments', {
        params: {
          id: songID,
        },
      })
      .then((res) => {
        setComments(res.data)
        console.log(res.data)
      })
  }

  return (
    <div className="flex h-full flex-col gap-10 overflow-y-auto px-16 py-24 pt-8 scrollbar-hide">
      {/* Avatar and Input*/}
      <div className="flex flex-row gap-4">
        <img
          src={`https://stamp.fyi/avatar/${userInfo.username}`}
          alt=""
          className="h-12 w-12 rounded-full"
        />
        <input
          type="text"
          placeholder="Leave your comment here"
          className="input input-bordered w-full"
          value={newComment}
          onChange={(e) => {
            setNewComment(e.target.value)
            console.log(e.target.value)
          }}
          onKeyPress={(e) => {
            userInfo.token
              ? e.key === 'Enter'
                ? axios
                    .post(
                      'http://localhost:3001/api/songs/comment',
                      {
                        songId: songID,
                        username: userInfo.username,
                        content: newComment,
                      },
                      {
                        headers: {
                          'auth-token': userInfo.token,
                        },
                      }
                    )
                    .then((res) => {
                      setNewComment('')
                      fetchComment()
                    })
                : null
              : alert('Please log in first')
          }}
        />
      </div>

      {/* horizontal line */}
      <div className="w-full">
        <div className="border-t border-dashed border-gray-400"></div>
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
            like={comment.likedUsers.includes(userInfo.id)}
            likecount={comment.likes}
          />
        ))}
      </section>
    </div>
  )
}

export default PopupComment
