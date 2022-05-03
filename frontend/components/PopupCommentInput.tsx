import { useState, } from 'react';

export default function PopupCommentInput() {
    const [text, onChangeText] = useState('');

    return (
        <input className="border-solid border-black border-2 px-8 py-4 w-11/12"
            type="text"
            onChange={() => onChangeText(text)}
            placeholder="Leave your comment here"
        />
    );
}