import axios from "axios";
import {useEffect, useState} from "react";


const useInfiniteScroll = (pageNo, section, sortBy, refresh, loggedIn) => {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [posts, setPosts] = useState([]);
    const [hasMore, setHasMore] = useState(false);

    // useEffect(()=> {
    //
    // }, [loggedIn])

    useEffect(() => {
        setPosts([]);
    }, [section, sortBy, refresh])

    useEffect(() => {
        setLoading(true);
        setError(false);

        console.log(`Page:${pageNo}, sortBy:${sortBy}`)

        axios({
            method: 'GET',
            url: `/j/${section}`,
            headers: {Authorization: `Bearer ${getToken()}`},
            params: {pageNo, sortBy}
        }).then(res => {
            setPosts(prevPosts => {
                return [...prevPosts, ...res.data.posts]
            })
            console.log(res.data);
            setHasMore(res.data.hasNext);
            setLoading(false);
        }).catch(e => {
            setError(true);
        });
    }, [pageNo, section, sortBy, refresh]);


    const getToken = () => {
        if (localStorage.getItem("token") !== null) {
            return JSON.parse(localStorage.getItem("token"));
        } else {
            return "";
        }
    }
    return {loading, error, posts, hasMore};
}

export default useInfiniteScroll;