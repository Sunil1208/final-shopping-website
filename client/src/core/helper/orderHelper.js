import { API } from "../../backend";

export const createOrder = (userId, token,orderData) => {
    return fetch(`${API}/order/create/${userId}`, {
        method: "POST",
        headers : {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({order: orderData})
    })
    .then( response => {
        return response.json()
    })
    .catch( err => console.log(err))
}

export const updateOrderStatus = (userId,orderId,token,setstatus) => {
    return fetch(`${API}/order/${orderId}/status/${userId}`,{
        method: "PUT",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        },
        body:  JSON.stringify({orderId: orderId ,status: setstatus})
    })
    .then(response => {
        return response.json()
    })
    .catch( err => console.log(err))
}