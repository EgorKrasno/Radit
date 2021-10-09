import {useEffect, useState} from "react";
import {getLeaderboard} from "../service/service";
import toast from "react-hot-toast";
import {Link} from "react-router-dom";
import { GiChicken, GiChiliPepper} from "react-icons/all";

const Leaderboard = ({user}) => {
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState();


    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                const response = await getLeaderboard();
                setData(response.data);
            } catch (ex) {
                toast.error("Failed to get leaderboard");
            }
            setLoading(false);
        }
        fetchData();
    }, []);

    const createLeaderboard = () => {
        let elements = [];

        for (let i = 0; i < 5; i++) {
            if (data[i] != null) {
                elements.push(
                    <div key={data[i].username} className="flex justify-between px-8 py-3">
                        <div className="flex items-center">
                            <p className="dark:text-gray-100 text-gray-900 pr-3">{i + 1}</p>
                            <Link to={`/user/${data[i].username}`}
                                  className="flex text-sm dark:text-gray-100 text-gray-900 capitalize items-center">
                        <span
                            className="w-7 h-7 bg-green-500 shadow-md rounded-full relative ml-0.5 mr-2">
                            <div className="absolute top-3.5 left-3.5" style={{transform: 'translate(-50%, -50%)',}}>
                                <GiChicken className="text-white" size={22}/>
                            </div>
                        </span>
                                <p>{data[i].username}</p>
                            </Link>
                        </div>
                        <div className="self-end flex items-center justify-center">
                            <p className="dark:text-gray-100  text-gray-900 text-lg font-bold">{data[i].score}</p>
                            <GiChiliPepper className="text-red-500 ml-0.5" size={16}/>
                        </div>
                    </div>
                )
            } else {
                break;
            }
        }
        return elements;
    }

    return (
        <div className="h-80 w-full dark:bg-gray-800 bg-white rounded-xl shadow-md">
            <h1 className="mx-8 pt-3 text-2xl font-bold dark:text-gray-100  text-gray-900">Top Spicy Bois</h1>
            <div className="divide-y dark:divide-gray-700 divide-gray-200">
                {!loading && createLeaderboard()}
            </div>
        </div>
    );
}

export default Leaderboard;