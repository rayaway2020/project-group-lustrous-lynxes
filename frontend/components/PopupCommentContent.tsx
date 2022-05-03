import React, { useState } from "react"
import { HeartIcon } from "@heroicons/react/solid"
import { HeartIcon as HeartIconOutlined } from "@heroicons/react/outline"

type PopupCommentContentProps = {
    username: string
    date: string
    content: string
    like: boolean
    likecount: number
  }

const PopupCommentContent = (
    { username, date, content, like, likecount }: PopupCommentContentProps
) => {
    var today = new Date();
    var date = today.getDate()+'/'+(today.getMonth()+1)+'/'+today.getFullYear();
    var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    var dateTime = date+' '+time;

    const [liked, setLiked] = useState(like);

    return (
        <div className="flex flex-col items-start justify-start gap-1">
            {/* name and date */}
            <div className="flex flex-row justify-items-start gap-6">
                <b>{username ? username : "John Doe"}</b> {date ? date : dateTime}
            </div>
            {/* content */}
            <div className="flex flex-col items-start gap-6">
                <p>{content ? content : "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed dignissim sem eget felis viverra, non varius turpis elementum. Quisque dignissim velit vel consequat dignissim. Nunc dictum justo sed orci interdum laoreet. Nunc nec metus fringilla, pulvinar enim eu, eleifend augue. Ut a orci a tortor sodales auctor. Donec luctus mauris."}</p>
            </div>
            {/* reply, like and like count */}
            <div className="flex flex-row w-full justify-between">
                <div className="flex flex-row items-center gap-6">
                    <button className="bg-transparent border-transparent">reply</button>

                    <button
                        className="bg-transparent border-transparent"
                        onClick={() => setLiked(!liked)} 
                    >
                        {liked ? <div className="flex flex-row gap-1"><HeartIcon className="h-5 w-5" /> You like this</div> : "Like"}
                    </button>
                </div>
                
                <div className="flex flex-row gap-1"><HeartIconOutlined className="h-5 w-5" /> {likecount ? likecount : "0"}</div>
            </div>

            {/* horizontal line */}
            <div className="py-3 w-full">
                <div className="border-t border-gray-300"></div>
            </div>
        </div>
    )
}

export default PopupCommentContent
