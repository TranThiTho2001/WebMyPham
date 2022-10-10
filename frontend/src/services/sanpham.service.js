import http from "../common/http";

class SanPhamService {
    getAll() { return http.get("/sanpham"); }
    get(SP_Ma) { return http.get(`/sanpham/${SP_Ma}`); }
    create(data) { return http.post("/sanpham", data); }
    update(id, data) { return http.put(`/sanpham/${id}`, data); }
    delete(id) { return http.delete(`/sanpham/${id}`); }
    //deleteAll() { return http.delete("/sanpham"); }
    findByName(name) { return http.get(`/sanpham?name=${name}`); }
}

export default new SanPhamService();