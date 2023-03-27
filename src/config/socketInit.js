import { RefreshListRefillSuccess, RefreshListWithdrawSuccess } from "@/redux/slice/admin";
import { UpdateRefillSuccess, UpdateWithdrawSuccess } from "@/redux/slice/user";

import { AdminPaymentApi } from "data/api/admin/payments";
import { baseURL } from "data/api/axiosClient/rootApi";
import { UserAuthApi } from "data/api/users/auth";
import { UserPaymentsApi } from "data/api/users/payments";
import React from "react";
import socketClient from "socket.io-client";

export const socket = socketClient.connect(baseURL, {
    path: "/socketio",
});
export const SockeContext = React.createContext();

export const handleEvents = (socket, User, dispatch, accessToken) => {

    socket.on("re_events", async (data) => {
        if (data.to === User?.userName) {
            if (data.action === "Create_refill") {
                //Admin cập nhật refills
                await AdminPaymentApi.Refills.GetAll(accessToken, dispatch, RefreshListRefillSuccess);
            } else if (data.action === "Success_Refills") {
                // user cập nhật refills
                await UserPaymentsApi.Refills.GetAll(accessToken, dispatch, User?.id, UpdateRefillSuccess);
                //User Cập nhật
                await UserAuthApi.RefreshUser(dispatch, accessToken, User?.id);

            }
            else if (data.action === "Create_withdraw") {
                //Admin cập nhật withdraws
                await AdminPaymentApi.Withdraws.GetAll(accessToken, dispatch, RefreshListWithdrawSuccess, User?.id);
            } else if (data.action === "Success_Withdraw") {
                // user cập nhật withdraws
                await UserPaymentsApi.Withdraws.GettAll(accessToken, dispatch, User?.id, UpdateWithdrawSuccess);
            }
        }
    });
}