import { API } from "../../backend"


export const getUserOrder = (userId, token) => {
    return fetch(`${API}/order/userorder/all/${userId}`, {
        method: "GET",
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
    .then( response => {
        return response.json()
    })
    .catch( err => console.log(err))
}