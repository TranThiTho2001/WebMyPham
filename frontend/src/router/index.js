import { createWebHistory, createRouter } from "vue-router";
const routes = [
    {
        path: "/",
        alias: "/homepage",
        name: "HomePage",
        component: () => import("../views/HomePage.vue"),
    },

    {
        path: "/QLDangNhap",
        name: "QLDangNhap",
        component: () =>
            import ("../views/QuanLy/QLTaiKhoan/DangNhap.vue"),
    },

    {
        path: "/QLDoiMatKhau/:id",
        name: "QLDoiMatKhau",
        component: () =>
            import ("../views/QuanLy/QLTaiKhoan/DoiMatKhau.vue"),
    },

    {
        path: "/QLSanPham/:id",
        name: "QLsanpham",
        component: () =>
            import ("../views/QuanLy/QLSanPham/QLSanPham.vue"),
    },

    {
        path: "/QLDanhMucSanPham/:id",
        name: "QLDanhMucSanPham",
        component: () =>
            import ("../views/QuanLy/QLDanhMuc/QLDanhMucSanPham.vue"),
    },

    {
        path: "/QLThuongHieu/:id",
        name: "QLthuonghieu",
        component: () =>
            import ("../views/QuanLy/QLThuongHieu/QLThuongHieu.vue"),
    },

    {
        path: "/TaoDanhMuc/:id",
        name: "TaoDanhMuc",
        component: () =>
            import ("../views/QuanLy/QLDanhMuc/QLTaoDanhMuc.vue"),
    },

    {
        path: "/SuaDanhMuc/:id",
        name: "SuaDanhMuc",
        component: () =>
            import ("../views/QuanLy/QLDanhMuc/QLDanhMucSua.vue"),
    },

    {
        path: "/QLSanPhamThem/:id",
        name: "QLSanPhamThem",
        component: () =>
            import ("../views/QuanLy/QLSanPham/QLSanPhamThem.vue"),
    },

    {
        path: "/QLDonHang/:id",
        name: "QLDonHang",
        component: () =>
            import ("../views/QuanLy/QLDonHang/QLDonHang.vue"),
    },

    {
        path: '/QLDonHangLapHD/:id/:user',
        name: 'QLDonHangLapHD',        
        component: () =>
            import ("../views/QuanLy/QLDonHang/QLDonHangLapHD.vue"),
    },    

    {
        path: '/KHDangNhap',
        name: 'KHDangNhap',        
        component: () =>
            import ("../views/KhachHang/QLTaiKhoan/DangNhap.vue"),
    },

    {
        path: '/KHDangKy',
        name: 'KHDangKy',        
        component: () =>
            import ("../views/KhachHang/QLTaiKhoan/DangKy.vue"),
    },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;