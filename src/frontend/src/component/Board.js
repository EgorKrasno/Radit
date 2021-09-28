import Post from "./Post";
import {RadioGroup} from '@headlessui/react'
import {GiNewBorn, GiNewShoot, GoFlame} from "react-icons/all";
import toast from "react-hot-toast";

const Board = ({data, loggedIn, setIsLoginModalOpen, loadPosts, page, setPage, sort, setSort}) => {

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
        <div className="flex flex-col justify-center items-center w-11/12 md:w-8/12 xl:w-5/12 mx-auto">
            <div className="mt-5 bg-white w-full rounded-lg">
                <RadioGroup value={sort} onChange={(e) => {
                    setSort(e);
                    loadPosts(page, e);
                }}>
                    <div className="flex flex-row ml-4 space-x-3 py-2">
                        <RadioGroup.Option value="voteCount">
                            {({checked}) => (
                                <div
                                    className={`${checked ? 'bg-gradient-to-r from-red-600 to-yellow-500' : 'text-gray-900 border-2 border-yellow-500'} flex items-center cursor-pointer rounded-full text-white font-semibold px-5 h-8`}>
                                    <GoFlame className="mr-1"/>
                                    <p>Top</p>
                                </div>
                            )}
                        </RadioGroup.Option>
                        <RadioGroup.Option value="createdDate">
                            {({checked}) => (
                                <div
                                    className={`${checked ? 'bg-gradient-to-r from-red-600 to-yellow-500' : 'text-gray-900 border-2 border-yellow-500'} flex items-center cursor-pointer rounded-full text-white font-semibold px-5 h-8`}>
                                    <GiNewShoot className="mr-1"/>
                                    <p>New</p>
                                </div>
                            )}
                        </RadioGroup.Option>
                    </div>
                </RadioGroup>
            </div>

            {
                renderPosts()
            }
            <div className="mt-5 flex justify-between w-full">
                <button
                    className={`${page === 0 && "invisible"} cursor-pointer rounded-full text-white font-semibold py-1.5 px-5 bg-gradient-to-r from-red-600 to-yellow-500`}
                    onClick={() => handlePageChange(-1)}
                >Previous
                </button>
                <button
                    className={`${!data.hasNext && "invisible"} cursor-pointer rounded-full text-white font-semibold py-1.5 px-5 bg-gradient-to-r from-red-600 to-yellow-500`}
                    onClick={() => handlePageChange(1)}
                >Next
                </button>
            </div>
        </div>
    );
}

export default Board;