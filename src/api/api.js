import axios from "axios";

export const getPosts = async () => {
    const response = await axios.get(
        `https://api.stackexchange.com/2.2/search?intitle=react&site=stackoverflow`
    )
    return response;
};