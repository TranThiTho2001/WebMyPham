<template>
     <div class="list">
         <div class="row sanpham-khung bg-light">
             <div v-for="(sanpham,i) in sanphams" :key="i" class="col-md-3">
                <SanPham :sanpham="sanpham"/>
             </div>
         </div>
     </div>
 </template>
 
 <script>
 import SanPham from "../HomePageComponents/SanPham.vue";
 import SanPhamService from "../../services/sanpham.service"
 
 
 export default {
     name: "SanPhamDS",
     components: {
         SanPham,
     },
     data() {
         return {
             sanphams: [],
             sohang: 0,
         };
     },
     methods: {
 
         async retrieveSanPhams() {
             const [error, response] = await this.handle(
                 SanPhamService.getAll()
             );
             if (error) {
                 console.log(error);
             } else {
                 this.sanphams = response.data;
                 console.log(response.data);
                 this.getSoHang();
             }
         },
         
         refreshList() {
             this.retrieveSanPhams();
             this.getSoHang();
         },
 
         // async removeAllsanphams() {
         //     const [error, response] = await this.handle(
         //         sanphamService.deleteAll()
         //     );
         //     if (error){
         //         console.log(error);
         //     } else {
         //         console.log(response.data);
         //         this.refreshList();
         //     }
         // },

        async getSoHang(){
            this.sohang = this.sanphams/4;
        }
         
         
     }, 
     mounted() {
         this.retrieveSanPhams();
     },   
 };
 </script>
 
 <style>
 .list {
    text-align: left;
    margin: auto;
    width: 100%;
 }
 .list-group-item.active {
   z-index: 2;
   color: #fff;
   background-color: #76575727;
   border-color: #968080ab;
 }
 .list-group-item:hover {
   color: #fff;
   background-color: #76575727;
 }
 .btn:hover {
     color: #756262;
     background-color: #76575727;
     border-color: #968080ab;
 }
 .form-control:focus {
   color: #495057;
   background-color: #fff;
   border-color: #968080ab;
   outline: 0;
   box-shadow: 0 0 0 0.2rem rgba(94, 74, 44, 0.315);
 }
 
 .sanpham-khung {
     background-color: #d0cfcf;
     font-size: 12px;
     padding: 2px 2px 3px;
     margin: 0 auto 2px;
     margin-top: 5px;
     -moz-border-radius: 2px;
     -webkit-border-radius: 2px;
     border-radius: 2px;
     width: 99%;
     height: 100px;
 }
 </style>