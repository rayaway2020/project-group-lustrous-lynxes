import React, { useContext, useState } from 'react'
import { HeartIcon } from '@heroicons/react/solid'
import { HeartIcon as HeartIconOutlined } from '@heroicons/react/outline'
import { userContext } from './Layout'
import axios from 'axios'

type CommentProps = {
  id: string
  author: string
  date: string
  content: string
  like: boolean
  likecount: number
}

const Comment = ({
  id,
  author,
  date,
  content,
  like,
  likecount,
}: CommentProps) => {
  var today = new Date()
  var date =
    today.getDate() + '/' + (today.getMonth() + 1) + '/' + today.getFullYear()
  var time =
    today.getHours() + ':' + today.getMinutes() + ':' + today.getSeconds()
  var dateTime = date + ' ' + time

  const { userInfo } = useContext(userContext)

  const [liked, setLiked] = useState(like)
  const [likeCount, setLikeCount] = useState(likecount)

  return (
    <div className="flex w-full flex-row gap-4">
      <img
        src="https://stamp.fyi/avatar/hello"
        alt=""
        className="h-12 w-12 rounded-full"
      />
      <div className="flex w-0 flex-1 flex-col items-start justify-start gap-1">
        {/* name and date */}
        <div className="flex flex-row justify-items-start gap-6">
          <b>{author}</b> {date ? date : dateTime}
        </div>
        {/* content */}
        <div className="flex flex-col items-start gap-6">
          <p>{content}</p>
        </div>
        {/* reply, like and like count */}
        <div className="flex w-full flex-row justify-between">
          <div className="flex flex-row items-center gap-2">
            {liked ? (
              <HeartIcon
                className="h-6 w-6"
                onClick={() => {
                  axios
                    .put(
                      'http://localhost:3001/api/songs/comment/cancellikes',
                      {
                        commentId: id,
                        userId: userInfo.id,
                      }
                    )
                    .then((res) => {
                      setLikeCount(res.data.likes)
                      setLiked(!liked)
                    })
                }}
              />
            ) : (
              <HeartIconOutlined
                className="h-6 w-6"
                onClick={() => {
                  axios
                    .put('http://localhost:3001/api/songs/comment/addlikes', {
                      commentId: id,
                      userId: userInfo.id,
                    })
                    .then((res) => {
                      setLikeCount(res.data.likes)
                      setLiked(!liked)
                    })
                }}
              />
            )}
            {likeCount}
          </div>
        </div>

        {/* horizontal line */}
        <div className="w-full py-3">
          <div className="border-t border-gray-300"></div>
        </div>
      </div>
    </div>
  )
}

export default Comment
