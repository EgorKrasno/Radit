import {AiOutlineComment, FaArrowDown, FaArrowUp} from "react-icons/all";

const Post = ({content, title, voteCount, userName}) => {
    return (<div className="flex w-1/2 bg-white rounded-lg shadow-md px-4 py-3">
        <div className="flex flex-col justify-center items-center pr-4 space-y-1">
            <FaArrowUp size={22} className="cursor-pointer text-gray-500 hover:text-red-500"/>
            <span className="text-sm font-semibold">101</span>
            <FaArrowDown size={22} className="cursor-pointer text-gray-500 hover:text-blue-600"/>
        </div>
        <div className="flex-1">
            <h1 className="text-center text-xl font-semibold">{title}</h1>
            <p className="">{content}</p>
            <button
                className="flex items-center pt-2 text-gray-600 space-x-1 cursor-pointer hover:text-red-500">
                <AiOutlineComment size={22}/>
                <p className="text-sm">Comments</p>
            </button>
        </div>
    </div>)
}

export default Post;