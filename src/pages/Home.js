import { useEffect, Fragment, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { setUsers, loading } from "../actions/index";
import '../assets/css/home.css';
import ChatList from "../components/ChatList";
import { toast } from 'react-toastify';

const Home = () => {
    const dispatch = useDispatch();
    const pageLoading = useSelector(state => state.loading);
    const users = useSelector(state => state.users);
    const currentUserId = useSelector(state => state.currentLogin._id);
    
    useEffect(() => {
        console.log('inn');
        async function getUsers(){
            dispatch(loading(true));
            let data = await fetch('https://glib-shining-biplane.glitch.me/users', {
                method: 'GET',
                headers: {
                    'Content-type': 'application/json'
                }
            });
            data = await data.json();
            if (data.error) {
                dispatch(loading(false));
                toast.error(data.message)
            } else {
                dispatch(setUsers({ 'data': data.response.users, }));
            }
        }

        getUsers();
    }, []);

    return (
        <div className="home-page">
            <div className="peaople-search">
                <div className="chat-heading">
                    <span>C F</span>
                </div>
                <div></div>
            </div>
            {!pageLoading && <div className="people-list">
                {users.map(a => ( a._id != currentUserId && <ChatList key={a._id} id={a._id} name={a.username} img={a.image} status={a.status} />))}
            </div>}
        </div>
    )
}

export default Home;