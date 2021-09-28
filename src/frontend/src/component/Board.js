import Post from "./Post";
import {getPosts} from "../service/service";
import {useState} from "react";

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
                                                   openLoginModal={() => setIsLoginModalOpen(true)}
            />));
        } else {

        }
    }

    return (
        <div className="flex flex-col justify-center items-center w-11/12 md:w-8/12 xl:w-5/12 mx-auto">



            {renderPosts()}
            <div className="mt-6 flex justify-between w-full">
                <button
                    className={`${page === 0 && "invisible"} cursor-pointer rounded-lg text-white font-semibold py-1.5 px-5 bg-gradient-to-r from-red-600 to-yellow-500`}
                    onClick={() => handlePageChange(-1)}
                >Previous
                </button>
                <button
                    className={`${!data.hasNext && "invisible"} cursor-pointer rounded-lg text-white font-semibold py-1.5 px-5 bg-gradient-to-r from-red-600 to-yellow-500`}
                    onClick={() => handlePageChange(1)}
                >Next
                </button>
            </div>
        </div>
    );
}

export default Board;