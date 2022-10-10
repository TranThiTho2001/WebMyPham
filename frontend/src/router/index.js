import { createWebHistory, createRouter } from "vue-router";
const routes = [
    {
        path: "/",
        alias: "/homepage",
        name: "HomePage",
        component: () => import("../views/HomePage.vue"),
    },
    {
        path: "/QL",
        name: "QLHomePage",
        component: () =>
            import ("../views/QLHomePage.vue"),
    },
    {
        path: "/QLSanPham",
        name: "QLsanpham",
        component: () =>
            import ("../views/QuanLy/QLSanPham/QLSanPham.vue"),
    },
    {
        path: "/QLDanhMuc",
        name: "QLDanhMucSanPham",
        component: () =>
            import ("../views/QuanLy/QLDanhMuc/QLDanhMucSanPham.vue"),
    },
    {
        path: "/QLThuongHieu",
        name: "QLthuonghieu",
        component: () =>
            import ("../views/QuanLy/QLThuongHieu.vue"),
    },
    {
        path: "/QLKhuyenMai",
        name: "QLkhuyenmai",
        component: () =>
            import ("../views/QuanLy/QLKhuyenMai.vue"),
    },
    {
        path: "/QLNhanVien",
        name: "QLnhanvien",
        component: () =>
            import ("../views/QuanLy/QLNhanVien.vue"),
    },
    {
        path: "/TaoDanhMuc",
        name: "TaoDanhMuc",
        component: () =>
            import ("../views/QuanLy/QLDanhMuc/QLTaoDanhMuc.vue"),
    },
    {
        path: "/SuaDanhMuc",
        name: "SuaDanhMuc",
        component: () =>
            import ("../views/QuanLy/QLDanhMuc/QLDanhMucSua.vue"),
    },
    {
        path: "/QLSanPhamThem",
        name: "QLSanPhamThem",
        component: () =>
            import ("../views/QuanLy/QLSanPham/QLSanPhamThem.vue"),
    },
    {
        path: "/QLDonHang",
        name: "QLDonHang",
        component: () =>
            import ("../views/QuanLy/QLDonHang/QLDonHang.vue"),
    },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;