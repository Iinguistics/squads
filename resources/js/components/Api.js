import axios from "axios";
import Cookies from "universal-cookie";

const cookies = new Cookies();
const access_token = cookies.get("access_token");

export default axios.create({
    baseURL: process.env.MIX_API_PATH,
    headers: { Authorization: `Bearer ${access_token}` },
});
