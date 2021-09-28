
import {GiQueenCrown} from "react-icons/all";

const Comment  = ({data}) => {
    return (
        <div className="py-3 flex flex-col">
            <h1 className="flex items-center text-sm text-gray-500 capitalize">{data.userName} <GiQueenCrown hidden={data.userName !== "admin"} className="ml-0.5"/> </h1>
            <h1 className="text-sm">{data.text}</h1>
        </div>
    );
}

export default Comment;