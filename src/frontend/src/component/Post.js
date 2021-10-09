import {
    AiOutlineComment, AiOutlineTrophy, BsTrophy,
    FaArrowDown,
    FaArrowUp, GiCheckedShield, GiChiliPepper,
} from "react-icons/all";
import {deletePost, vote} from "../service/service";
import {useEffect, useState} from "react";
import Comments from "./Comments";
import {postModalSections} from "../data/Data";
import {Link, useHistory, useLocation} from "react-router-dom";
import DeletePostModal from "./modal/DeletePostModal";
import PostMenu from "./menu/PostMenu";
import toast from "react-hot-toast";
import AwardModal from "./modal/AwardModal";
import {awards} from "../data/Awards";

const Post = ({post, openLoginModal, loggedIn, user}) => {
    const [voteDirection, setVoteDirection] = useState(post.userVote);
    const [voteCount, setVoteCount] = useState(post.voteCount);
    const [showComments, setShowComments] = useState(false);
    const [localCommentAdd, setLocalCommentAdd] = useState(0);
    const [upvoteEffect, setUpvoteEffect] = useState(false);
    const [downvoteEffect, setDownvoteEffect] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [isAwardModalOpen, setIsAwardModalOpen] = useState(false);
    let history = useHistory();
    let location = useLocation();

    const section = postModalSections.find(s => s.name.toLowerCase() === post.section)

    const getAwards = () => {
        let awardList = [];
        for (let awardKey in post.awards) {
            const award = awards.find(x => x.key == awardKey)
            const amount = post.awards[awardKey]
            awardList.push(
                <div className="flex items-center">
                    {award.icon(true)}
                    {amount > 1 && <p className="dark:text-gray-400 text-gray-500 text-sm">{amount}</p>}
                </div>
            )
        }
        return (
            <div className="flex space-x-1 mr-4">
                {awardList}
            </div>
        )
    }


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
        try {
            await deletePost(post.id);
            toast.success("Spicy deleted");
            history.push("/temp");
            history.goBack();
        } catch (e) {
            toast.error("Something went wrong");
            console.log(e);
        }
    }

    return (
        <>
            <div className="flex dark:bg-gray-800 bg-white sm:rounded-xl shadow-md flex flex-col w-full">
                <div className="flex flex-1">
                    <div
                        className={`${showComments ? "rounded-tl-xl rounded-br-xl" : "rounded-l-xl"} flex flex-col justify-center items-center px-2.5 space-y-0.5 dark:bg-gray-700 bg-gray-100`}>
                        <div className={`${upvoteEffect && "animate-upvote"}`}
                             onAnimationEnd={() => setUpvoteEffect(false)}
                             onClick={() => handleVote(1)}>
                            <FaArrowUp size={22}
                                       className={`${voteDirection === 1 && "text-red-500"} cursor-pointer text-gray-500 hover:text-red-500`}/>
                        </div>

                        <span className="text dark:text-gray-100 text-gray-900 font-bold">{voteCount}</span>

                        <div className={`${downvoteEffect && "animate-wiggle"}`}
                             onAnimationEnd={() => setDownvoteEffect(false)}
                             onClick={() => handleVote(-1)}>
                            <FaArrowDown size={22}
                                         className={`${voteDirection === -1 && "text-blue-600"} cursor-pointer dark:text-gray-500 text-gray-500 dark:hover:text-blue-600 hover:text-blue-600`}/>
                        </div>
                    </div>
                    <div className="flex-1 p-2.5">
                        <div className="flex justify-between mb-1 sm:mb-1.5">
                            <Link to={`/j/${section.name}`}
                                  className="text-sm dark:text-gray-400 text-gray-900 hover:underline inline-flex space-x-1">
                                {section.icon(true)}
                                <span>{section.name}</span>
                            </Link>
                            <div className="flex">
                                {getAwards()}
                                {user.username === post.userName && <PostMenu handleDelete={openDeleteModal}/>}
                            </div>
                        </div>
                        <h1 className="text-left dark:text-gray-100 text-gray-900 text-2xl mb-2 sm:mb-3 font-bold">{post.title[0].toUpperCase() + post.title.substring(1)}</h1>
                        {post.imageUrl &&
                        <div className="flex justify-center mb-2 mt-3">
                            {window.screen.width > 640 ?
                                <a href={post.imageUrl} target="_blank" rel="noopener noreferrer">
                                    <img style={{maxHeight: '640px'}} src={post.imageUrl} alt=""/>
                                </a> :
                                <img src={post.imageUrl} alt=""/>
                            }
                        </div>}
                        {post.content && <p className="dark:text-gray-100 text-gray-900">{post.content}</p>}

                        {/*Bottom Bar*/}
                        <div className="flex justify-between items-center pt-3 sm:pt-4">
                            <div className="flex space-x-6">
                                <button
                                    onClick={() => setShowComments(!showComments)}
                                    className="flex items-center dark:text-gray-400 text-gray-600 space-x-1 cursor-pointer dark:hover:text-red-500 hover:text-red-500">
                                    <AiOutlineComment size={24}/>
                                    <p className="text-sm">{post.commentCount + localCommentAdd} <span
                                        className="hidden sm:inline-block">{post.commentCount === 1 ? "Comment" : "Comments"}</span>
                                    </p>
                                </button>
                                <div
                                    onClick={() => {
                                        if (!loggedIn) {
                                            openLoginModal();
                                            return;
                                        }
                                        setIsAwardModalOpen(true)
                                    }}
                                    className="flex text-sm dark:text-gray-400 text-gray-600 items-center dark:hover:text-yellow-400 hover:text-yellow-400 cursor-pointer group">
                                    <AiOutlineTrophy className="mr-0.5" size={24}/>
                                    <p>Award</p>
                                </div>
                            </div>
                            <p className="flex items-center text-xs dark:text-gray-400 text-gray-600">
                                <span className="hidden sm:inline-block">Posted by&nbsp;</span>
                                <Link className="capitalize hover:underline"
                                      to={`/user/${post.userName}`}>{post.userName === user.username ? "You" : post.userName}</Link>
                                <GiCheckedShield
                                    hidden={post.userName !== "admin"}
                                    className="ml-0.5 mt-0.5 text-red-500"/>
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

            <AwardModal
                isOpen={isAwardModalOpen}
                postId={post.id}
                closeModal={() => setIsAwardModalOpen(false)}
            />


        </>
    )
}

export default Post;