import {FiLogOut, GiTechnoHeart} from "react-icons/all";
import {useEffect, useState} from 'react'
import {getPosts, login, register} from "./service/service";
import Post from "./component/Post";
import PostModal from "./component/PostModal";
import LoginModal from "./component/LoginModal";
import RegisterModal from "./component/RegisterModal";
import SettingsMenu from "./component/SettingsMenu";

const App = () => {
    const [userData, setUserData] = useState({});
    const [loggedIn, setLoggedIn] = useState(false);
    const [isPostModalOpen, setIsPostModalOpen] = useState(false)
    const [isLoginModalOpen, setIsLoginModalOpen] = useState(false)
    const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false)
    const [loading, setLoading] = useState(true);
    const [posts, setPosts] = useState({});

    useEffect(() => {
        if (localStorage.getItem("currentUser") !== null) {
            const storage = JSON.parse(localStorage.getItem("currentUser"));
            setUserData(storage.user);
            setLoggedIn(true);
        } else {
            setLoggedIn(false);
        }

        async function fetchData() {
            await loadPosts();
        }

        fetchData();
    }, []);

    const loadPosts = async () => {
        setLoading(true);
        try {
            const response = await getPosts();
            setPosts(response.data);
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
        const userObj = response.data;
        const token = response.headers["jwt-token"];
        localStorage.setItem("currentUser", JSON.stringify({userObj, token}));
        setUserData(userObj);
        setLoggedIn(true);
        await loadPosts();
    }

    const logout = async () => {
        localStorage.clear();
        setUserData({});
        setLoggedIn(false);
        await loadPosts();
    }


    return (
        <div className="flex flex-col h-screen">
            <div className="flex w-screen bg-white shadow-sm items-center justify-between h-14 px-8 z-20">
                <div className="cursor-pointer flex items-center font-bold text-2xl text-red-500 space-x-2">
                    <GiTechnoHeart size={34} className={"text-red-500"}/>
                    <p className="hidden sm:inline-block">Radit</p>
                </div>
                <div className="space-x-2">
                    {loggedIn ?
                        <div className="flex space-x-4 items-center">
                            <button onClick={() => setIsPostModalOpen(true)}
                                    className="cursor-pointer rounded-lg text-white font-semibold py-1.5 px-4 bg-gradient-to-r from-red-600 to-yellow-500">
                                Post 🚀
                            </button>
                            {/*<button onClick={logout}*/}
                            {/*        className="flex cursor-pointer rounded-lg text-gray-900 font-semibold p-2 border-2 border-red-600">*/}
                            {/*    <FiLogOut size="20" className="text-red-500"/>*/}
                            {/*</button>*/}
                            <SettingsMenu handleLogout={logout}/>
                        </div>
                        :
                        <>
                            <button onClick={() => setIsRegisterModalOpen(true)}
                                    className="cursor-pointer rounded-lg text-gray-900 font-semibold py-1.5 px-4 border-2 border-red-500">
                                Register
                            </button>

                            <button onClick={() => setIsLoginModalOpen(true)}
                                    className="cursor-pointer rounded-lg text-gray-900 font-semibold py-1.5 px-4 border-2 border-red-500">
                                Login
                            </button>
                        </>
                    }
                </div>
            </div>

            <div className="flex-1 overflow-y-auto bg-gray-200 pb-8">
                <div className="flex flex-col justify-center items-center">
                    {(!loading && posts.length > 0) ? posts.map((post) => <Post key={post.id}
                                                                                post={post}
                                                                                loggedIn={loggedIn}
                                                                                openLoginModal={() => setIsLoginModalOpen(true)}
                        />) :
                        <div className="flex flex-col h-full mt-12">
                            <p className="text-2xl">Be the first to make a post!</p>
                        </div>

                    }
                </div>
            </div>

            <PostModal isOpen={isPostModalOpen} loadPosts={loadPosts} closeModal={() => setIsPostModalOpen(false)}/>
            <LoginModal isOpen={isLoginModalOpen}
                        handleLogin={handleLogin}
                        closeModal={() => setIsLoginModalOpen(false)}/>
            <RegisterModal e isOpen={isRegisterModalOpen}
                           handleRegister={handleRegister}
                           closeModal={() => setIsRegisterModalOpen(false)}/>
        </div>
    );
}

export default App;