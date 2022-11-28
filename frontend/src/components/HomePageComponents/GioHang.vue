<template>
     <div class="giohang container-fuild">
          <div >{{currentUser.SDT}}</div>
     </div>

</template>
     
<script>

import CTGHService from '../../services/chitietgiohang.service'

export default{
     name: `GioHang`,
     props:["giohang", "currentUser"],
     data(){
          return {
               chitietgiohang:[],
          }
     },

     method: {
          async retrieveCTGH() {
            const [error, response] = await this.handle(
                CTGHService.findByMaGH(this.giohang.id)
            );
            if (error) {
                console.log(error);
            } else {
                this.chitietgiohang = response.data;
                console.log(response.data);
            }
        },
     }
}
</script>
     
<style>
@import '../../assets/GioHangStyle.css';
</style>