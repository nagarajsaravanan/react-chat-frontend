import { useState } from "react";
import '../assets/css/back.css';
import { Link } from "react-router-dom";
import LeftArror from '../assets/images/left-arrow.png';
import { useHistory } from "react-router-dom";

const Back = () => {
    let history = useHistory();

    return (
        <div className="back-btn">
            <img onClick={history.goBack} src={LeftArror} />
        </div>
    )
}

export default Back;