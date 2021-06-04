import React from 'react'
import {useCookies} from 'react-cookie'

function CookieUse() {
    // const [cookies, setCookie, removeCookie] = useCookies(["user"])
    const [cookies, setCookie, removeCookie] = useCookies(["accessToken"])

    const handleaccess = () => {
        setCookie("accessToken","mayowa" , { path: '/'})
    } 
    const handleuser = () => {
        setCookie("user","mayowa" , { path: '/'})
    }

    const remCok = () => {
        removeCookie("accessToken")
    }

    const remCokk = () => {
        removeCookie("user")
    }

    console.log(cookies)
    console.log(cookies.accessToken)
    console.log(cookies.user)
    return (
        <div>
            <p>accessToken {cookies.accessToken}</p>
            <p>user {cookies.user}</p>
            <button onClick={handleaccess}>set access</button>
            <button onClick={handleuser}>set</button>
            <button onClick={remCok}>remove accessToken</button>
            <button onClick={remCokk}>remove USER</button>
        </div>
    )
}

export default CookieUse
