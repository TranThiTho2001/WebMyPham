<template>
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.3.1/dist/css/bootstrap.min.css"
        integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous">
    <div class="container frameQLDanhMuc">
        <div class="row list">
            <div class="col-md-2 dschucNang">
                <DanhSachChucNang :maNv="localNhanVien"/>
            </div>
            <div class="col-md-10">
                <div class="row topHeader">
                    <QLHeader :maNV="localNhanVien.NV_Ma" />
                </div>
                <div class="row bottomHeader">
                    <div class="col-md-12 font-weight-bold" style="color:#515151; font-size: 25px;">
                        <p>Danh sách danh mục</p>
                    </div>
                </div>
                <div class="row timkiem">
                    <div class="col-md-9 col-sm-1">
                    </div>
                    <div class="col-md-3 col-sm-11">
                        <button class=" btn btn-sm btn-outline-secondary btnXem font-weight-bold"
                            @click="goToQLDanhMuc">
                            <span class="fa fa-list-ol" style="font-size:20px"></span>
                            Xem danh sách
                        </button>
                    </div>

                </div>
                <div class="row frameThem">
                    <div class="col-md-2 col-sm-0"></div>
                    <div class="col-md-8 col-sm-12">
                        <DanhMucFromSua :newdanhmuc="newdanhmuc" @suaDanhMuc-submit="updateDanhMuc" :message1="message1" />
                    </div>
                    <div class="col-md-2 col-sm-0"></div>
                </div>

            </div>
        </div>
    </div>
</template>
<script>
import DanhSachChucNang from '../../../components/QuanLy/DanhSachChucNang.vue';
import QLHeader from '../../../components/QuanLy/QLHeader.vue';
import DanhMucService from '../../../services/danhmuc.service';
import DanhMucFromSua from '../../../components/QuanLy/DanhMucFormSua.vue';
export default {
    name: `QLHomePage`,
    // props: ["nhanvien"],
    components: { DanhSachChucNang, QLHeader, DanhMucFromSua },
    data() {

        return {
            isOpen: false,
            newdanhmuc: {},
            message1: "",
            localNhanVien: {},
        }

    },

    created() {
        this.localNhanVien.NV_Ma = this.$route.params.id;
        
        console.log("1")
    },

    methods: {
        async updateDanhMuc(data){
            this.message1 = "";
            const [error, response] = await this.handle(
                DanhMucService.update(data.DM_Ma, data)
            );
            if (error) {
                console.log(error);
                this.message1 = "Cập nhật không thành công";
            } else {
                console.log(response.data);
                this.message1 = "Cập nhật thành công";
            }
        },

        async findDanhMuc(data) {
            console.log("2")
            const [error, response] = await this.handle(
                DanhMucService.get(data)
            );
            if (error) {
                console.log(error);
            } else {
                this.newdanhmuc.DM_Ma = response.data.DM_Ma;
                this.newdanhmuc.DM_Ten = response.data.DM_Ten;
                console.log(response.data);
            }
        },

        async goToQLDanhMuc() {
            this.$router.push({ name: 'QLDanhMucSanPham', params: { id: this.localNhanVien.NV_Ma }});
        }
    },
    mounted() {
        this.findDanhMuc(this.$route.params.user)
        console.log("5")
    }
};
</script>

<style>
.frameQLDanhMuc .dschucNang .navigationBar .dsChucNang .btnDanhMuc {
    background-color: #FFFFFF;
    color: #515151;
}

.frameQLDanhMuc {
    background-color: #EAEAEA;
    border-radius: 30px;
    width: 100%;
    border-style: solid;
    border-color: #515151;
    position: relative;
}

.frameQLDanhMuc .timkiem .btnXem {
    background-color: #515151;
    border-radius: 15px;
    color: #FFFFFF;
    float: right;
    font-size: 16px;
}


.form-control {
    border-radius: 15px;
    background-color: #F5F4F4;
    border-right: 15px;
}

.frameQLDanhMuc .timkiem .btnTimKiem:hover {
    background-color: #515151;
}

.frameQLDanhMuc .dschucNang {
    background-color: #515151;
    border-radius: 26px;
}

.frameQLDanhMuc .bottomHeader {
    /* margin-bottom: 2px; */
    text-align: center;
    font-size: 20px;
}

.frameQLDanhMuc .topHeader {
    margin-bottom: 2px;
    margin-right: -5px;
}

.frameQLDanhMuc .frameThem {
    background-color: #D9D9D9;
    border-radius: 15px;
    margin: 8px 1px 1px 0px;
}
</style>