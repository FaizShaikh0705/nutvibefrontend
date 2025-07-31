import axios from "axios";

// const BASE_URL = "http://localhost:5002/api/";
const BASE_URL = "https://api.qirahworld.com/api/";
// const TOKEN =
//   JSON.parse(JSON.parse(localStorage.getItem("persist:root")).user).currentUser
//     .accessToken || "";

const user = typeof window !== "undefined" ? JSON.parse(localStorage.getItem("persist:root"))?.user : null;
const currentUser = user && JSON.parse(user).currentUser;
const TOKEN = currentUser?.accessToken;
export const isTokenSet = TOKEN ? true : false;
// console.log("ashadhadsb------------------");
export const publicRequest = axios.create({
    baseURL: BASE_URL,
});

export const userRequest = axios.create({
    baseURL: BASE_URL,
    headers: { token: `Bearer ${TOKEN}` },
});