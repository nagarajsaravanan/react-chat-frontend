import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { chatName } from "../actions/index";
import '../assets/css/chatlist.css';

const ChatList = ({ id, name, img, status }) => {
    const dispatch = useDispatch();

    const chat = (id,name,img) => {
        console.log('img',img)
        dispatch(chatName({'chat_name': name, 'chat_id': id, 'chat_image': img}));
    }
    return (
        <Link to={`/chat/${id}`} onClick={() => chat(id,name,img)}>
            <div className="chat-list">
                <div className="profile-img">
                    <img src={img?img:'https://images-na.ssl-images-amazon.com/images/I/410j-ycWgEL._AC_SX425_.jpg'} />
                </div>
                <div className="name-and-status">
                    <div className="name">{name}</div>
                    <div className="status">{status}</div>
                </div>
            </div>
        </Link>
    )
}

export default ChatList;