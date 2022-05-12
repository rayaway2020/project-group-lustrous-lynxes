import React, { useState } from 'react'
import { HeartIcon } from '@heroicons/react/solid'
import { HeartIcon as HeartIconOutlined } from '@heroicons/react/outline'
import axios from 'axios'

type CommentProps = {
  id: string
  username: string
  date: string
  content: string
  like: boolean
  likecount: number
}

const Comment = ({
  id,
  username,
  date,
  content,
  like,
  likecount
}: CommentProps) => {
  var today = new Date()
  var date =
    today.getDate() + '/' + (today.getMonth() + 1) + '/' + today.getFullYear()
  var time =
    today.getHours() + ':' + today.getMinutes() + ':' + today.getSeconds()
  var dateTime = date + ' ' + time

  //Temporary
  const userId = "627ce8e7a27332aa9d3e8d77";

  const [liked, setLiked] = useState(like)
  const [likeCount, setLikeCount] = useState(likecount)

  return (
    <div className="flex flex-row w-full gap-4">
      <img
        src="https://stamp.fyi/avatar/hello"
        alt=""
        className="w-12 h-12 rounded-full"
      />
      <div className="flex flex-col items-start justify-start flex-1 w-0 gap-1">
        {/* name and date */}
        <div className="flex flex-row gap-6 justify-items-start">
          <b>{username}</b> {date ? date : dateTime}
        </div>
        {/* content */}
        <div className="flex flex-col items-start gap-6">
          <p>{content}</p>
        </div>
        {/* reply, like and like count */}
        <div className="flex flex-row justify-between w-full">
          <div className="flex flex-row items-center gap-2">
            {liked ? (
              <HeartIcon className="w-6 h-6" onClick={() => {
                axios.put('http://localhost:3001/api/songs/comment/cancellikes', {
                    commentId: id,
                    userId: userId
                  }).then((res) => {
                    setLikeCount(res.data.likes);
                    setLiked(!liked);
                  })
                }} />
            ) : (
              <HeartIconOutlined className="w-6 h-6" onClick={() => {
                axios.put('http://localhost:3001/api/songs/comment/addlikes', {
                    commentId: id,
                    userId: userId
                  }).then((res) => {
                    setLikeCount(res.data.likes);
                    setLiked(!liked);
                  })
              }} />
            )
            }
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
