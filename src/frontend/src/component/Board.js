import Post from "./Post";
import {useEffect, useState} from "react";
import {getPosts} from "../service/service";
import Skeleton from "react-loading-skeleton";

const Board = ({loggedIn, setIsLoginModalOpen, page, setPage, sort, section, refreshBoard, user}) => {

    const [data, setData] = useState({});
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchData() {
            await loadPosts(page);
        }

        fetchData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [section, sort, loggedIn, page, refreshBoard]);

    const loadPosts = async (page = 0, sortBy = sort) => {
        setLoading(true);
        const sectionName = section !== null ? section.name.toLowerCase() : 'all';
        try {
            const response = await getPosts(page, sortBy, sectionName);
            setData(response.data);
        } catch (err) {
            console.error(err);
        }
        setLoading(false);
    }

    const refresh = async () => {
        if (page === 0) {
            await loadPosts()
        } else {
            setPage(0);
        }
    }

    const handlePageChange = (direction) => direction === 1 ? setPage(page + 1) : setPage(page - 1)


    const renderPosts = () => {
        if (!loading) {
            if (data.posts.length > 0) {
                return (
                    <>
                        {data.posts.map((post) => <Post key={post.id}
                                                        post={post}
                                                        user={user}
                                                        refresh={() => refresh()}
                                                        loggedIn={loggedIn}
                                                        openLoginModal={() => setIsLoginModalOpen(true)}/>)}
                        <div
                            className="mt-4 flex justify-between items-center w-full bg-white sm:rounded-xl shadow-md py-2 px-3">
                            <button
                                className={`${page <= 0 && "invisible"} shadow cursor-pointer rounded-full text-white font-semibold py-1.5 px-5 bg-gradient-to-r from-red-600 to-yellow-500`}
                                onClick={() => handlePageChange(-1)}
                            >Previous
                            </button>
                            <p className="text-gray-600">Page {page + 1}</p>
                            <button
                                className={`${!data.hasNext && "invisible"} shadow cursor-pointer rounded-full text-white font-semibold py-1.5 px-5 bg-gradient-to-r from-red-600 to-yellow-500`}
                                onClick={() => handlePageChange(1)}
                            >Next
                            </button>
                        </div>
                    </>);
            } else {
                return <p className="font-bold text-xl">No Posts yet</p>
            }
        } else if (loading) {
            return <div className="w-full space-y-6">
                {Array(5).fill(<div className="bg-white px-6 rounded-xl w-full pt-3 space-y-3 pb-3">
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
                </div>)}
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