import {
    AiOutlineComment,
    FaArrowDown,
    FaArrowUp,
    GiQueenCrown
} from "react-icons/all";
import {deletePost, vote} from "../service/service";
import {useState} from "react";
import Comments from "./Comments";
import {postModalSections} from "../data/Data";
import {Link} from "react-router-dom";
import DeletePostModal from "./DeletePostModal";
import PostMenu from "./PostMenu";
import toast from "react-hot-toast";

const Post = ({post, openLoginModal, loggedIn, refresh, user}) => {
    const [voteDirection, setVoteDirection] = useState(post.userVote);
    const [voteCount, setVoteCount] = useState(post.voteCount);
    const [showComments, setShowComments] = useState(false);
    const [localCommentAdd, setLocalCommentAdd] = useState(0);
    const [upvoteEffect, setUpvoteEffect] = useState(false);
    const [downvoteEffect, setDownvoteEffect] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

    const section = postModalSections.find(s => s.name.toLowerCase() === post.section)

    const handleVote = async (direction) => {
        if (!loggedIn) {
            openLoginModal();
            return;
        }
        if (direction !== voteDirection) {
            direction > 0 ? setUpvoteEffect(true) : setDownvoteEffect(true);

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

    const openDeleteModal = () => setIsDeleteModalOpen(true);

    const handleDelete = async () => {
        try{
            await deletePost(post.id);
            toast.success("Spicy deleted");
            refresh();
        } catch (e){
            toast.error("Something went wrong");
            console.log(e);
        }
    }

    return (
        <>
            <div className="flex bg-white sm:rounded-xl shadow-md px-3 sm:px-6 py-4 flex flex-col w-full">
                <div className="flex flex-1">
                    <div className="flex flex-col justify-center items-center pr-3 sm:pr-6 space-y-1.5">
                        <div className={`${upvoteEffect && "animate-upvote"}`}
                             onAnimationEnd={() => setUpvoteEffect(false)}
                             onClick={() => handleVote(1)}>
                            <FaArrowUp size={22}
                                       className={`${voteDirection === 1 && "text-red-500"} cursor-pointer text-gray-500 hover:text-red-500`}/>
                        </div>

                        <span className="text font-bold">{voteCount}</span>

                        <div className={`${downvoteEffect && "animate-wiggle"}`}
                             onAnimationEnd={() => setDownvoteEffect(false)}
                             onClick={() => handleVote(-1)}>
                            <FaArrowDown size={22}
                                         className={`${voteDirection === -1 && "text-blue-600"} cursor-pointer text-gray-500 hover:text-blue-600`}/>
                        </div>
                    </div>
                    <div className="flex-1">
                        <div className="flex justify-between">
                            <Link to={`/${section.name}`}
                                  className="text-sm pl-0.5 text-gray-900 hover:underline inline-flex mb-3 space-x-1">
                                {section.icon(true)}
                                <span>{section.name}</span>
                            </Link>
                            {user.username === post.userName && <PostMenu handleDelete={openDeleteModal}/>}
                        </div>
                        <h1 className="text-left text-gray-900 text-xl mb-3 font-bold">{post.title[0].toUpperCase() + post.title.substring(1)}</h1>
                        {post.imageUrl &&
                        <img className="max-h-72 max-w-72 mx-auto mb-2 mt-3" src={post.imageUrl} alt=""/>}
                        {post.content && <p className="text-gray-900">{post.content}</p>}
                        <div className="flex justify-between items-center pt-4">
                            <button
                                onClick={() => setShowComments(!showComments)}
                                className="flex items-center text-gray-600 space-x-1 cursor-pointer hover:text-red-500">
                                <AiOutlineComment size={22}/>
                                <p className="text-sm">{post.commentCount + localCommentAdd} <span
                                    className="hidden sm:inline-block">{post.commentCount === 1 ? "Comment" : "Comments"}</span>
                                </p>
                            </button>
                            <p className="flex items-center text-xs text-gray-600">
                                <span className="hidden sm:inline-block">Posted by&nbsp;</span>
                                <Link className="capitalize hover:underline"
                                      to={`/user/${post.userName}`}>{post.userName === user.username ? "You" : post.userName}</Link>
                                <GiQueenCrown
                                    hidden={post.userName !== "admin"}
                                    className="ml-0.5"/>
                                <span className="ml-1 lowercase">{post.duration}</span>
                            </p>
                        </div>
                    </div>
                </div>
                {showComments &&
                <Comments openLoginModal={openLoginModal} loggedIn={loggedIn}
                          addLocalComment={() => setLocalCommentAdd(localCommentAdd + 1)} post={post}/>}
            </div>

            <DeletePostModal isOpen={isDeleteModalOpen}
                             handleDelete={handleDelete}
                             closeModal={() => setIsDeleteModalOpen(false)}/>

        </>
    )
}

export default Post;