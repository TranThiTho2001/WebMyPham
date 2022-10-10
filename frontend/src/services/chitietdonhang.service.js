import http from "../common/http";

class ChiTietDonHangService {
    getAll() { return http.get("/chitietdonhang"); }
    // get(DM_Ma) { return http.get(`/chitietdonhang/${DM_Ma}`); }
    create(data) { return http.post("/chitietdonhang", data); }
    // update(id, data) { return http.put(`chitietdonhang/${id}`, data); }
    // delete(DM_Ma) { return http.delete(`/chitietdonhang/${DM_Ma}`); }
    //deleteAll() { return http.delete("/sanpham"); }
    findByMaDH(DH_Ma) { return http.get(`/chitietdonhang?name=${DH_Ma}`); }
}

export default new ChiTietDonHangService();