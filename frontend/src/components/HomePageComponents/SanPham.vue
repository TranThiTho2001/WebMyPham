<template>
     <div class="sanpham text-dark border bg-light ">
         <div class="card-header row" ><img  :src="require(`@/images/${sanpham.SP_HinhAnh}`)" class="img-fluid" alt=""> </div>         
         <div class="body-sp border" style="border-radius: 20px; "> 
             <div class="row">
                 <div class="col-md-6">
                         <div class="col">
                             <strong class="font-weight-bold text-left" >
                             <span style="white-space: nowrap;
                                             overflow: hidden;
                                             text-overflow: ellipsis; ">{{sanpham.SP_TenSanPham }}</span>
                             </strong>
                         </div>
                 </div>
                 <div class="col-md-6">
                         <div class="col d-flex flex-column position-static">
                             <p class="d-inline-block text-right" >
                                     {{sanpham.SP_GiaBanRa }}
                             </p>
                         </div>
                 </div>
             </div>
 
             <div class="row">
                 <div class="col-12">
                         <div class="col d-flex flex-column position-static">
                             <span style="white-space: nowrap;
                                             overflow: hidden;
                                             text-overflow: ellipsis; ">
                             {{sanpham.SP_ThongTin }}
                             </span>
                         </div>
                 </div>
                 
             </div>
             <div class="row">
                 <div class="col-12">
                         <div class="col d-flex flex-column position-static">
                             <strong  class="font-weight-bold" >
                                 <span style="white-space: nowrap;
                                             overflow: hidden;
                                             text-overflow: ellipsis; ">{{sanpham.TH_Ma}}</span>
                             </strong>
                         </div>
                 </div>
                 
             </div>
             <div class="row">
                 <div class="col-9">
                         <div class="row">
                             <span class="d-inline-block" style="color: #789c73">
                                 <i  style="color: pink; display: inline;" class="fas fa-star"></i>
                                 <i  style="color: pink; display: inline;" class="fas fa-star"></i>
                                 <i  style="color: pink;display: inline; " class="fas fa-star"></i>
                                 <i  style="color: pink;display: inline;" class="fas fa-star"></i>
                                 <i  style="color: pink;display: inline;" class="fas fa-star"></i>
                             </span>
                         </div>
                 </div>
                 <div class="col-3">
                         <div class="ol d-flex flex-column position-static">
                             <strong class="d-inline-block" >
                                 <router-link :to="'/giohang/' ">
                                     <span><i style="color: white" class=" fas fa-lg fa-plus-circle"></i></span>
                                 </router-link>
                             </strong>
                         </div>
                 </div>
             </div>
         </div>
     </div>
 </template>
 
 <script>
 export default {
     name: "SanPham",
     props: ["sanpham"],
 };
 </script>
 
 <style>
 #name {
     font-family: "Playfair Display";
     color: #756262;
 }
 .body-sp {
    background-color: #d0cfcf;
    padding: 1px;
    max-height: 95px;
    overflow: ellipsis; 
    /* height: 150px;
    width: 185px; */
 }
 .body-sp:hover {
     color: white;
     background-color: #515151;
     border-color: #515151;
 }
 .sanpham {
     background-color: red;
     padding: 2px 2px 3px ;
     margin: 0 auto 2px;
     margin-top: 5px;
     -moz-border-radius: 2px;
     -webkit-border-radius: 2px;
     border-radius: 2px;
     -moz-box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.3);
     -webkit-box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.3);
     box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25), inset 0px 4px 4px rgba(0, 0, 0, 0.25);
     border-radius: 20px;
     /* width: min-content; */
     
 }
 .add-btn:hover {
     color: #515151;
     /* background-color: #515151; */
     border-color: #413e3e;
 }
 </style>