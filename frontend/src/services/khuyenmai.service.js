import http from "../common/http";

class KhuyenMaiService {
    getAll() { return http.get("/khuyenmai"); }
    get(id) { return http.get(`/khuyenmai/${id}`); }
    create(data) { return http.post("/khuyenmai", data); }
    update(id, data) { return http.put(`khuyenmai/${id}`, data); }
    delete(id) { return http.delete(`/khuyenmai/${id}`); }
    //deleteAll() { return http.delete("/sanpham"); }
    findByName(name) { return http.get(`/khuyenmai?name=${name}`); }
}

export default new KhuyenMaiService();