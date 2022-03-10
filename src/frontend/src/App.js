import {useEffect, useRef, useState} from 'react'
import {getReadStatus, health, login, register} from "./service/service";
import PostModal from "./component/modal/PostModal";
import LoginModal from "./component/modal/LoginModal";
import RegisterModal from "./component/modal/RegisterModal";
import Navbar from "./component/menu/Navbar";
import toast from "react-hot-toast";
import {Redirect, Route, Switch, useHistory} from "react-router-dom";
import Home from "./component/page/Home";
import {sections} from "./data/Data";
import UserPage from "./component/page/UserPage";
import SockJsClient from 'react-stomp';
import Admin from "./component/page/Admin";
import {GiOctopus} from "react-icons/all";
import {useWindowSize} from "react-use";
import Confetti from 'react-confetti'
import Toast from "./component/Toaster";
import Chat from "./component/Chat";

const App = () => {
    const {width, height} = useWindowSize()
    const clientRef = useRef(null);
    let history = useHistory();
    const [loggedIn, setLoggedIn] = useState(localStorage.getItem("token") !== null);
    const [userData, setUserData] = useState({username: "", roleList: []});
    const [isPostModalOpen, setIsPostModalOpen] = useState(false);
    const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
    const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false);
    const [confetti, setConfetti] = useState(false);
    const [newMessage, setNewMessage] = useState({});
    const [showChat, setShowChat] = useState(false);
    const [navChatNotification, setNavChatNotification] = useState(false);


    useEffect(() => {
        async function fetchHealth() {
            try {
                await health();
                console.log("Health OK")
            } catch (e) {
                localStorage.clear();
                setLoggedIn(false);
                console.log("Health BAD")
            }
        }

        async function fetchConversationStatus() {
            try {
                const result = await getReadStatus();
                console.log(result.data);
                setNavChatNotification(!result.data);
            } catch (e) {
                console.log("Error get conversations");
            }
        }

        if (localStorage.getItem("userData") !== null) {
            const data = localStorage.getItem("userData");
            const initialValue = JSON.parse(data);
            setUserData(initialValue);
        } else {
            localStorage.clear();
            setUserData({username: "", roles: []});
            setLoggedIn(false);
        }

        fetchHealth();
        fetchConversationStatus();
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
        localStorage.setItem("userData", JSON.stringify(data));
        setUserData(data);
        history.replace({
            pathname: `/j/All`,
            search: "?sortBy=voteCount",
            state: {refresh: true}
        })
        setLoggedIn(true);
    }

    const logout = async () => {
        localStorage.clear();
        setLoggedIn(false);
        setShowChat(false);
        history.replace({
            pathname: `/j/All`,
            search: "?sortBy=voteCount",
            state: {refresh: true}
        })
        setUserData({username: "", roles: []});
    }

    const toggleChat = () => {
        setNavChatNotification(false);
        setShowChat(!showChat);
    };


    return (
        <div className="relative">
            {(loggedIn && userData.roleList.includes("ROLE_SUPER_ADMIN")) &&
            <div onClick={() => history.push('/admin')}
                 className="z-50 absolute bottom-3 left-3 text-red-700 border-red-700 h-24 w-24 border-4  rounded-full flex items-center justify-center cursor-pointer">
                <GiOctopus className="h-16 w-16"/>
            </div>}

            <div className="flex flex-col h-screen">
                <Navbar loggedIn={loggedIn}
                        logout={logout}
                        toggleChat={toggleChat}
                        navChatNotification={navChatNotification}
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

                <Toast/>

                <Switch>
                    <Route exact path="/">
                        <Redirect to="/j/All?sortBy=voteCount"/>
                    </Route>
                    <Route path="/admin">
                        {(loggedIn && userData.roleList.includes("ROLE_SUPER_ADMIN")) ?
                            < Admin client={clientRef}/> : <Redirect to="/"/>
                        }
                    </Route>
                    <Route path="/user/:username" component={UserPage}/>
                    {sections.map(s =>
                        <Route exact path="/j/:sectionName" key={s.name}>
                            <Home
                                user={userData}
                                setIsPostModalOpen={() => setIsPostModalOpen(true)}
                                loggedIn={loggedIn}
                                setIsLoginModalOpen={setIsLoginModalOpen}/>
                        </Route>
                    )}
                </Switch>
            </div>

            {userData.username !== '' &&
            <SockJsClient url='/ws/'
                          headers={{
                              Authorization: `Bearer ${JSON.parse(localStorage.getItem("token"))}`
                          }}
                          topics={[`/user/${userData.username}/reply`, '/topic/all']}
                          onConnect={() => {
                              console.log("WebSocket Connected");
                          }}
                          onDisconnect={() => {
                              console.log("WebSocket Disconnected");
                          }}
                          onMessage={(msg) => {
                              if (msg.type === 'message') {

                                  if (showChat) {
                                      setNewMessage(msg);
                                  } else {
                                      setNavChatNotification(true);
                                  }
                              }
                              if (msg.type === 'confetti') {
                                  setConfetti(!confetti);
                                  return;
                              }
                              if (msg.type === 'toast') {
                                  toast(msg['message'], {
                                      style: {
                                          background: '#E0F5E9',
                                      },
                                      duration: 6000,
                                      icon: "🎉",
                                      position: "bottom-left",
                                  })
                              }

                          }}
                          ref={clientRef}/>}

            {confetti && <Confetti
                width={width}
                height={height}
            />}

            {(showChat && loggedIn) &&
            <Chat client={clientRef} closeChat={() => setShowChat(false)} newMessage={newMessage}
                  user={userData.username}/>}

        </div>
    );
}

export default App;