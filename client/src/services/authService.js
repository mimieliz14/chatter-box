import { data } from "react-router-dom";
import API from "./api";

export const loginUser = (data) => {
    return API.post("/auth/login", data)
}

export const registerUser = (data) => {
    return API.post("/auth/register", data)
}

export const createChannel = (data) => {
    return API.post("/channels", data)
}

export const getPublicChannels = (data) => {
    return API.get("/channels/public", data)
}
export const getMessagesByChannel = (channelId) => {
    return API.get(`/channels/${channelId}/messages`);
};

export const createMessage = (channelId, data) => {
    return API.post(`/channels/${channelId}/messages`, data);
};

export const getChannelDetails = (channelId) => {
    return API.get(`/channels/${channelId}`);
}

export const subscribeChannel = (channelId, data) => {
    return API.post(`/channels/${channelId}/join`,data)
}

export const unsubscribeChannel = (channelId, data) => {
    return API.delete(`/channels/${channelId}/leave`,data)
}