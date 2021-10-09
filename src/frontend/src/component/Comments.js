import Comment from "./Comment";
import {useEffect, useState} from "react";
import {createComment, getComments} from "../service/service";
import toast from 'react-hot-toast';

const Comments = ({post, addLocalComment, loggedIn, openLoginModal}) => {
    const [comment, setComment] = useState("");
    const [comments, setComments] = useState({});

    const handleClick = async (e) => {
        if (!loggedIn) {
            openLoginModal();
            return;
        }
        e.preventDefault();
        try {
            await createComment({postId: post.id, text: comment});
            addLocalComment();
            toast.success("Comment created");
            await loadComments();
        } catch (e) {
            toast.error("Something went wrong");
            console.error(e.response.data);
        }
        setComment("");
    }

    useEffect(() => {
        async function fetchData() {
            await loadComments();
        }

        fetchData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const loadComments = async () => {
        const response = await getComments(post.id);
        setComments(response.data);
    }

    return (
        <>
            <div className="mt-2 divide-y dark:divide-gray-700 divide-gray-300 sm:max-h-96 sm:overflow-y-auto comments">
                {(comments !== null && comments.length > 0) && comments.map((c) => <Comment key={c.id} data={c}/>)}
            </div>
            <div className="border mx-3 mb-4 rounded-xl flex flex-col dark:border-gray-500 dark:focus-within:border-yellow-500 focus-within:border-yellow-500">
            <textarea
                placeholder="Add a comment"
                rows={3}
                className="outline-none dark:bg-gray-600 dark:text-gray-100 text-gray-900 bg-white rounded-t-xl py-2 px-4 "
                value={comment}
                onChange={e => setComment(e.target.value)}
            />
                <div className="py-1.5 px-2 dark:bg-gray-700 bg-gray-100 w-full flex justify-end items-center rounded-b-xl ">
                    <button onClick={handleClick}
                            className="cursor-pointer rounded-full dark:text-gray-100 text-white font-semibold text-sm py-1 px-5 bg-gradient-to-r from-red-600 to-yellow-500">
                        Comment
                    </button>
                </div>
            </div>
        </>
    );
}

export default Comments;