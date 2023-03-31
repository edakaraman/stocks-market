import axios from "axios";

export default axios.create({
 baseURL:"https://finnhub.io/api/v1",
 params: {
    token: "cgjj81hr01qt0jk13510cgjj81hr01qt0jk1351g"
 }
})
