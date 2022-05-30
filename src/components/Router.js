import { useState } from "react"
import { BrowserRouter, Route, Routes, Redirect} from "react-router-dom"
import Auth from "routes/Auth";
import Home from "routes/Home";
import Profile from "routes/Profile";
import Navigation from "./Navigation";


const AppRouter = ({isLoggedIn, userObj}) => {

    return (
        <BrowserRouter>
            {isLoggedIn && <Navigation userObj={userObj}/> }
            <Routes>
                {isLoggedIn ? (
                    <>
                        <Route path="/" element={<Home userObj={userObj}/>}></Route>
                        <Route path="/profile" element={<Profile userObj={userObj}/>}></Route>
                    </>     
                ):(
                    <Route path="/" element={<Auth/>}></Route>
                )}
                
            </Routes>
        </BrowserRouter> 
    )
}

export default AppRouter;