<template v-if="isOpen">
    <div class="chitietDonHang container-fluid" style="text-align:center">
        <div class="row" style="margin-top:15px"></div>
        <div clas="col-md-12">
            <h4 style="text-align:center">CHI TIẾT HÓA ĐƠN #{{activeDonHang.DH_Ma}}</h4>
        </div>
        <div class="row">
            <table class="bangTT">
                <tr>
                    <td>Ngày đặt: {{activeDonHang.DH_NgayDat}}</td>
                    <td>Trạng thái: {{activeDonHang.DH_TrangThai}}</td>
                </tr>
                <tr>
                    <td>Khách hàng: {{khachhang.KH_Ten}}</td>
                    <td>Nhân viên: {{nhanvien.NV_Ho + nhanvien.NV_Ten}}</td>
                </tr>
                <tr>
                    <td>SDT: {{khachhang.KH_SDT}}</td>
                    <td>Số HD: {{activeDonHang.HD_SoHD}}</td>
                </tr>
                <tr>
                    <td>Địa chỉ: {{activeDonHang.DH_DiaChiGiaoHang}} </td>
                    <td>Ghi chú: {{activeDonHang.DH_GhiChu}}</td>
                </tr>
            </table>
        </div>
        <div class=row>
            <table class="bangCTDH">
                <thead>
                    <tr style="width:100%">
                        <th>STT</th>
                        <th>Mã sản phẩm</th>
                        <th>Tên sản phẩm</th>
                        <th>Số lượng</th>
                        <th>Giá</th>
                        <th>Thành tiền</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(row,i) in chitietdonhang" :key="i" style="width:100%">
                        <td>{{i}}</td>
                        <td>{{row.SP_Ma}}</td>
                        <td>{{tenSP[i]}}</td>
                        <td>{{row.CTDH_SoLuong}}</td>
                        <td>{{row.CTDH_Gia}}</td>
                        <td>{{row.CTDH_SoLuong * row.CTDH_Gia}}</td>
                    </tr>
                </tbody>
            </table>
            <div class="col-md-12">
                <h6 style="text-align: right; margin-right: 100px; margin-top: 15px;">Thành tiền: {{activeDonHang.DH_TongTien}}</h6>
            </div>
        </div>
    </div>
</template>
<script>
    import SanPhamService from '../../services/sanpham.service';
    export default {
        name: `QLDonHangCTDH`,
        props: ["chitietdonhang", "activeDonHang", "khachhang", "nhanvien"],

        data(){
            return{
                tenSP:[],
            }
        },

        created(){
            let i = 0;
            this.chitietdonhang.forEach(element => {
                this.findSanPham(element.SP_Ma, i);
                i++;
            });
            console.log(this.tenSP)
        },
        methods:{
           async findSanPham(maSP,index){
            const [error, response] = await this.handle(
                SanPhamService.getByID(maSP)
            );
            if (error) {
                console.log(error);
            } else {
                this.tenSP[index] = response.data.SP_TenSanPham;
                }
            }
        }

    }


</script>

<style>
.chitietDonHang .dschucNang .navigationBar .dsChucNang .btnDonHang {
    background-color: #FFFFFF;
    color: #515151;
}
.chitietDonHang {
    width: 93.8%;
    background-color: #FFFFFF;
    border-radius: 15px;
    border-color: #BABABA;
    background-color: #F9F9F9;
    top: calc(28%);
    left: 50.1%;
    transform: translateX(-50%);
    border-radius: 16px;
    border: 1px solid #515151;
    display: block;
    color: #515151;
    margin-bottom: 20px;
    position:absolute;
}

.chitietDonHang .bangTT {
    background-color: #FFFFFF;
}

.chitietDonHang .bangCTDH {
    border-radius: 15px;
    border-bottom: 1px solid #BABABA;
}
</style>