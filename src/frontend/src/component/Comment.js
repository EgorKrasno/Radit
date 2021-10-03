import {GiQueenCrown} from "react-icons/all";
import {Link} from "react-router-dom";

const Comment = ({data}) => {
    return (
        <div className="py-4 flex flex-col space-y-2">
            <div className="flex space-x-2 items-baseline">

                <Link to={`/user/${data.userName}`} className="flex items-center text-sm font-bold text-gray-900 capitalize hover:underline">{data.userName}
                    <GiQueenCrown
                        hidden={data.userName !== "admin"} className="ml-1"/>
                </Link>
                <p className="text-xs text-gray-600">{data.duration}</p>
            </div>
            <h1 className="text-sm text-gray-900">{data.text}</h1>
        </div>
    );
}

export default Comment;