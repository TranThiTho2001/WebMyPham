<template>
     <div class="container dondathang">
          <div class="row title">
               <h4 class="col-md-12">ĐƠN HÀNG CỦA BẠN</h4>
          </div>
          <div class="dsDonDatHang">
               <div class="row titleRow" style="width:100%">
                    <div class="col-md-3 title">Mã đơn hàng</div>
                    <div class="col-md-2 title" >Ngày đặt</div>
                    <div class="col-md-2 title" >Số lượng</div>
                    <div class="col-md-3 title" >Số tiền</div>
                    <div class="col-md-2 title">Trạng thái</div>
               </div>
               <div v-for="(donhang, i) in dsDonHang" :key="i" class="row thongtinDonHang" @click="isOpenCTDH(donhang)">
                    <div class="col-md-3 column">
                         <p class="text"> {{ donhang.id }} </p>
                    </div>              
               <div class="col-md-2 column">
                    <p class="text"> {{ donhang.DH_Ngay }}</p>
               </div>
               <div class="col-md-2 column">
                    <p class="text"> {{ donhang.DH_TongSoLuong}}</p>
               </div>
               <div class="col-md-3 column">
                    <p class="text">  {{ formatMoney(donhang.DH_TongTien) }}đ </p>
               </div>
               <div class="col-md-2 column">
                    <button class="btn btnTrangThai" v-if="donhang.DH_TrangThai === `Mới`" style="background-color:#00FFFF">{{donhang.DH_TrangThai}}</button>
                    <button class="btn btnTrangThai" v-if="donhang.DH_TrangThai === `Đã xác nhận`" style="background-color:#DCD409">{{donhang.DH_TrangThai}}</button>
                    <button class="btn btnTrangThai" v-if="donhang.DH_TrangThai === `Đã vận chuyển`" style="background-color:#FF9999">{{donhang.DH_TrangThai}}</button>
                    <button class="btn btnTrangThai" v-if="donhang.DH_TrangThai === `Đã nhận hàng`" style="background-color:#00BA13">{{donhang.DH_TrangThai}}</button>
                    <button class="btn btnTrangThai" v-if="donhang.DH_TrangThai === `Đã hủy`" style="background-color:#D30000">{{donhang.DH_TrangThai}}</button>

               </div>
          </div> 
          </div>
     </div>
</template>

<script>
import DonHangService from '../../../services/donhang.service';
import moment from'moment';
import { mapGetters, mapMutations } from "vuex";
export default {
     name: `DonHang`,

     data() {
          return {
               dsDonHang: [],
          }
     },
     computed: {
          ...mapGetters({
               currentUser: "loggedInKhachHang",
          }),
     },
     methods: {
          ...mapMutations([
               "initCustomerState"
          ]),

          async retrieveDonHang() {
               let DH_TrangThai = this.currentUser.KH_Ma;
               console.log(this.currentUser)
               const [error, response] = await this.handle(
                    DonHangService.findByStatus(DH_TrangThai)
               );
               if (error) {
                    console.log(error);
               } else {
                    this.dsDonHang = response.data;
                    if(this.dsDonHang.length>0){
                         this.dsDonHang.forEach(element => {
                              element.DH_Ngay = moment(String(element.DH_NgayDat)).format("MM/DD/YYYY");
                         });
                    }
               }
          },

          formatMoney(data) {
               let val = (data / 1).toFixed(0).replace(".", ",");
               return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
          },

     },

     mounted(){
          this.initCustomerState();
          this.retrieveDonHang();
     }
}
</script>

<style>
@import '../../../assets/QLDonDatHangStyle.css'
</style>