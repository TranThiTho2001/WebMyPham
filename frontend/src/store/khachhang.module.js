import http from "../common/http";
import { handle } from "../common/promise";

const state = {
    user: {
        KH_Ma: String,
        KH_Ten: String,
        KH_SDT: String,
        KH_NgaySinh: Date,
        KH_DiaChi: String,
        KH_MatKHau: String
    },
    status: {
        loggedIn: Boolean
    }
};
const mutations = {
    initAuthState(state) {
        state.user = JSON.parse(localStorage.getItem("user"));
        state.status.loggedIn = !!state.user;
    },
    login(state, user) {
        state.status.loggedIn = true;
        state.user = user;
        localStorage.setItem("user", JSON.stringify(user));
    },
    logout(state) {
        state.status.loggedIn = false;
        state.user = null;
        localStorage.removeItem("user");
    },
    clearLoginStatus(state) {
        state.status.loggedIn = false;
    },
};
const actions = {
    async login({ commit }, user) {
        let [error, response] = await handle(
            http.post("/auth/signin", {
                username: user.KH_Ten,
                password: user.KH_MatKHau,
            })
        );
        if (error || !response.data.accessToken) {
            commit("logout");
            if (!error) {
                error = new Error("Whoops, no access token found!");
            }
            throw error;
        }
        commit("login", response.data);
        return response.data;
    },
    async register({ commit }, user) {
        const [error, response] = await handle(
            http.post("/auth/signup", {
                username: user.KH_Ten,
                phone: user.KH_SDT,
                password: user.KH_MatKHau,
            })
        );
        commit("clearLoginStatus");
        if (error) {
            throw error;
        }
        return response.data;
    }
};
const getters = {
    userLoggedIn(state) {
        return state.status.loggedIn;
    },
    loggedInUser(state) {
        return state.user;
    }
};
export const khachhang = {
    state,
    mutations,
    actions,
    getters
};
