import axios from "axios";

export const APIInstance=axios.create({
    baseURL:"http://localhost:5300",
    withCredentials:true,
})  