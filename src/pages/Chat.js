import { useState, useEffect } from "react";
import '../assets/css/chat.css'
import { useSelector } from "react-redux";
import SendImg from '../assets/images/send-img.png'
import Message from '../components/Message';

const Chat = () => {
    var [msg, setMsg] = useState('');
    const io = useSelector(state => state.io);
    const name = useSelector(state => state.chat_name);
    const id = useSelector(state => state.chat_id);
    const chat_img = useSelector(state => state.chat_image);
    const currentUserId = useSelector(state => state.currentLogin._id);
    const messages = useSelector(state => state.messages);
    const key = id > currentUserId ? `${currentUserId}-${id}` : `${id}-${currentUserId}`;

    const changePosition = (e) => {
        // console.log('e', e);
    }

    const sendMessage = () => {
        console.log('sendMessage',msg);
        console.log('msg', msg);
        if (msg) {
            io.emit('chat', { text: msg, fromId: currentUserId, toId: id });
            console.log('io', io);
            setMsg('');
        }
    }

    const messageTyping = e => {
        setMsg(e.target.value);
    }
    return (
        <div className="chat">
            <div className="peaople-search">
                <div className="chat-heading">
                    <div className="chat-img"><img src={chat_img?chat_img:'https://images-na.ssl-images-amazon.com/images/I/410j-ycWgEL._AC_SX425_.jpg'} alt="test" /></div><div className="chat-name">{name}</div>
                </div>
                <div></div>
            </div>
            <div className="people-chat">
                <div className="chat-text" onScroll={(e) => { changePosition(e) }}>
                    {messages && messages[key] && messages[key].map(m => <Message message={m} />)}
                </div>
            </div>
            <div className="messages">
                <div className="send-msg">
                    <div onClick={sendMessage} className="send-btn">
                        <img src={SendImg} />
                    </div>
                    <input onChange={messageTyping} type="text" value={msg} placeholder="send message..." />
                </div>
            </div>
        </div>
    )
}

export default Chat;