import {AiOutlineComment, FaArrowDown, FaArrowUp} from "react-icons/all";
import {vote} from "../service/service";
import {useState} from "react";
import Comments from "./Comments";

const Post = ({post, openLoginModal, loggedIn}) => {
    const [voteDirection, setVoteDirection] = useState(post.userVote);
    const [voteCount, setVoteCount] = useState(post.voteCount);
    const [showComments, setShowComments] = useState(false);
    const [localCommentAdd, setLocalCommentAdd] = useState(0);


    const handleVote = async (direction) => {
        if (!loggedIn) {
            openLoginModal();
            return;
        }
        if (direction !== voteDirection) {
            if (post.userVote === 0 && voteCount === post.voteCount) {
                setVoteCount(voteCount + direction);
            } else {
                setVoteCount(voteCount + (direction * 2));
            }
            setVoteDirection(direction);
            const id = post.id;
            await vote({direction, id});
        }
    }

    return (
        <div className="flex w-11/12 sm:w-1/2 bg-white rounded-lg shadow-md px-4 py-3 flex flex-col mt-5 sm:mt-8">
            <div className="flex flex-1">
                <div className="flex flex-col justify-center items-center pr-4 space-y-1">
                    <div onClick={() => handleVote(1)}>
                        <FaArrowUp size={22}
                                   className={`${voteDirection === 1 && "text-red-500"} cursor-pointer text-gray-500 hover:text-red-500`}/>
                    </div>
                    <span className="text-sm font-semibold">{voteCount}</span>
                    <div onClick={() => handleVote(-1)}>
                        <FaArrowDown size={22}
                                     className={`${voteDirection === -1 && "text-blue-600"} cursor-pointer text-gray-500 hover:text-blue-600`}/>
                    </div>
                </div>
                <div className="flex-1">
                    <h1 className="text-center text-xl font-semibold">{post.title}</h1>
                    <p className="">{post.content}</p>
                    <div className="flex justify-between items-center pt-2">
                        <button
                            onClick={() => setShowComments(!showComments)}
                            className="flex items-center text-gray-600 space-x-1 cursor-pointer hover:text-red-500">
                            <AiOutlineComment size={22}/>
                            <p className="text-sm">{post.commentCount + localCommentAdd} Comments</p>
                        </button>
                        <p className="text-sm text-gray-500 capitalize">{`Posted by ${post.userName}`}</p>
                    </div>
                </div>
            </div>
            {showComments &&
            <Comments openLoginModal={openLoginModal} loggedIn={loggedIn} addLocalComment={() => setLocalCommentAdd(localCommentAdd + 1)} post={post}/>}
        </div>
    )
}

export default Post;