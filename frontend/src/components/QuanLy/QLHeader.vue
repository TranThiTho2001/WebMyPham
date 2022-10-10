<template>
    <div class="container">
                <div class="row rightConent">
                    <div class="col-md-9 leftHeader">
                        <p style="margin-top:3px">Xin chào, {{nhanvien.NV_Ten}}</p>
                    </div>
                    <div class="col-md-3 rightHeader nav-item dropdown">
                        <a class="nav-link " href="#" id="navbardrop" >
                            <div class="row">
                                <div class=" col-md-3"> <span class="fa fa-user-tie"></span></div>
                                <div class="col-md-7">
                                    <span style="color:black; font-size: 18px;">{{nhanvien.NV_Ten}}</span><br>
                                    <span style="color:#7E7E7E">{{nhanvien.NV_VaiTro}}</span>
                                </div>
                                <div class=" col-md-2 dropdown-toggle">
                                    <div class="dropdown-menu">
                                        <a class="dropdown-item" href="#">Đăng xuất</a>
                                        <a class="dropdown-item" href="#">Đổi mật khẩu</a>
                                    </div>
                                </div>
                            </div>
                        </a>
                    </div>
                </div>
            </div>
</template>
<script>
export default {
    name: `QLHeader`,
    // props: ["nhanvien"],
    
    data() {
        return {
            nhanvien: {
                NV_Ma: 'SNV000001',
                NV_Ten: 'Tran van a',
                NV_VaiTro: 'Quan Ly',
            }
            ,
        }
    }

};
</script>

<style>
    .rightContent{
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
.dropdown-toggle {
    margin-top: 10px;
    color: black;
    font-size: 22px;
    background-color: #FFFFFF;
    left: 5%;
    transform: translateX(-70%);
}

 .nav-link .dropdown-toggle .dropdown-menu {
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

.nav-item .nav-link:hover  .dropdown-menu {
    position: absolute;
    background-color: #FFFFFF;
    top: calc(50%);
    left: 10%;
    transform: translateX(-70%);
    width: max-content;
    border-radius: 0px 0px 10px 10px;
    display: block;
    text-align: left;
}
</style>