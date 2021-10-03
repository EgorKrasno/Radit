import {useEffect, useState} from 'react'
import {health, login, register} from "./service/service";
import PostModal from "./component/PostModal";
import LoginModal from "./component/LoginModal";
import RegisterModal from "./component/RegisterModal";
import Navbar from "./component/Navbar";
import {Toaster} from "react-hot-toast";
import {HashRouter, Route, Switch} from "react-router-dom";
import Home from "./component/Home";
import {sections} from "./data/Data";
import UserPage from "./component/UserPage";

const App = () => {
    const [loggedIn, setLoggedIn] = useState(localStorage.getItem("token") !== null);
    const [userData, setUserData] = useState({username: "", roles: []});
    const [isPostModalOpen, setIsPostModalOpen] = useState(false)
    const [isLoginModalOpen, setIsLoginModalOpen] = useState(false)
    const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false)
    const [page, setPage] = useState(0);
    const [sort, setSort] = useState("voteCount");
    const [refresh, setRefresh] = useState(false);
    const [section, setSection] = useState(sections.filter(s => s.name === window.location.hash.substring(2))[0] || sections[0]);


    useEffect(() => {
        async function fetchHealth() {
            try {
                await health();
            } catch (e) {
                localStorage.clear();
                setLoggedIn(false);
            }
        }

        if(localStorage.getItem("userData") !== null){
            const data = localStorage.getItem("userData");
            const initialValue = JSON.parse(data);
            setUserData(initialValue);
        } else {
           localStorage.clear();
            setUserData({username: "", roles: []});
           setLoggedIn(false);
        }

        fetchHealth();
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

    //cause a refresh on of the posts after post is created
    const postCreated = () => {
        if (sort === 'createdDate' && page === 0) {
            //force a refresh of board if we are on the first page new
            setRefresh(!refresh);
        } else {
            setSort('createdDate')
            setPage(0);
        }
    };


    return (
        <HashRouter>
            <div className="flex flex-col h-screen">
                <Navbar loggedIn={loggedIn}
                        logout={logout}
                        sort={sort}
                        setSort={setSort}
                        setPage={setPage}
                        section={section}
                        setSection={setSection}
                        setIsPostModalOpen={() => setIsPostModalOpen(true)}
                        setIsRegisterModalOpen={() => setIsRegisterModalOpen(true)}
                        setIsLoginModalOpen={() => setIsLoginModalOpen(true)}/>


                <PostModal isOpen={isPostModalOpen}
                           section={section}
                           postCreated={postCreated}
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
                    <Route exact path="/user/:username" component={UserPage}/>
                    {sections.map(s =>
                        <Route exact path={s.path} key={s.name}>
                            <Home sort={sort}
                                  user={userData}
                                  refresh={refresh}
                                  setSort={setSort}
                                  page={page}
                                  section={section}
                                  loggedIn={loggedIn}
                                  setPage={setPage}
                                  setIsLoginModalOpen={setIsLoginModalOpen}/>
                        </Route>
                    )}
                </Switch>
            </div>
        </HashRouter>
    );
}

export default App;