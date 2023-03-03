import { toast } from "react-toastify";

export const EventsAdminApi = {
    Create: async (accessToken, axiosJwt, dispatch, UpdateEventSuccess, name, discount, timeStart, timeEnd) => {
        await axiosJwt({
            method: "POST",
            url: "/admin/events",
            data: {
                name: name,
                discount: discount,
                timeStart: timeStart,
                timeEnd: timeEnd,
            },
            headers: {
                token: "Bearner " + accessToken
            }
        }).then((res) => {
            dispatch(UpdateEventSuccess(res.data.Events))
        }).catch((err) => {
            if (err.response) {
                toast.error(err.response.data.error);
            } else {
                toast.error(err);
            }
        })
    }
}