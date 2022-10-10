<template>
    <div class="container">
    <div class="row list">
        <div class="col-md-2">
            <DanhSachChucNang />
        </div>

        <!-- Cot ben phai -->
        <div class="col-md-10">

        </div>
    </div></div>
</template>
<script>
import DanhSachChucNang from '@/components/QuanLy/DanhSachChucNang.vue';
export default {
    name: `QLHomePage`,
    props: ["nhanvien"],
    components: { DanhSachChucNang }
};
</script>

<style>
</style>