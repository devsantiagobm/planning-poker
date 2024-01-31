import axiosCreator from "axios";


export const axios = axiosCreator.create({
    baseURL: process.env.NEXT_PUBLIC_SERVER_URL,
    headers: {
        "Content-Type": "application/json"
    }
})
