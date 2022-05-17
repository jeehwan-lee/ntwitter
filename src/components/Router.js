import { useState } from "react"
import { BrowserRouter, Route, Routes, Redirect} from "react-router-dom"
import Auth from "routes/Auth";
import Home from "routes/Home";
import Profile from "routes/Profile";
import Navigation from "./Navigation";


const AppRouter = ({isLoggedIn}) => {

    return (
        <BrowserRouter>
            {isLoggedIn && <Navigation/> }
            <Routes>
                {isLoggedIn ? (
                    <>
                        <Route path="/" element={<Home/>}></Route>
                        <Route path="/profile" element={<Profile/>}></Route>
                    </>     
                ):(
                    <Route path="/" element={<Auth/>}></Route>
                )}
                
            </Routes>
        </BrowserRouter> 
    )
}

export default AppRouter;