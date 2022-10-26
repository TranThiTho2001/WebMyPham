<template>
    <div class="container">
        <div class="row rightConent">
            <div class="col-md-9 leftHeader">
                <p style="margin-top:3px">Xin chào, {{localNhanVien.NV_Ten}}</p>
            </div>
            <div class="col-md-3 rightHeader nav-item dropdown">
                <a class="nav-link" href="#" id="navbardrop">
                    <div class="row">
                        <div class=" col-md-3"> <span class="fa fa-user-tie"></span></div>
                        <div class="col-md-6">
                            <span style="color:black; font-size: 18px;">{{localNhanVien.NV_Ten}}</span><br>
                            <span style="color:#7E7E7E">{{vaiTro}}</span>
                        </div>
                        <div class="col-md-1 fas fa-caret-down" style="margin-top:5%; font-size:30px; color:#515151"></div>
                        <div class="dropdown-menu right">
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

        async goToDoiMatKHau(){
            this.$router.push({name: 'QLDoiMatKhau', params: { id: this.localNhanVien.NV_Ma }})
        }
    },
    mounted() {
        this.findTTNV();
    }

};
</script>

<style>
.rightContent {
    margin-right: 10px;
    background-color: blueviolet;
}

.leftHeader {
    margin-top: 10px;
    font-size: 30px;
}

.rightHeader {
    margin-top: 10px;
    width: 100%;
    background-color: #FFFFFF;
    border-radius: 30px;
}

.fa-user-tie {
    font-size: 38px;
    color: black;
}

.dropdown-menu {
    margin-top: 10px;
    color: black;
    font-size: 22px;
    background-color: #FFFFFF;
    left: 5%;
    transform: translateX(-70%);
}

.nav-link .dropdown-menu {
    position: absolute;
    background-color: #FFFFFF;
    top: calc(100%);
    left: 70%;
    transform: translateX(-70%);
    width: max-content;
    border-radius: 0px 0px 10px 10px;
    display: none;
    text-align: left;
}

.nav-item .nav-link:hover .dropdown-menu {
    position: absolute;
    background-color: #FFFFFF;
    top: calc(80%);
    left: 70%;
    transform: translateX(-70%);
    width: max-content;
    border-radius: 0px 0px 10px 10px;
    display: block;
    text-align: left;
}
</style>