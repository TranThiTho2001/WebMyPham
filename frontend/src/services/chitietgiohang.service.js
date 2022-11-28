import http from "../common/http";

class ChiTietGioHangService {
    getAll() { return http.get("/chitietgiohang"); }

    create(data) { return http.post("/chitietgionhang", data); }

    // tim kiem cac chi tiet gio hang theo ma
    findByMaGH(GH_Ma) { return http.get(`/chitietgiohang?name=${GH_Ma}`); }

    update(id, data) { return http.put(`chitietgiohang/${id}`, data); }
    delete(SP_Ma) { return http.delete(`/chitietgiohang/${SP_Ma}`); }
    //deleteAll() { return http.delete("/sanpham"); }  
    get(SP_Ma) { return http.get(`/chitietgiohang/${SP_Ma}`); }
}

export default new ChiTietGioHangService();