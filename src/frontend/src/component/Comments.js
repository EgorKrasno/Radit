import {useParams} from "react-router-dom";
import Comment from "./Comment";
import {useEffect, useState} from "react";
import {createComment, getComments} from "../service/service";

const Comments = ({post, addLocalComment, loggedIn, openLoginModal}) => {
    const [comment, setComment] = useState("");
    const [comments, setComments] = useState({});

    const handleClick = async (e) => {
        if(!loggedIn){
            openLoginModal();
            return;
        }
        e.preventDefault();
        addLocalComment();
        await createComment({postId: post.id, text: comment});
        await loadComments();
        setComment("");
    }

    useEffect(() => {
        async function fetchData() {
            await loadComments();
        }

        fetchData();
    }, []);

    const loadComments = async () => {
        const response = await getComments(post.id);
        setComments(response.data);
        console.log(response.data);
    }

    return (
        <>
            <div className="mt-5 divide-y divide-gray-300">
                {(comments !== null && comments.length > 0) && comments.map((c) => <Comment key={c.id} data={c}/>)}
            </div>
            <div className="border rounded-md my-3 flex flex-col focus-within:border-red-500">
            <textarea
                placeholder="Add a comment"
                rows={3}
                className="outline-none rounded-md py-2 px-4"
                value={comment}
                onChange={e => setComment(e.target.value)}
            />
                <div className="py-1.5 px-2 bg-gray-100 w-full flex justify-end items-center rounded-b-md ">
                    <button onClick={handleClick}
                            className="cursor-pointer rounded-full text-white font-semibold text-sm py-1 px-5 bg-gradient-to-r from-red-600 to-yellow-500">
                        Comment
                    </button>
                </div>
            </div>
        </>
    );
}

export default Comments;