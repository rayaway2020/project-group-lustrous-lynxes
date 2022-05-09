import React, { useState } from 'react'
import { HeartIcon } from '@heroicons/react/solid'
import { HeartIcon as HeartIconOutlined } from '@heroicons/react/outline'

type CommentProps = {
  username: string
  date: string
  content: string
  like: boolean
  likecount: number
}

const Comment = ({
  username,
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

  const [liked, setLiked] = useState(like)

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
          <div className="flex flex-row items-center gap-6">
            <button className="bg-transparent border-transparent">reply</button>

            <button
              className="bg-transparent border-transparent"
              onClick={() => setLiked(!liked)}
            >
              {liked ? (
                <div className="flex flex-row gap-1">
                  <HeartIcon className="w-5 h-5" /> You like this
                </div>
              ) : (
                'Like'
              )}
            </button>
          </div>

          <div className="flex flex-row gap-1">
            <HeartIconOutlined className="w-5 h-5" /> {likecount}
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
