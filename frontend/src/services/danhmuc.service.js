import http from "../common/http";

class DanhMucService {
    getAll() { return http.get("/danhmuc"); }
    get(DM_Ma) { return http.get(`/danhmuc/${DM_Ma}`); }
    create(data) { return http.post("/danhmuc", data); }
    update(id, data) { return http.put(`danhmuc/${id}`, data); }
    delete(DM_Ma) { return http.delete(`/danhmuc/${DM_Ma}`); }
    //deleteAll() { return http.delete("/sanpham"); }
    findByName(name) { return http.get(`/danhmuc?name=${name}`); }
}

export default new DanhMucService();