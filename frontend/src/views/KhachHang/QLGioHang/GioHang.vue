<template>
     <div class="giohang container-fuild" v-if="!isOpenDatHang">
          <div class="row titleRow" style="width:100%">
               <div class="col-md-5 title">Sản phẩm</div>
               <div class="col-md-2 title" style="text-align:center">Đơn giá</div>
               <div class="col-md-2 title" style="text-align:center">Số lượng</div>
               <div class="col-md-2 title" style="text-align:center">Số tiền</div>
               <div class="col-md-1 title">Thao tác</div>
          </div>
          <div v-for="(ctgh, i) in chitietgiohang" :key="i" class="row thongtinSP">
               <div class="sanpham col-md-5 column">
                    <div class="row">
                         <div class="col-md-1 column">
                              <input class="form-check-input checkbox" type="checkbox" value="" id="flexCheckDefault"
                                   @click="chonTatCa = false, chonSP(ctgh), checkSLSPdaChon(), tinhThanhTien()" />
                         </div>
                         <div class="col-md-3 hinhanh">
                              <img :src="ctgh.SP_HinhAnh" class="img-fluid" alt="">
                         </div>
                         <div class="col-md-8 khungTenSP" style=" position: relative;">
                              <p class="tenSP">{{ ctgh.SP_TenSanPham }}</p>
                         </div>
                    </div>
               </div>
               <div class="col-md-2 column">
                    <p class="text">{{ formatMoney(ctgh.SP_GiaBanRa) }}đ</p>
               </div>
               <div class="col-md-2 column">
                    <button v-if="ctgh.CTGH_SoLuong > 1" class="btn btngiam" @click="giamSL(ctgh)"><span
                              class="fas fa-minus"></span></button>
                    <button v-if="ctgh.CTGH_SoLuong == 1" class="btn btngiam"><span
                              class="fas fa-minus"></span></button>
                    <p class="text soluong">{{ ctgh.CTGH_SoLuong }}</p>
                    <button class="btn btntang" @click="tangSL(ctgh)"><span class="fas fa-plus"></span></button>

               </div>
               <div class="col-md-2 column">
                    <p class="text">{{ formatMoney(ctgh.CTGH_SoLuong * ctgh.SP_GiaBanRa) }}đ</p>
               </div>
               <div class="col-md-1 column"><button @click="deleteSanPham(ctgh)" type="button"
                         class="text btnXoa btn">Xóa</button></div>
          </div>
          <div class="row thongTinDatHang">
               <div class="col-md-2 column">
                    <input class="form-check-input chonTatCa" style="position: relative;" type="checkbox" value=""
                         id="flexCheckDefault2" @click="chonTatCa = !chonTatCa, chonTatcaSP(), tinhThanhTien()" />
                    <label class="lableTatCa">Chọn tất cả</label>
               </div>
               <div class="col-md-2">

               </div>
               <div class="col-md-6 column">
                    <p class="tongThanhToan">Tổng thanh toán ({{ sanphamChon.length }} Sản phẩm):
                         {{ formatMoney(thanhTien) }}đ</p>
               </div>

               <div class="col-md-2 column">
                    <button class="btn btnDatHang" @click="isOpenDatHang = !isOpenDatHang">Đặt hàng</button>
               </div>
          </div>

     </div>
     <!------------------------------------------------------------- Form dat hang -->
     <div class="dathang container-fuild">
          <div v-if="isOpenDatHang">
               <h3 style="text-align:center">ĐƠN HÀNG</h3>
               <div class="row" style="width:100%">
                    <div class="col-md-6 textTT"> Tên tài khoản đặt hàng: {{ currentUser.KH_Ten }}</div>
                    <div class="col-md-6 textTT">Số điện thoại: {{ currentUser.KH_SDT }}</div>
               </div>
               <div class="row" style="width:100%">
                    <div class="col-md-6">
                         <label class="textTT">Địa chỉ giao hàng:</label><br>
                         <input type="text" name="diachi" id="diachi" class="diachi" required
                              v-model="dondathang.DH_DiaChiGiaoHang" placeholder="Nhập địa chỉ giao hàng....">
                    </div>
                    <div class="col-md-6">
                         <label class="textTT">Ghi chú:</label><br>
                         <input type="text" name="ghichu" id="ghichu" class="ghichu" v-model="dondathang.DH_GhiChu"
                              placeholder="Nhập ghi chú...">
                    </div>
               </div>

               <div class="row chitietDonHang">
                    <div class="col-md-12">
                         <h4 style="text-align:center">CHI TIẾT ĐƠN HÀNG</h4>
                    </div>
                    <div class="col-md-12 ">
                         <div class="row titleRowCTDH" style="width:100%">
                              <div class="col-md-6 title">Sản phẩm</div>
                              <div class="col-md-2 title" style="text-align:center">Đơn giá</div>
                              <div class="col-md-2 title" style="text-align:center">Số lượng</div>
                              <div class="col-md-2 title" style="text-align:center">Số tiền</div>
                         </div>
                         <div v-for="(ctgh, i) in sanphamChon" :key="i" class="row thongtinSPDatHang">
                              <div class="sanpham col-md-6 column">
                                   <div class="row">
                                        <div class="col-md-2 hinhanh">
                                             <div class="row" style="margin: 4px 4px 4px 4px;">
                                                  <img :src="ctgh.SP_HinhAnh" class="img-fluid img-thumbnail" alt="">
                                             </div>
                                        </div>
                                        <div class="col-md-9 khungTenSP" style=" position: relative;">
                                             <p class="tenSP">{{ ctgh.SP_TenSanPham }}</p>
                                        </div>
                                   </div>
                              </div>
                              <div class="col-md-2 column">
                                   <p class="textDatHang">{{ formatMoney(ctgh.SP_GiaBanRa) }}đ</p>
                              </div>
                              <div class="col-md-2 column">
                                   <p class=" soluong textDatHang">{{ ctgh.CTGH_SoLuong }}</p>
                              </div>
                              <div class="col-md-2 column">
                                   <p class="textDatHang">{{ formatMoney(ctgh.CTGH_SoLuong * ctgh.SP_GiaBanRa) }}đ</p>
                              </div>
                         </div>
                    </div>
                    <div class="row rowDatHang">
                         <div class="col-md-4">
                         </div>
                         <div class="col-md-6 column">
                              <p class="tongThanhToan">Tổng thanh toán ({{ sanphamChon.length }} Sản phẩm):
                                   {{ formatMoney(thanhTien) }}đ</p>
                         </div>

                         <div class="col-md-2 column">
                              <button class="btn btnDatHang" @click="datHang()">Đặt hàng</button>
                         </div>
                    </div>
               </div>
          </div>
     </div>
</template>
     
<script type=”text/javascript”>
import SanPhamService from "../../../services/sanpham.service";
import CTGHService from "../../../services/chitietgiohang.service";
import GioHangService from "../../../services/giohang.service";
import DonHangService from "../../../services/donhang.service";
import CTDHService from "../../../services/chitietdonhang.service";
import { mapGetters, mapMutations } from "vuex";



export default {
     name: `GioHang`,

     data() {
          return {
               sanpham: {},
               ctghActive: {},
               giohangActive: {},
               sanphamChon: [],
               chitietgiohang: [],
               chonTatCa: false,
               thanhTien: 0,
               isOpenDatHang: false,
               dondathang: {},
               chitietdonhang: [],
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

          //    Dinh dang hien thi tien 
          formatMoney(data) {
               let val = (data / 1).toFixed(0).replace(".", ",");
               return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
          },

          async retrieveCTGH() {
               const [error, response] = await this.handle(
                    CTGHService.findByMaGH(this.currentUser.GH_Ma)
               );
               if (error) {
                    console.log(error);
               } else {
                    this.chitietgiohang = response.data;
                    this.chitietgiohang.forEach(element => {
                         this.findSanPham(element);
                    });
               }
          },

          // Tim kiem san pham theo ma san pham
          async findSanPham(ctgh) {
               const [error, response] = await this.handle(
                    SanPhamService.getByID(ctgh.SP_Ma)
               );
               if (error) {
                    console.log(error);
               } else {
                    ctgh.SP_TenSanPham = response.data.SP_TenSanPham;
                    ctgh.SP_GiaBanRa = response.data.SP_GiaBanRa;
                    ctgh.SP_HinhAnh = require(`@/images/` + response.data.SP_HinhAnh);
               }
          },

          // Tim kiem thong tin gio hang
          async findGioHang(ma) {
               const [error, response] = await this.handle(
                    GioHangService.getByID(ma)
               );
               if (error) {
                    console.log(error);
               } else {
                    this.giohangActive = response.data;
                    console.log(this.giohangActive)
               }
          },

          // Tang so luong san pham
          async tangSL(ctgh) {
               this.findGioHang(this.currentUser.GH_Ma)
               const [error, response] = await this.handle(
                    SanPhamService.getByID(ctgh.SP_Ma)
               );
               if (error) {
                    console.log(error);
               } else {
                    this.sanpham = response.data;
                    if (response.data.SP_SoLuong >= 1) {
                         ctgh.CTGH_SoLuong += 1;
                         this.sanpham.SP_SoLuong = this.sanpham.SP_SoLuong - 1;
                         this.updateSanPham(ctgh);
                         this.updateCTGH(ctgh);
                         this.giohangActive.GH_TongSoLuong += 1;
                         this.updateGioHang();
                         this.tinhThanhTien();
                    }
               }
          },

          // Giam so luong san pham
          async giamSL(ctgh) {
               this.findGioHang(this.currentUser.GH_Ma)
               const [error, response] = await this.handle(
                    SanPhamService.getByID(ctgh.SP_Ma)
               );
               if (error) {
                    console.log(error);
               } else {
                    this.sanpham = response.data;
                    ctgh.CTGH_SoLuong -= 1;
                    this.sanpham.SP_SoLuong = this.sanpham.SP_SoLuong + 1;
                    this.updateSanPham(ctgh);
                    this.updateCTGH(ctgh)
                    console.log(this.giohangActive.GH_TongSoLuong)
                    this.giohangActive.GH_TongSoLuong -= 1;
                    this.updateGioHang();
                    this.tinhThanhTien();
               }
          },

          // Cap nhat so luong san pham trong csdl
          async updateSanPham(ctgh) {
               const [error, response] = await this.handle(
                    SanPhamService.update(ctgh.SP_Ma, this.sanpham)
               );
               if (error) {
                    console.log(error);
               } else {
                    console.log(response.data)
               }
          },

          // Cap nhat so luong san pham trong chi tiet gio hang
          async updateCTGH(ctgh) {
               const [error, response] = await this.handle(
                    CTGHService.update(this.currentUser.GH_Ma, ctgh)
               );
               if (error) {
                    console.log(error);
               } else {
                    console.log(response.data)
               }
          },

          // Cap nhat tong so luong san pham trong gio hang
          async updateGioHang() {
               let soluongsp = 0;
               this.chitietgiohang.forEach(element => {
                    soluongsp += element.SP_SoLuong;
               });
               this.giohangActive.GH_TongSoLuong = soluongsp;
               const [error, response] = await this.handle(
                    GioHangService.update(this.currentUser.GH_Ma, this.giohangActive)
               );
               if (error) {
                    console.log(error);
               } else {
                    console.log(response.data)
               }
          },

          // Tim kiem san pham de tra so luong san pham khi xoa san pham khoi gio hang
          async deleteSanPham(ctgh) {
               this.findGioHang(this.currentUser.GH_Ma)
               const [error, response] = await this.handle(
                    SanPhamService.getByID(ctgh.SP_Ma)
               );
               if (error) {
                    console.log(error);
               } else {
                    this.sanpham = response.data;
                    this.sanpham.SP_SoLuong = this.sanpham.SP_SoLuong + ctgh.CTGH_SoLuong;
                    this.updateSanPham(ctgh);
                    this.giohangActive.GH_TongSoLuong -= ctgh.CTGH_SoLuong;
                    this.updateGioHang();
                    this.deleteCTGH(this.sanpham.SP_Ma);
               }

          },

          // Xoa chi tiet gio hang có ma san pham da chon xoa khoi gio hang
          async deleteCTGH(maSP) {
               const [error, response] = await this.handle(
                    CTGHService.delete(maSP)
               );
               if (error) {
                    console.log(error);
               } else {
                    console.log(response.data);
                    this.retrieveCTGH();
               }

          },

          //Click chon san pham tren checkbox
          async chonSP(ctgh) {

               const t = this.sanphamChon.length;
               if (t == 0) {
                    this.sanphamChon.push(ctgh);
               }
               else {
                    let check = 0;
                    let i = 0;
                    this.sanphamChon.forEach(element => {
                         if (element.SP_Ma == ctgh.SP_Ma) {
                              check = 1;
                              this.sanphamChon.splice(i, 1);
                              document.getElementById('flexCheckDefault2').checked = false
                         }
                         i++;
                    });
                    if (check == 0) {
                         this.sanphamChon.push(ctgh);
                    }
               }
          },

          // Click checkbox chon tat ca san pham
          async chonTatcaSP() {
               if (this.chonTatCa) {
                    this.sanphamChon.splice(0, this.sanphamChon.length);
                    let temp = this.chitietgiohang.slice();
                    this.sanphamChon = temp;
                    for (const checkbox of document.querySelectorAll('#flexCheckDefault')) {
                         checkbox.checked = true;
                    }

               }
               else {
                    this.sanphamChon.splice(0, this.sanphamChon.length);
                    for (const checkbox of document.querySelectorAll('#flexCheckDefault')) {
                         checkbox.checked = false;
                    }
               }
          },

          async checkInSanPhamDaChon(sanpham) {
               console.log("chbk" + sanpham)
               this.sanphamChon.forEach(element => {
                    if (element.SP_Ma == sanpham) {
                         return true;
                    }
               });
               return false;
          },

          // Kiem tra so luong san pham da chon co bang so luong chi tiet gio hang khong
          async checkSLSPdaChon() {
               if (this.chitietgiohang.length == this.sanphamChon.length) {
                    this.chonTatCa = true;
                    document.getElementById('flexCheckDefault2').checked = true;
               }
               else {
                    this.chonTatCa = false;
                    document.getElementById('flexCheckDefault2').checked = false;
               }
          },

          // Tinh thanh tien cho cac san pham da chon
          async tinhThanhTien() {
               this.thanhTien = 0;
               this.sanphamChon.forEach(element => {
                    this.thanhTien += element.SP_GiaBanRa * element.CTGH_SoLuong;
               });
          },

          // Dat hang
          async datHang() {
               console.log(this.dondathang.DH_DiaChiGiaoHang+"ncka")
               if (this.dondathang.DH_DiaChiGiaoHang != null) {
                    let tongsoluong = 0;
                    this.sanphamChon.forEach(element => {
                         tongsoluong += element.CTGH_SoLuong;
                    });

                    this.dondathang.DH_TongSoLuong = tongsoluong;
                    this.dondathang.KH_Ma = this.currentUser.KH_Ma;
                    this.dondathang.DH_TongTien = this.thanhTien;
                    this.dondathang.DH_TrangThai = "Mới";
                    this.dondathang.DH_NgayDat = new Date().toLocaleDateString();
                    console.log(this.dondathang);
                    const [error, response] = await this.handle(
                         DonHangService.create(this.dondathang)
                    );
                    if (error) {
                         console.log(error);
                    } else {
                         console.log(response.data)
                         this.createCTDH(response.data.id);
                    }
               }
          },

          //tao chi tiet don hang

          async createCTDH(maDH) {
               this.sanphamChon.forEach(element => {
                    let temp = {};
                    temp.DH_Ma = maDH;
                    temp.CTDH_SoLuong = element.CTGH_SoLuong;
                    temp.SP_Ma = element.SP_Ma;
                    temp.CTDH_Gia = element.SP_GiaBanRa
                    console.log(this.temp);
                    this.saveCTDH(temp);
               })
          },

          async saveCTDH(ctdh) {
               const [error, response] = await this.handle(
                    CTDHService.create(ctdh)
               );
               if (error) {
                    console.log(error);
               } else {
                    console.log(response.data);
                    this.chonSP(ctdh);
                    this.deleteCTGH(ctdh.SP_Ma)
               }
          },
     },

     mounted() {
          this.initCustomerState();
          this.retrieveCTGH();
     }

}
</script>
     
<style>
@import '../../../assets/GioHangStyle.css';
</style>