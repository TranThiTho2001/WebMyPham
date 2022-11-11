<template>
     <div class="container-fluid frameQLThongKe">
          <div class="row list">
               <div class="col-md-2 dschucNang">
                    <DanhSachChucNang :maNV="localNhanVien.NV_Ma" />
               </div>
               <div class="col-md-10">
                    <QLHeader :maNV="localNhanVien.NV_Ma" />
                    <div class="row content">
                         <div class="col-md-12 ">
                              <!-- Hang dau -->
                              <div class="row rowContent">
                                   <!-- Thong ke don hang -->
                                   <div class="col-md-3 donhang">
                                        <div class="row">
                                             <div class="col-md-3 icon">
                                                  <span class="fa fa-receipt"></span>
                                             </div>
                                             <div class="col-md-6 tongso">
                                                  <p class="number">{{ donhang.length }}</p>
                                                  <p class="name"> Đơn Hàng</p>
                                             </div>
                                             <div class="col-md-3 themmoi">
                                                  <p class="labelSoLuongMoi">
                                                       <span class="borderstyle">+2{{ trangthaidonhang.moi.soluong }}
                                                       </span>
                                                  </p>
                                             </div>
                                        </div>
                                   </div>
                                   <div class="col-md-1"></div>
                                   <!-- Thong ke doanh thu -->
                                   <div class="col-md-3 doanhthu">
                                        <div class="row">
                                             <div class="col-md-3 icon">
                                                  <span class="fa fa-dollar-sign"></span>
                                             </div>
                                             <div class="col-md-9 tongso">

                                                  <p class="name"> Doanh Thu</p>
                                                  <p class="number">{{ formatMoney(tongdoanhthu) }}đ</p>

                                             </div>
                                        </div>
                                   </div>
                                   <div class="col-md-1"></div>
                                   <!-- Thong ke tai khoan khach hang -->
                                   <div class="col-md-3 khachhang">
                                        <div class="row">
                                             <div class="col-md-3 icon">
                                                  <span class="fas fa-user-check"></span>
                                             </div>
                                             <div class="col-md-9 tongso">
                                                  <p class="number">{{ khachhang.length }}</p>
                                                  <p class="name">Tài Khoản</p>

                                             </div>
                                        </div>
                                   </div>
                              </div>
                              <!-- <div class="row rowContent">
                                   <Bar :chart-options="chartOptions" :chart-data="chartData" :chart-id="chartId"
                                        :dataset-id-key="datasetIdKey" :plugins="plugins" :css-classes="cssClasses"
                                        :styles="styles" :width="500" :height="500" />
                              </div> -->
                              <div class="row rowContent">
                                   <Line :chart-options="chartOptions" :chart-data="chartData" :chart-id="chartId"
                                        :dataset-id-key="datasetIdKey" :plugins="plugins" :css-classes="cssClasses"
                                        :styles="styles" :width="500" :height="500" />
                              </div>
                         </div>

                    </div>


               </div>
          </div>
     </div>
</template>

<script>
import moment from 'moment';
import DanhSachChucNang from '../../../components/QuanLy/DanhSachChucNang.vue';
import QLHeader from '../../../components/QuanLy/QLHeader.vue';
import DonHangService from '../../../services/donhang.service';
import KhachHangService from '../../../services/khachhang.service';
// import { Bar } from 'vue-chartjs';
// import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from 'chart.js';

// ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale);
import { Line } from "vue-chartjs"
import { Chart, registerables } from "chart.js";
Chart.register(...registerables)

export default {
     name: `ThongKe`,
     components: { DanhSachChucNang, QLHeader, Line },
     // extends: Bar,
     props: {
          chartId: {
               type: String,
               default: 'bar-chart'
          },
          datasetIdKey: {
               type: String,
               default: 'label',
               color: "yellow"
          },
          cssClasses: {
               default: '',
               type: String
          },
          styles: {
               type: Object,
               default: () => { }
          },
          plugins: {
               type: Object,
               default: () => { }
          }
     },
     data() {

          return {
               localNhanVien: {},
               donhang: [],
               khachhang: [],
               tongdoanhthu: 0,
               doanhthu: "",
               trangthaidonhang: {
                    "moi": {
                         name: "Mới",
                         soluong: 0,
                    },

                    "xacnhan": {
                         name: "Đã xác nhận",
                         soluong: 0,
                    },

                    "vanchuyen": {
                         name: "Đã vận chuyển",
                         soluong: 0,
                    },

                    "nhanhang": {
                         name: "Đã nhận hàng",
                         soluong: 0,
                    },

                    "huy": {
                         name: "Đã hủy",
                         soluong: 0,
                    },
               },

               thang: [
                    {
                         name: '01',
                         doanhthu: 0
                    },

                    {
                         name: '02',
                         doanhthu: 0
                    },

                    {
                         name: '03',
                         doanhthu: 0
                    },

                    {
                         name: '04',
                         doanhthu: 0
                    },

                    {
                         name: '05',
                         doanhthu: 0
                    },

                    {
                         name: '06',
                         doanhthu: 0
                    },

                    {
                         name: '07',
                         doanhthu: 0
                    },

                    {
                         name: '08',
                         doanhthu: 0
                    },

                    {
                         name: '09',
                         doanhthu: 0
                    },

                    {
                         name: '10',
                         doanhthu: 0
                    },

                    {
                         name: '11',
                         doanhthu: 0
                    },

                    {
                         name: '12',
                         doanhthu: 0
                    },
               ],
               chartData: {
                    labels: [],
                    datasets: [{
                         label:"Doanh Thu",
                         data: [],
                         backgroundColor: "transparent",
                         borderColor: "rgba(1, 116, 188, 0.50)",
                         pointBackgroundColor: "rgba(171, 71, 188, 1)",
                    }]
               },
               chartOptions: {
                    responsive: true,
                    maintainAspectRatio: false,
                    title: {
                         display: true,
                         text: "Doanh Thu"
                    }
               }

          }

     },


     created() {
          this.localNhanVien.NV_Ma = this.$route.params.id;
     },

     methods: {
          async getDonHang() {
               const [error, response] = await this.handle(
                    DonHangService.getAll()
               );
               if (error) {
                    console.log(error);
               } else {
                    this.donhang = response.data;
                    this.donhang.forEach(element => {
                         if (element.DH_TrangThai == this.trangthaidonhang.moi.name) {
                              this.trangthaidonhang.moi.soluong++;
                         }
                         if (element.DH_TrangThai == this.trangthaidonhang.xacnhan.name) {
                              this.trangthaidonhang.xacnhan.soluong++;
                         }
                         if (element.DH_TrangThai == this.trangthaidonhang.vanchuyen.name) {
                              this.trangthaidonhang.vanchuyen.soluong++;
                         }
                         if (element.DH_TrangThai == this.trangthaidonhang.nhanhang.name) {
                              this.trangthaidonhang.nhanhang.soluong++;
                         }
                         if (element.DH_TrangThai == this.trangthaidonhang.huy.name) {
                              this.trangthaidonhang.huy.soluong++;
                         }
                    });
                    this.doanhthutheothang();
               }
          },


          async doanhthutheothang() {
               this.donhang.forEach(element => {
                    if (element.DH_TrangThai == this.trangthaidonhang.nhanhang.name) {
                         this.tongdoanhthu = this.tongdoanhthu + element.DH_TongTien;
                         if (element.DH_NgayDat) {
                              console.log(element.DH_NgayDat)
                              element.DH_Thang = moment(String(element.DH_NgayDat)).format("MM / DD / YYYY hh: mm").substring(0, 2);
                              this.thang.forEach(t => {
                                   if (t.name == element.DH_Thang) {
                                        t.doanhthu = t.doanhthu + element.DH_TongTien;
                                   }
                                   console.log(t + " " + t.doanhthu)
                              });
                         }
                    }
               });
               let i = 0;
               this.thang.forEach(element => {

                    this.chartData.labels[i] = element.name;
                    this.chartData.datasets[0].data[i] = element.doanhthu;
                    i++;
               });
               console.log(this.formatMoney(this.tongdoanhthu) + "vdwsag")

          },
          formatMoney(data) {
               let val = (data / 1).toFixed(0).replace(".", ",");
               return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
          },

          async retrieveKhachHang() {
               const [error, response] = await this.handle(
                    KhachHangService.getAll()
               );
               if (error) {
                    console.log(error);
               } else {

                    this.khachhang = response.data;
                    console.log(response.data);
               }
          },




     },
     mounted() {
          this.getDonHang();
          this.retrieveKhachHang();
     }
}
</script>

<style>
@import '../../../assets/QLThongKeStyle.css';
</style>