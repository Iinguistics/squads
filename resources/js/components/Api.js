import axios from "axios";

//const jwt = localStorage.getItem("jwt");

export default axios.create({
    baseURL: process.env.MIX_API_PATH,
    //headers: { Authorization: `Bearer ${jwt}` },
});
