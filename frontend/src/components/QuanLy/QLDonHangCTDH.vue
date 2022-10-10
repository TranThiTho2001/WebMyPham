
<template>
        <div class="chitietDonHang container" style="text-align:center">
        <div class="row"></div>
            <div clas="col-md-12"><h4 style="text-align:center">Chi Tiết Đơn Hàng #{{activeDonHang.DH_Ma}}</h4>
        </div>
        <div class="row">
            <table class="bangTT">
                <tr>
                    <td>Ngày đặt: {{activeDonHang.DH_NgayDat}}</td>
                    <td>Trạng thái: {{activeDonHang.DH_TrangThai}}</td>
                </tr>
                <tr>
                    <td>Khách hàng: {{tenkhachhang}}</td>
                    <td>Địa chỉ: {{activeDonHang.DH_DiaChiGiaoHang}} qjfdwhqfewfnkltjernvj nfekjr</td>                   
                </tr>
                <tr>
                    <td>Nhân viên: {{activeDonHang.NV_Ma}}</td>
                    <td>Số HD: {{activeDonHang.HD_SoHD}}</td>
                </tr>
            </table>
        </div>
        <div class=row>
            <table class="bangCTDH">
                <thead>
                    <tr style="width:100%">
                        <th>STT</th>
                        <!-- <th v-for="(col,i) in columns" :key="i">{{col}}</th> -->
                        <th>Mã sản phẩm</th>
                        <th>Tên sản phẩm</th>
                        <th>Số lượng</th>
                        <th>Giá</th>
                        <th>Thành tiền</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(row,i) in chitietdonhang" :key="i"
                        style="width:100%">
                        <td>{{i}}</td>
                        <td>{{row.SP_Ma}}</td>
                        <td>Ten sp</td>
                        <td>{{row.CTDH_SoLuong}}</td>
                        <td>{{row.CTDH_Gia}}</td>
                        <td>{{row.CTDH_SoLuong * row.CTDH_Gia}}</td>
                    </tr>
                </tbody>
            </table>
            <div class="col-md-12" style="text-align: right"><h6 style="text-align: right; margin-right: 100px;">Thành tiền: {{activeDonHang.DH_TongTien}}</h6></div>
        </div>
    </div>
</template>
<script>
export default{
    name: `QLDonHangCTDH`,
    props:["chitietdonhang","activeDonHang","tenkhachhang"],

}
</script>

<style>
.chitietDonHang {
    width: 98%;
    background-color: #FFFFFF;
    border-radius: 15px;
    border-color: #BABABA;
}
.chitietDonHang .bangTT{
    background-color: #FFFFFF;
}
.chitietDonHang .bangCTDH{
    border-radius: 15px;
    border-bottom: 1px solid #BABABA;
}
</style>