import {FiLogOut, GiTechnoHeart} from "react-icons/all";
import {useEffect, useState} from 'react'
import {getPosts, health, login, register} from "./service/service";
import Post from "./component/Post";
import PostModal from "./component/PostModal";
import LoginModal from "./component/LoginModal";
import RegisterModal from "./component/RegisterModal";
import SettingsMenu from "./component/SettingsMenu";
import Board from "./component/Board";
import Navbar from "./component/Navbar";

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
            const userHealth = await health();
            if (!userHealth.data) {
                localStorage.clear();
                setLoggedIn(false);
            }
        }

        fetchData();
    }, []);


    const loadPosts = async (page, sortBy = "voteCount") => {
        setLoading(true);
        try {
            const response = await getPosts(page, sortBy);
            setData(response.data);
        } catch (err) {
            console.error(err);
        }
        setLoading(false);
    }

    const filterLoadPosts = async () => {

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
        <div className="flex flex-col h-screen">
            <Navbar loggedIn={loggedIn}
                    logout={logout}
                    setIsPostModalOpen={() => setIsPostModalOpen(true)}
                    setIsRegisterModalOpen={() => setIsRegisterModalOpen(true)}
                    setIsLoginModalOpen={() => setIsLoginModalOpen(true)}/>

            <div className="flex-1 overflow-y-auto bg-gray-200 pb-8 w-full">
                {!(loading || data === null) &&
                <Board data={data} sort={sort} setSort={setSort} loggedIn={loggedIn} loadPosts={loadPosts} page={page}
                       setPage={setPage}
                       setIsLoginModalOpen={() => setIsLoginModalOpen(true)}/>}
            </div>

            <PostModal isOpen={isPostModalOpen} loadPosts={() => loadPosts(0)}
                       closeModal={() => setIsPostModalOpen(false)}/>
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