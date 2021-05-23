import { useState } from "react";
import '../assets/css/error.css';
import { Link } from "react-router-dom";

const Error = () => {

    return (
        <div>
            <div className="error-page">
                404 :(
            </div>
            <div className="home-link">
                <Link to="/">Home </Link>
            </div>
        </div>
    )
}

export default Error;