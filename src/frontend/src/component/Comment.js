import {useEffect, useState} from "react";
import {getComments} from "../service/service";

const Comment  = ({data}) => {
    return (
        <div className="py-3 flex flex-col">
            <h1 className="text-sm text-gray-500 capitalize">{data.userName}</h1>
            <h1 className="text-sm">{data.text}</h1>
        </div>
    );
}

export default Comment;