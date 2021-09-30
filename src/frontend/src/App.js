import {
    AiFillHome,
    GiCoffeeBeans,
    GiDespair,
    GiFossil,
    GiPerspectiveDiceSixFacesRandom,
} from "react-icons/all";
import {useEffect, useState} from 'react'
import {getPosts, health, login, register} from "./service/service";
import PostModal from "./component/PostModal";
import LoginModal from "./component/LoginModal";
import RegisterModal from "./component/RegisterModal";
import Navbar from "./component/Navbar";
import {Toaster} from "react-hot-toast";
import {BrowserRouter, Route, Switch} from "react-router-dom";
import Home from "./component/Home";

const App = () => {
    const [loggedIn, setLoggedIn] = useState(false);
    const [isPostModalOpen, setIsPostModalOpen] = useState(false)
    const [isLoginModalOpen, setIsLoginModalOpen] = useState(false)
    const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false)
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState({});
    const [page, setPage] = useState(0);
    const [sort, setSort] = useState("voteCount");

    const sections = [
        {
            name: 'All',
            href: '/All',
            icon: () => <AiFillHome className="text-gray-900 mr-2" size={22}/>
        },
        {
            name: 'RareMemes',
            href: '/RareMemes',
            icon: () => <GiFossil className="text-yellow-500 mr-2" size={22}/>
        },
        {
            name: 'Beans',
            href: '/Beans',
            icon: () => <GiCoffeeBeans className="text-yellow-900 mr-2" size={22}/>
        }, {
            name: 'Programming',
            href: '/Programming',
            icon: () => <GiDespair className="text-blue-600 mr-2" size={22}/>
        },
        {
            name: 'Random',
            href: '/Random',
            icon: () => <GiPerspectiveDiceSixFacesRandom className="text-red-600 mr-2" size={22}/>
        }
    ]

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


    const loadPosts = async (page = 0, sortBy=sort, section = window.location.pathname.slice(1)) => {
        //defaults only happen on page refresh
        setLoading(true);
        // console.log(page);
        // console.log(sortBy);
        // console.log(section);
        try {
            const response = await getPosts(page, sortBy, section);
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
        <BrowserRouter>
            <div className="flex flex-col h-screen">
                <Navbar loggedIn={loggedIn}
                        logout={logout}
                        sections={sections}
                        sort={sort}
                        setSort={setSort}
                        loadPosts={loadPosts}
                        setPage={setPage}
                        setIsPostModalOpen={() => setIsPostModalOpen(true)}
                        setIsRegisterModalOpen={() => setIsRegisterModalOpen(true)}
                        setIsLoginModalOpen={() => setIsLoginModalOpen(true)}/>


                <PostModal isOpen={isPostModalOpen}
                           sections={sections}
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
        </BrowserRouter>
    );
}

export default App;