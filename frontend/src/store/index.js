import { createStore } from "vuex";
import { khachhang } from "./khachhang.module";
const store = createStore({
    modules: {
        khachhang,
    },
});
export default store;