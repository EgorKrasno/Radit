import {useEffect, useState} from 'react'
import {health, login, register} from "./service/service";
import PostModal from "./component/PostModal";
import LoginModal from "./component/LoginModal";
import RegisterModal from "./component/RegisterModal";
import Navbar from "./component/Navbar";
import {Toaster} from "react-hot-toast";
import {Redirect, Route, Switch} from "react-router-dom";
import Home from "./component/Home";
import {sections} from "./data/Data";
import UserPage from "./component/UserPage";

const App = () => {
    const [loggedIn, setLoggedIn] = useState(localStorage.getItem("token") !== null);
    const [userData, setUserData] = useState({username: "", roles: []});
    const [isPostModalOpen, setIsPostModalOpen] = useState(false)
    const [isLoginModalOpen, setIsLoginModalOpen] = useState(false)
    const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false)


    useEffect(() => {
        // async function fetchHealth() {
        //     try {
        //         await health();
        //     } catch (e) {
        //         localStorage.clear();
        //         setLoggedIn(false);
        //     }
        // }

        if (localStorage.getItem("userData") !== null) {
            const data = localStorage.getItem("userData");
            const initialValue = JSON.parse(data);
            setUserData(initialValue);
        } else {
            localStorage.clear();
            setUserData({username: "", roles: []});
            setLoggedIn(false);
        }

        // fetchHealth();
    }, []);

    const handleLogin = async (user) => {
        try {
            const response = await login(user);
            await loginActions(response);

        } catch (e) {
            return Promise.reject(e.response.data);
        }
    }

    const handleRegister = async (user) => {
        try {
            const response = await register(user);
            await loginActions(response)
        } catch (e) {
            return Promise.reject(e.response.data);
        }
    }

    const loginActions = async (response) => {
        const token = response.headers["jwt-token"];
        const data = response.data;
        localStorage.setItem("token", JSON.stringify(token));
        localStorage.setItem("userData", JSON.stringify(data))
        setUserData(data);
        setLoggedIn(true);
    }

    const logout = async () => {
        localStorage.clear();
        setLoggedIn(false);
        setUserData({username: "", roles: []});
    }

    return (
        <div className="flex flex-col h-screen">
            <Navbar loggedIn={loggedIn}
                    logout={logout}
                    userData={userData}
                    setIsPostModalOpen={() => setIsPostModalOpen(true)}
                    setIsRegisterModalOpen={() => setIsRegisterModalOpen(true)}
                    setIsLoginModalOpen={() => setIsLoginModalOpen(true)}/>


            <PostModal isOpen={isPostModalOpen}
                       closeModal={() => setIsPostModalOpen(false)}/>
            <LoginModal isOpen={isLoginModalOpen}
                        handleLogin={handleLogin}
                        closeModal={() => setIsLoginModalOpen(false)}/>
            <RegisterModal isOpen={isRegisterModalOpen}
                           handleRegister={handleRegister}
                           closeModal={() => setIsRegisterModalOpen(false)}/>

            <Toaster
                toastOptions={{
                    success: {
                        style: {
                            background: '#E0F5E9',
                        },
                    },
                    error: {
                        style: {
                            background: '#FADEDE',
                        },
                    },
                }}
            />
            <Switch>
                <Route exact path="/">
                    <Redirect to="/j/all"/>
                </Route>
                <Route path="/user/:username" component={UserPage}/>
                {sections.map(s =>
                    <Route exact path="/j/:sectionName" key={s.name}>
                        <Home
                            user={userData}
                            loggedIn={loggedIn}
                            setIsLoginModalOpen={setIsLoginModalOpen}/>
                    </Route>
                )}
            </Switch>
        </div>
    );
}

export default App;