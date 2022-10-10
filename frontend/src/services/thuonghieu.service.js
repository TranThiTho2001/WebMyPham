import http from "../common/http";

class ThuongHieuService {
    getAll() { return http.get("/thuonghieu"); }
    get(id) { return http.get(`/thuonghieu/${id}`); }
    create(data) { return http.post("/thuonghieu", data); }
    update(id, data) { return http.put(`thuonghieu/${id}`, data); }
    delete(id) { return http.delete(`/thuonghieu/${id}`); }
    //deleteAll() { return http.delete("/sanpham"); }
    findByName(name) { return http.get(`/thuonghieu?name=${name}`); }
}

export default new ThuongHieuService();