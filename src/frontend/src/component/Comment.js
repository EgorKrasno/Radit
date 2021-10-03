import {GiBindle, GiCheckedShield, GiChicken, GiCircularSaw, GiQueenCrown} from "react-icons/all";
import {Link} from "react-router-dom";

const Comment = ({data}) => {
    return (
        <div className="py-4 flex flex-col space-y-2">
            <div className="flex space-x-2 items-center">

                <Link to={`/user/${data.userName}`}
                      className="flex text-sm font-bold text-gray-900 capitalize hover:underline items-center">
                    <span
                        className="w-7 h-7 bg-green-500 shadow-md rounded-full relative ml-0.5 mr-2">
                        <div className="absolute top-3.5 left-3.5" style={{transform: 'translate(-50%, -50%)',}}>
                            <GiChicken className="text-white" size={22}/>
                        </div>
                    </span>
                        <p>{data.userName}</p>
                    <GiCheckedShield
                        hidden={data.userName !== "admin"} className="ml-1 mt-0.5 text-red-500"/>
                </Link>
                <p className="text-xs text-gray-600">{data.duration}</p>
            </div>
            <h1 className="text-sm text-gray-900">{data.text}</h1>
        </div>
    );
}

export default Comment;