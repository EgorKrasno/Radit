import Post from "./Post";
import {useEffect, useState} from "react";
import {getPosts} from "../service/service";
import Skeleton from "react-loading-skeleton";
import {useLocation} from "react-router-dom";

const Board = ({loggedIn, setIsLoginModalOpen, user}) => {
    let location = useLocation();
    const [data, setData] = useState({});
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchData() {
            await loadPosts();
        }

        console.log(location.pathname.substring(3));
        console.log(location.search.split('=')[1]);
        fetchData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [loggedIn, location]);

    const loadPosts = async () => {
        setLoading(true);
        const section = location.pathname.substring(3).toLowerCase() || 'all';
        const sortBy = location.search.split('=')[1] || 'voteCount';
        try {
            const response = await getPosts('0', sortBy, section);
            setData(response.data);
        } catch (err) {
            console.error(err);
        }
        setLoading(false);
    }

    const renderPosts = () => {
        if (!loading) {
            if (data.posts.length > 0) {
                return (
                    <>
                        {data.posts.map((post) => <Post key={post.id}
                                                        post={post}
                                                        user={user}
                            // refresh={() => refresh()}
                                                        loggedIn={loggedIn}
                                                        openLoginModal={() => setIsLoginModalOpen(true)}/>)}
                    </>);
            } else {
                return <p className="font-bold text-xl">No Posts yet</p>
            }
        } else if (loading) {
            return <div className="w-full space-y-6">
                {Array(5).fill().map((item, i) => (
                    <div key={i} className="bg-white px-6 rounded-xl w-full pt-3 space-y-3 pb-3">
                        <div className='flex w-full space-x-2'>
                            <Skeleton height={20} width={20} circle={true}/>
                            <Skeleton height={20} width={80}/>
                        </div>
                        <div><Skeleton height={30} width={"100%"}/></div>
                        <div><Skeleton height={60} width={"100%"}/></div>
                        <div className='flex flex-row justify-between w-full space-x-2'>
                            <div className="space-x-2">
                                <Skeleton height={20} width={20} circle={true}/>
                                <Skeleton height={20} width={100}/>
                            </div>
                            <div className=""><Skeleton height={20} width={170}/></div>
                        </div>
                    </div>))}
            </div>
        }
    }

    return (
        <div className="flex flex-col justify-center items-center space-y-2 sm:space-y-6 pb-2 sm:pb-6">
            {renderPosts()}
        </div>
    );
}

export default Board;