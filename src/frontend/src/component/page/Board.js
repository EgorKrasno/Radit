import Post from "../Post";
import {useEffect, useState, useRef, useCallback} from "react";
import {useLocation} from "react-router-dom";
import useInfiniteScroll from "../../hook/useInfiniteScroll";

const Board = ({loggedIn, setIsLoginModalOpen, user}) => {
    let location = useLocation();
    const [pageNumber, setPageNumber] = useState(0);
    const [section, setSection] = useState(location.pathname.substring(3).toLowerCase() || 'all');
    const [sortBy, setSortBy] = useState(location.search.split('=')[1] || 'voteCount');
    const [refresh, setRefresh] = useState(false);

    const {loading, posts, error, hasMore} = useInfiniteScroll(pageNumber, section, sortBy, refresh, loggedIn)
    const observer = useRef();
    const myRef = useRef(null)


    const executeScroll = () => myRef.current.scrollIntoView({block: 'end'})

    useEffect(() => {
        executeScroll();
        setPageNumber(0);
        if (location.state != null) setRefresh(!refresh);
        setSection(location.pathname.substring(3).toLowerCase() || 'all');
        setSortBy(location.search.split('=')[1] || 'voteCount');
    }, [location]);

    const lastElementRef = useCallback(node => {
        if (loading) return
        if (observer.current) observer.current.disconnect()
        observer.current = new IntersectionObserver(entries => {
            if (entries[0].isIntersecting && hasMore) {
                setPageNumber(prevPageNumber => prevPageNumber + 1)
            }
        })
        if (node) observer.current.observe(node);
    }, [loading, hasMore]);


    const renderPosts = () => {

            return (posts.map((post, i) => {
                    return <div key={post.id} className="w-full" ref={posts.length === i + 1 ? lastElementRef : null}>
                        <Post
                            post={post}
                            user={user}
                            loggedIn={loggedIn}
                            openLoginModal={() => setIsLoginModalOpen(true)}/>
                    </div>
                })
            );
    }
    return (
        <>
            <div className="mt-2 sm:mt-6" ref={myRef}/>
            <div className="flex flex-col justify-center items-center space-y-2 sm:space-y-6 pb-2 sm:pb-6">
                {renderPosts()}
            </div>
        </>
    );
}

export default Board;


//Old Skeleton
// return <div className="w-full space-y-6">
//     {Array(5).fill().map((item, i) => (
//         <div key={i} className="bg-white px-6 rounded-xl w-full pt-3 space-y-3 pb-3">
//             <div className='flex w-full space-x-2'>
//                 <Skeleton height={20} width={20} circle={true}/>
//                 <Skeleton height={20} width={80}/>
//             </div>
//             <div><Skeleton height={30} width={"100%"}/></div>
//             <div><Skeleton height={60} width={"100%"}/></div>
//             <div className='flex flex-row justify-between w-full space-x-2'>
//                 <div className="space-x-2">
//                     <Skeleton height={20} width={20} circle={true}/>
//                     <Skeleton height={20} width={100}/>
//                 </div>
//                 <div className=""><Skeleton height={20} width={170}/></div>
//             </div>
//         </div>))}
// </div>