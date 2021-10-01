import Post from "./Post";

const Board = ({data, loggedIn, setIsLoginModalOpen, loadPosts, page, setPage}) => {

    const handlePageChange = (direction) => {
        if (direction === 1) {
            setPage(page + 1);
            loadPosts(page + 1);
        } else {
            setPage(page - 1);
            loadPosts(page - 1);
        }
    }

    const renderPosts = () => {
        if (data.posts.length > 0) {
            return (data.posts.map((post) => <Post key={post.id}
                                                   post={post}
                                                   loggedIn={loggedIn}
                                                   openLoginModal={() => setIsLoginModalOpen(true)}/>));
        } else {
            return (<p className="font-semibold text-xl mt-8">No Posts yet</p>);
        }
    }

    return (
        <div className="flex flex-col justify-center items-center md:w-8/12 xl:w-5/12 mx-auto">
            {renderPosts()}
            <div className="mt-5 flex justify-between w-full">
                <button
                    className={`${page <= 0 && "invisible"} shadow cursor-pointer rounded-full text-white font-semibold py-1.5 px-5 bg-gradient-to-r from-red-600 to-yellow-500`}
                    onClick={() => handlePageChange(-1)}
                >Previous
                </button>
                <button
                    className={`${!data.hasNext && "invisible"} shadow cursor-pointer rounded-full text-white font-semibold py-1.5 px-5 bg-gradient-to-r from-red-600 to-yellow-500`}
                    onClick={() => handlePageChange(1)}
                >Next
                </button>
            </div>
        </div>
    );
}

export default Board;