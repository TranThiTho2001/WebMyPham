<template v-if="isOpen">
    <div class="chitietDonHang container" style="text-align:center">
        <div class="row" style="margin-top:15px"></div>
        <div clas="col-md-12">
            <h4 style="text-align:center">Chi Tiết Đơn Hàng #{{activeDonHang.DH_Ma}}</h4>
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
                        <td>Ten sp</td>
                        <td>{{row.CTDH_SoLuong}}</td>
                        <td>{{row.CTDH_Gia}}</td>
                        <td>{{row.CTDH_SoLuong * row.CTDH_Gia}}</td>
                    </tr>
                </tbody>
            </table>
            <div class="col-md-12" style="text-align: right; margin-bottom: 15px;">
                <h6 style="text-align: right; margin-right: 100px;">Thành tiền: {{activeDonHang.DH_TongTien}}</h6>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    name: `QLDonHangCTDH`,
    props: ["chitietdonhang", "activeDonHang", "khachhang", "nhanvien"],
}
</script>

<style>
.chitietDonHang {
    width: 98%;
    background-color: #FFFFFF;
    border-radius: 15px;
    border-color: #BABABA;
    position: absolute;
    background-color: #F9F9F9;
    top: calc(34%);
    left: 50%;
    transform: translateX(-50%);
    border-radius: 16px;
    border: 1px solid #515151;
    display: block;
    color: #515151;
    margin-bottom: 20px;
}

.chitietDonHang .bangTT {
    background-color: #FFFFFF;
}

.chitietDonHang .bangCTDH {
    border-radius: 15px;
    border-bottom: 1px solid #BABABA;
}
</style>