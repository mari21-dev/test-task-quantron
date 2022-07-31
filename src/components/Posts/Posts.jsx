import React, { useEffect, useState } from "react";
import { getPosts } from "../../api/api";
import _ from "lodash";
import { Post } from "./components/Post";
import Arrow from "../../assets/images/arrow.png";

export const Posts = () => {
    const [posts, setPosts] = useState([]); // массив постов
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [sortStatus, setSortStatus] = useState(true);
    const [rotateArrow, setRotateArrow] = useState(false);


    useEffect(() => {
        // получаем список постов и сразу фильтруем их
        const getData = async () => {
            setLoading(true);
            try {
                const response = await getPosts();
                const filteredPosts = _.filter(response.data && response.data.items, (item) => {
                    if (item.is_answered === true && item.owner.reputation >= 50) {
                        return item;
                    }
                });
                setPosts(filteredPosts);
                setError(null);
            } catch (err) {
                setError(err.message);
                setPosts(null);
            } finally {
                setLoading(false);
            }
        };
        getData();
    }, []);


    const handleSort = () => {
        //сортируем массив постов в порядке возрастания и убывания при нажатии на кнопку
        if (sortStatus) {
            const sortedArray = _.orderBy(posts, ["creation_date"], ["asc"]);
            setPosts(sortedArray);
            setRotateArrow(true);
        } else {
            const sortedArray = _.orderBy(posts, ["creation_date"], ["desc"]);
            setPosts(sortedArray);
            setRotateArrow(false);
        }
        setSortStatus(!sortStatus);
    };


    return (
        <div>
            <h1>Posts on stackoverflow</h1>
            {loading && <p>Loading...</p>}

            {error && (
                <div>{`There is a problem fetching the post data - ${error}`}</div>
            )}

            <div className="button__sort">
                <button onClick={handleSort}>Sort
                    <img className={rotateArrow ? "arrow-up" : "arrow-down"} src={Arrow} />
                </button>
            </div>

            <div>
                {posts && posts.map(({ question_id, title, owner, link }) => (
                        <Post key={question_id} title={title} owner={owner} link={link} />
                    )
                )}
            </div>
        </div>
    );
};