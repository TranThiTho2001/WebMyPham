import http from "../common/http";

class ChiTietGioHangService {
    getAll() { return http.get("/chitietgiohang"); }

    create(data) { return http.post("/chitietgionhang", data); }

    // tim kiem cac chi tiet don hang theo ma
    findByMaDH(GH_Ma) { return http.get(`/chitietgiohang?name=${GH_Ma}`); }

    update(id, data) { return http.put(`chitietgiohang/${id}`, data); }
    // delete(DM_Ma) { return http.delete(`/chitietdonhang/${DM_Ma}`); }
    //deleteAll() { return http.delete("/sanpham"); }  
    get(SP_Ma) { return http.get(`/chitietgiohang/${SP_Ma}`); }
}

export default new ChiTietGioHangService();