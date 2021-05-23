import { useState, Fragment } from "react";
import '../assets/css/message.css';
import { useSelector } from "react-redux";

const Message = ({ message }) => {
    const id = useSelector(state => state.chat_id);
    console.log('message', message.fromId, id);
    return (
        <Fragment>
            {message && <Fragment>
                {message.fromId == id ?
                    <div className="msg-div">
                        <div className="from-msg">{message.text}<span>{message.time}</span></div>
                    </div> :
                    <div className="msg-div">
                        <div className="to-msg">{message.text}<span>{message.time}</span></div>
                    </div>}
            </Fragment>}
        </Fragment>
    )
}

export default Message;