import axios from "axios";

const TOKEN = "cfiga3pr01qjvrn4s37gcfiga3pr01qjvrn4s380"

export default axios.create({
 baseURL:"https://finnhub.io/api/v1",
 params: {
    token: TOKEN
 }
})
