<template>
    <!-- Cot ben trai -->
    <div class="navigationBar container-fuild">
        <div class="logo">
            <img src="../../images/LogoQL.png" class="img-fluid"
                style="border-top-left-radius: 30px; border-top-right-radius: 30px;">
        </div>
        <div class="dsChucNang">
            <button class="mt-3 ml-2 btn btn-sm btn-outline-secondary btnThongKe" @click="goToQLThongKe"><span
                    class="fa fa-line-chart " aria-hidden="true"> &nbsp;</span> Thống Kê</button>
            <button class="mt-3 ml-2 btn btn-sm btn-outline-secondary btnDonHang" @click="goToQLDonHang"><span
                    class="fa fa-receipt" aria-hidden="true"> &nbsp;&nbsp;</span> Đơn Hàng</button>
            <button class="mt-3 ml-2 btn btn-sm btn-outline-secondary btnSanPham" @click="goToQLSanPham"><span
                    class="fa fa-spray-can" aria-hidden="true"> &nbsp;</span> Sản Phẩm</button>
            <button class="mt-3 ml-2 btn btn-sm btn-outline-secondary btnKhuyenMai" @click="goToQLKhuyenMai"><span
                    class="fa fa-donate" aria-hidden="true">&nbsp;&nbsp;</span> Khuyến Mãi</button>
            <button class="mt-3 ml-2 btn btn-sm btn-outline-secondary btnNhanVien" @click="goToQLNhanVien"><span class="fa fa-users"
                    aria-hidden="true"> &nbsp;</span>Nhân Viên</button>
            <button class="mt-3 ml-2 btn btn-sm btn-outline-secondary btnThuongHieu" @click="goToQLThuongHieu"><span class="fa fa-tag"
                    aria-hidden="true"> &nbsp;</span> Thương Hiệu</button>
            <button class="mt-3 ml-2 btn btn-sm btn-outline-secondary btnDanhMuc" @click="goToQLDanhMuc"><span class="fa fa-shapes"
                    aria-hidden="true"> &nbsp;</span> Danh Mục</button>
        </div>
        <div class="moreInformation">
            <button class="mt-3 ml-2 btn btn-sm btn-outline-secondary btnCaiDat" @click="goToCaiDat" ><span class="fa fa-cog"
                    aria-hidden="true"> &nbsp;</span> Cài Đặt</button>
            <button class="mt-3 ml-2 btn btn-sm btn-outline-secondary btnThongTin" @click="goToThongTin"
                style="margin-bottom: 10px; margin-right:10px"><span class="fa fa-info-circle" aria-hidden="true">
                    &nbsp;</span> Thông Tin</button>
        </div>
        <!-- Cot ben phai -->
    </div>
</template>
<script>
export default {
    methods: {
        goToQLDanhMuc() {
            this.$router.push("/QLDanhMuc");
        },
        goToQLSanPham() {
            this.$router.push("/QLSanPham");
        },
        goToQLThongKe() {
            this.$router.push("/QLThongKe");
        },
        goToQLDonHang() {
            this.$router.push("/QLDonHang");
        },
        goToQLKhuyenMai() {
            this.$router.push("/QLKhuyenMai");
        },
        goToQLThuongHieu() {
            this.$router.push("/QLThuongHieu");
        },
        goToQLNhanVien() {
            this.$router.push("/QLNhanVien");
        },
    },
};
</script>

<style>
.navigationBar {
    background-color: #515151;
    height: 100%;
    font-size: 18px;
    display: inline-block;
    border-radius: 30px;
    margin-left: 0px;
}

.dsChucNang {
    margin-top: 20px;
    display: inline-block;
    width: 100%;
    padding-right: 0px;
    padding-left: 0px;
}

.moreInformation {
    /* margin-top: 100px; */
    vertical-align: bottom;
}

.dsChucNang .btn-outline-secondary,
.moreInformation .btn-outline-secondary {
    font-size: 16px;
    text-align: left;
    width: 90%;
    display: block;
    background-color: #515151;
    color: #FFFFFF;
    border: none;

}

.dsChucNang .btn-outline-secondary:hover,
.moreInformation .btn-outline-secondary:hover {
    display: block;
    width: 90%;
    font-size: 16px;
    background-color: #FFFFFF;
    color: #515151;
    border: none;
}

.dsChucNang .fas,
.dsChucNang .fa,
.moreInformation .fas,
.moreInformation .fa {
    font-size: 20px;
}
</style>