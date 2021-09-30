import {useEffect, useState} from 'react'
import {getPosts, health, login, register} from "./service/service";
import PostModal from "./component/PostModal";
import LoginModal from "./component/LoginModal";
import RegisterModal from "./component/RegisterModal";
import Navbar from "./component/Navbar";
import {Toaster} from "react-hot-toast";
import {HashRouter, Route, Switch} from "react-router-dom";
import Home from "./component/Home";
import {sections} from "./data/Data";

const App = () => {
    const [loggedIn, setLoggedIn] = useState(false);
    const [isPostModalOpen, setIsPostModalOpen] = useState(false)
    const [isLoginModalOpen, setIsLoginModalOpen] = useState(false)
    const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false)
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState({});
    const [page, setPage] = useState(0);
    const [sort, setSort] = useState("voteCount");

    useEffect(() => {
        if (localStorage.getItem("token") !== null) {
            const storage = JSON.parse(localStorage.getItem("token"));
            setLoggedIn(true);
            fetchHealth();
        } else {
            setLoggedIn(false);
        }

        async function fetchData() {
            await loadPosts(0);
        }

        async function fetchHealth() {
            try {
                await health();
            } catch (e) {
                localStorage.clear();
                setLoggedIn(false);
            }
        }

        fetchData();
    }, []);


    const loadPosts = async (page = 0, sortBy = sort, section = window.location.hash.substring(2)) => {
        setLoading(true);

        console.log(window.location.hash.substring(2));

        try {
            const response = await getPosts(page, sortBy, section.toLowerCase());
            setData(response.data);
        } catch (err) {
            console.error(err);
        }
        setLoading(false);
    }

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
        localStorage.setItem("token", JSON.stringify(token));
        setLoggedIn(true);
        await loadPosts(0);
    }

    const logout = async () => {
        localStorage.clear();
        setLoggedIn(false);
        await loadPosts(0);
    }


    return (
        <HashRouter>
            <div className="flex flex-col h-screen">
                <Navbar loggedIn={loggedIn}
                        logout={logout}
                        sort={sort}
                        setSort={setSort}
                        loadPosts={loadPosts}
                        setPage={setPage}
                        setIsPostModalOpen={() => setIsPostModalOpen(true)}
                        setIsRegisterModalOpen={() => setIsRegisterModalOpen(true)}
                        setIsLoginModalOpen={() => setIsLoginModalOpen(true)}/>


                <PostModal isOpen={isPostModalOpen}
                           loadPosts={() => loadPosts(0)}
                           closeModal={() => setIsPostModalOpen(false)}/>
                <LoginModal isOpen={isLoginModalOpen}
                            handleLogin={handleLogin}
                            closeModal={() => setIsLoginModalOpen(false)}/>
                <RegisterModal e isOpen={isRegisterModalOpen}
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
                    {sections.map(s =>
                        <Route path={s.path} key={s.name}>
                            <Home sort={sort}
                                  data={data}
                                  setSort={setSort}
                                  loadPosts={loadPosts}
                                  page={page}
                                  loggedIn={loggedIn}
                                  setPage={setPage}
                                  setIsLoginModalOpen={setIsLoginModalOpen}
                                  loading={loading}/>
                        </Route>
                    )}
                </Switch>
            </div>
        </HashRouter>
    );
}

export default App;