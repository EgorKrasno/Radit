import {GiTechnoHeart} from "react-icons/all";
import {useEffect, useState} from 'react'
import {getPosts, login} from "./service/service";
import Post from "./component/Post";
import PostModal from "./component/PostModal";
import LoginModal from "./component/LoginModal";

const App = () => {
    const [userData, setUserData] = useState({});
    const [loggedIn, setLoggedIn] = useState(false);
    const [isPostModalOpen, setIsPostModalOpen] = useState(false)
    const [isLoginModalOpen, setIsLoginModalOpen] = useState(false)
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
            console.log(response.data);
            setPosts(response.data);
        } catch (err) {
            console.error(err);
        }
        setLoading(false);
    }

    const handleLogin = async (user) => {
        // setLoading(true);
        try {
            const response = await login(user);
            const userObj = response.data;
            const token = response.headers["jwt-token"];
            localStorage.setItem("currentUser", JSON.stringify({userObj, token}));
            setUserData(userObj);
            setLoggedIn(true);
        } catch (e) {
            console.log(e);
        }
            // setLoading(false);

    }

    return (
        <div className="flex flex-col h-screen">
            <div className="flex w-screen bg-white shadow-sm items-center justify-between h-16 px-8 z-20">
                <div className="cursor-pointer flex items-center font-bold text-2xl text-red-500 space-x-2">
                    <GiTechnoHeart size={36} className={"text-red-500"}/>
                    <p>Radit</p>
                </div>
                <div className="space-x-2">
                    <button onClick={() => setIsLoginModalOpen(true)}
                            className="cursor-pointer rounded-lg text-gray-900 font-semibold py-1.5 px-4 border-2 border-red-600">
                        Login
                    </button>

                    <button onClick={() => setIsPostModalOpen(true)}
                            className="cursor-pointer rounded-lg text-white font-semibold py-1.5 px-4 bg-gradient-to-r from-red-600 to-yellow-500">
                        Post 🚀
                    </button>
                </div>
            </div>

            <div className="py-8 flex-1 overflow-y-auto bg-gray-200">
                <div className="space-y-10 flex flex-col justify-center items-center">
                    {(!loading && posts.length > 0) && posts.map((post) => <Post key={post.id} content={post.content} title={post.title}
                                                           userName={post.userName}
                                                           voteCount={post.voteCount}/>)}
                </div>
            </div>


            <PostModal isOpen={isPostModalOpen} closeModal={() => setIsPostModalOpen(false)}/>
            <LoginModal isOpen={isLoginModalOpen} handleLogin={handleLogin} closeModal={() => setIsLoginModalOpen(false)}/>

        </div>
    );
}

export default App;