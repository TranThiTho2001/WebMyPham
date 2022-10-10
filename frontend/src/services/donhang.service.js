import http from "../common/http";

class DonHangService {
    getAll() { return http.get("/donhang"); }
    get(DH_Ma) { return http.get(`/donhang/${DH_Ma}`); }
    create(data) { return http.post("/donhang", data); }
    update(id, data) { return http.put(`donhang/${id}`, data); }
    delete(DH_Ma) { return http.delete(`/donhang/${DH_Ma}`); }
    //deleteAll() { return http.delete("/sanpham"); }
    findByStatus(DH_TrangThai) { return http.get(`/donhang?name=${DH_TrangThai}`); }
}

export default new DonHangService();