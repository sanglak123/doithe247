export const handleEventsApi = {
    sendHandleUpdate: async (accessToken, axiosJwt, fromUser, toUser, action) => {
        await axiosJwt({
            method: "POST",
            url: "/socketAction",
            headers: {
                token: "Bearner " + accessToken
            },
            data: { fromUser, toUser, action }
        }).then((res) => {
            console.log(res.data)
        }).catch((err) => {
            console.log(err)
        })
    }
}