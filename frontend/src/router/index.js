import { createWebHistory, createRouter } from "vue-router";
const routes = [
    {
        path: "/",
        alias: "/homepage",
        name: "HomePage",
        component: () => import("../views/HomePage.vue"),
    },
    // Quan ly tai khoan
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

    // Quan ly san pham
    {
        path: "/QLSanPham/:id",
        name: "QLsanpham",
        component: () =>
            import ("../views/QuanLy/QLSanPham/QLSanPham.vue"),
    },


    {
        path: "/QLSanPhamThem/:id",
        name: "QLSanPhamThem",
        component: () =>
            import ("../views/QuanLy/QLSanPham/QLSanPhamThem.vue"),
    },

     // Quan ly thuong hieu
    {
        path: "/QLThuongHieu/:id",
        name: "QLthuonghieu",
        component: () =>
            import ("../views/QuanLy/QLThuongHieu/QLThuongHieu.vue"),
    },

     // Quan ly danh muc
    {
        path: "/QLDanhMucSanPham/:id",
        name: "QLDanhMucSanPham",
        component: () =>
            import ("../views/QuanLy/QLDanhMuc/QLDanhMucSanPham.vue"),
    },

    {
        path: "/TaoDanhMuc/:id",
        name: "TaoDanhMuc",
        component: () =>
            import ("../views/QuanLy/QLDanhMuc/QLTaoDanhMuc.vue"),
    },

    {
        path: "/SuaDanhMuc/:id/:user",
        name: "SuaDanhMuc",
        component: () =>
            import ("../views/QuanLy/QLDanhMuc/QLDanhMucSua.vue"),
    },


    // Quan ly don hang
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

    // Quan ly nhan vien
    {
        path: '/QLNhanVien/:id',
        name: 'QLNhanVien',        
        component: () =>
            import ("../views/QuanLy/QLNhanVien/QLNhanVien.vue"),
    },   
    {
        path: '/ThemNhanVien/:id',
        name: 'ThemNhanVien',        
        component: () =>
            import ("../views/QuanLy/QLNhanVien/QLThemNhanVien.vue"),
    }, 

    {
        path: '/SuaNhanVien/:id/:user',
        name: 'SuaNhanVien',        
        component: () =>
            import ("../views/QuanLy/QLNhanVien/QLSuaNhanVien.vue"),
    },  

//-------------------------------------------------KHACHHANG-----------------------------------
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