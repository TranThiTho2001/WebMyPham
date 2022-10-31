<template>
    <div class="row Header">
        <div class="col-md-9"></div>
        <div class="col-md-3">
            <div class="rightHeader nav-item dropdown">
                <a class="nav-link " href="#" id="navbardrop">
                    <div class="row">
                        <div class=" col-md-2"> <span class="fa fa-user-tie"></span></div>
                        <div class="col-md-7">
                            <span style="color:black; font-size: 18px; margin-left: 5%;">{{
                                    localNhanVien.NV_Ten
                            }}</span><br>
                            <span style="color:#7E7E7E; margin-left: 3px">{{ vaiTro }}</span>
                        </div>
                        <div class="col-md-2 fas fa-caret-down" style="margin-top:5%; font-size:30px; color:#515151">
                        </div>
                        <div class="dropdown-menu right col-md-1">
                            <a class="dropdown-item" href="#" @click="goToQLDangNhap">Đăng xuất</a>
                            <a class="dropdown-item" href="#" @click="goToDoiMatKHau">Đổi mật khẩu</a>
                        </div>
                    </div>
                </a>
            </div>
        </div>
    </div>
</template>

<script>
import NhanVienService from "../../services/nhanvien.service"

export default {
    name: `QLHeader`,
    props: ["maNV"],

    data() {
        return {
            maNhanVien: this.maNV,
            localNhanVien: {},
            vaiTro: ""
        }
    },

    methods: {
        async findTTNV() {
            const [error, response] = await this.handle(
                NhanVienService.getByID(this.maNhanVien)
            );
            if (error) {
                console.log(error);
            } else {
                this.localNhanVien = response.data;
                if (this.localNhanVien.NV_LoaiNV == 1) {
                    this.vaiTro = "Quản Lý";
                }
                else {
                    this.vaiTro = "Nhân Viên";
                }
            }
        },

        async goToQLDangNhap() {
            this.$router.push("/admin");
        },

        async goToDoiMatKHau() {
            this.$router.push({ name: 'QLDoiMatKhau', params: { id: this.localNhanVien.NV_Ma } })
        }
    },
    mounted() {
        this.findTTNV();
    }

};
</script>

<style>
.Header{
    width: 100%;
    position: relative;
}

.Header a{
    font-family: Inter;
    font-size: 18px;
}
.rightHeader {
    position: relative;
    margin-top: 10px;
    width: 90%;
    background-color: #FFFFFF;
    border-radius: 25px;
    margin-left: 12%;
}

.fa-user-tie {
    font-size: 38px;
    color: black;
}

.nav-link .dropdown-menu {
    background-color: #FFFFFF;
    width: max-content;
    border-radius: 0px 0px 10px 10px;
    display: none;
    text-align: left;
}

.nav-item .nav-link:hover .dropdown-menu {
    position: absolute;
    background-color: #FFFFFF;
    top: calc(80%);
    transform: translateX(-70%);
    left: 70%;
    width: max-content;
    border-radius: 0px 0px 10px 10px;
    display: block;
    text-align: left;
}
</style>