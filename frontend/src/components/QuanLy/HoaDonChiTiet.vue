<template>
    <div>
        <div class="row bottomHeader" v-if="!isOpenLapHD">
            <div class="col-md-12">
                <p>Chi Tiết Hóa Đơn</p>
                <p></p>
            </div>
        </div>
        <div class="row container hoadonchitiet">
            <div class="col-md-12">
                <div class="row" style="width:60px"> <img src="../../images/Logo.png"
                        class="rounded float-left img-fluid">
                </div>
                <h4 style="text-align:center"> HÓA ĐƠN </h4>
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
                <div class="row">
                    <table class="bangCTDH table-bordered">
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
                                <td>{{ row.SP_TenSanPham }} </td>
                                <td>{{ row.CTDH_SoLuong }}</td>
                                <td>{{ row.CTDH_Gia }}</td>
                                <td>{{ row.CTDH_SoLuong * row.CTDH_Gia }}</td>
                            </tr>
                        </tbody>
                    </table>
                    <div class="col-md-12" style="text-align: right; margin-bottom: 15px;">
                        <h6 style="text-align: right; margin-right: 100px;">Thành tiền:
                            {{ hoadon.HD_TongTien }}
                        </h6>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>

export default {
    name: `HoaDonChiTiet`,
    props: ["khachhang", "nhanvien", "hoadon", "donhang", "chitietdonhang"],

}

</script>


<style>
@import "../../assets/QLDonHangStyle.css"
</style>