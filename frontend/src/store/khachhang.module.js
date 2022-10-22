import http from "../common/http";
import { handle } from "../common/promise";

const state = {
   khachhang: {
        KH_Ma: String,
        KH_Ten: String,
        KH_SDT: String,
        KH_MatKhau: String
    },
    status: {
        loggedIn: Boolean
    }
};
const mutations = {
    initCustomerState(state) {
        state.khachhang = JSON.parse(localStorage.getItem("khachhang"));
        state.status.loggedIn = !!state.khachhang;
    },
    login(state, khachhang) {
        state.status.loggedIn = true;
        state.khachhang = khachhang;
        localStorage.setItem("khachhang", JSON.stringify(khachhang));
    },
    logout(state) {
        state.status.loggedIn = false;
        state.khachhang = null;
        localStorage.removeItem("khachhang");
    },
    clearLoginStatus(state) {
        state.status.loggedIn = false;
    },
};
const actions = {
    async login({ commit }, khachhang) {
        let [error, response] = await handle(
            http.post("/khachhang/signin", {
                KH_SDT: khachhang.KH_SDT,
                KH_MatKhau: khachhang.KH_MatKhau,
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
    async register({ commit }, khachhang) {
        const [error, response] = await handle(
            http.post("/khachhang/signup", {
                KH_Ten: khachhang.KH_Ten,
                KH_SDT: khachhang.KH_SDT,
                KH_MatKhau: khachhang.KH_MatKhau,
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
    khachhangLoggedIn(state) {
        return state.status.loggedIn;
    },
    loggedInKhachHang(state) {
        return state.khachhang;
    }
};
export const khachhang = {
    state,
    mutations,
    actions,
    getters
};
