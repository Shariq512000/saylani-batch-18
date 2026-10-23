import axios from "axios";

// ::
// ["http", "//localhost", "3000/login"]
// ["https", "postgresql-ecom"]
// https://postgresql-ecom.vercel.app/api/v1/categories
const api = axios.create({
    baseURL: window.location.href.split(":")[0] == "http" ? "http://localhost:5000/api/v1" : "/api/v1",
    withCredentials: true,
});

export default api;


// const skills = "HTML,CSS,JAVASCRIPT,REACT"
// const skillsArray = skills.split(",");
// ["HTML", "CSS", "JAVASCRIPT", "REACT"]