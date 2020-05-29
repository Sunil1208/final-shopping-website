import { API } from "../../backend";

export const createQuery = (queryData) => {
    return fetch(`${API}/query/createQuery`,{
        method: "POST",
        headers: {
            Accept:"application/json",
            "Content-Type": "application/json"
        },
        body: JSON.stringify(queryData)
    })
    .then(response => {
        return response.json()
    })
    .catch( err => console.log(err))
}

export const getAllQueries = () => {
    return fetch(`${API}/query/getQueries`,{
        method: "GET",
    })
    .then(response => {
        return response.json()
    })
    .catch( err => console.log(err))
}