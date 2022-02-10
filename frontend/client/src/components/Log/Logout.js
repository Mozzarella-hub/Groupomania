import React from 'react';
import axios from 'axios';
import cookie from 'js-cookie';//retirer le cookie aussi en front selon le prof


const Logout = () => {

    const removeCookie =(key) =>{
        if(window!== 'undefined') {
            cookie.remove(key, { expires: 1});
        }
    };

    const logout = async () =>{
        await axios ({
            method:'get',
            url: `http://localhost:4000/api/user/logout `,   //${process.env.REACT_APP_API_URL}
            withCredentials: true,
        })
        .then(() => removeCookie('jwt'))
        .catch ((err) =>console.log(err))

        window.location = "/";
    }

    return (
        <li onClick={logout}>
            <img src='./img/icons/logout.svg'  alt='logout' />
        </li>
    );
};

export default Logout;