<template>
    <div>
        <div class="row container-fluid hoadonchitiet">
            <div class="col-md-12">

                <h4 style="text-align:center; margin: 30px 0px 30px 0px;"> CHI TIẾT HÓA ĐƠN </h4>
                <div class="row">
                    <table class="bangTT">
                        <tr>
                            <td>Số HD: {{ hoadon.id }}</td>
                            <td>Ngày lập: {{ hoadon.HD_ThoiGianLap + " " + hoadon.HD_NgayLap }}</td>
                        </tr>
                        <tr>
                            <td>Khách hàng: {{ khachhang.KH_Ten }}</td>
                            <td>Mã DH: {{ hoadon.DH_Ma }}</td>

                        </tr>
                        <tr>
                            <td>SDT: {{ khachhang.KH_SDT }} </td>
                            <td>Nhân viên: {{ nhanvien.NV_Ho + nhanvien.NV_Ten }} </td>
                        </tr>
                        <tr>
                            <td>Địa chỉ giao hàng: {{ donhang.DH_DiaChiGiaoHang }}</td>
                        </tr>
                    </table>
                </div>
                <div class="row"></div>
                <div class="row">
                    <table class="bangCTHD table-bordered">
                        <thead>
                            <tr style="width:100%">
                                <th>STT</th>
                                <th>Tên sản phẩm</th>
                                <th>Số lượng</th>
                                <th>Giá</th>
                                <th>Thành tiền</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="(row, i) in chitietdonhang" :key="i" style="width:100%">
                                <td>{{ i + 1 }}</td>
                                <td>{{ tenSP[i] }} </td>
                                <td>{{ row.CTDH_SoLuong }}</td>
                                <td>{{ row.CTDH_Gia }}</td>
                                <td>{{ row.CTDH_SoLuong * row.CTDH_Gia }}</td>
                            </tr>
                        </tbody>
                    </table>
                    <div class="col-md-12" style="text-align: right; margin-bottom: 15px;">
                        <h6 style="text-align: right; margin-right: 100px; margin-top: 15px;">Thành tiền:
                            {{ hoadon.HD_TongTien }}
                        </h6>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import SanPhamService from '../../services/sanpham.service';

export default {
    name: `HoaDonChiTiet`,
    props: ["khachhang", "nhanvien", "hoadon", "donhang", "chitietdonhang"],
    data() {
        return {
            tenSP:[],
        }
    },

    created() {
        let i = 0;
        this.chitietdonhang.forEach(element => {
            this.findSanPham(element.SP_Ma, i);
            i++;
        });
        console.log(this.tenSP)
    },

    methods: {
        async findSanPham(maSP, index) {
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
@import "../../assets/QLDonHangStyle.css";

.hoadonchitiet .bangTT {
    background-color: #FFFFFF;
}

.hoadonchitiet .bangCTHD {
    border-radius: 15px;
    border-bottom: 1px solid #BABABA;
}
</style>