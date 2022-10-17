
<template>
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.6.1/dist/css/bootstrap.min.css">
    <div class="container frameDangNhap">
        <div class="row formDangNhap">
            <div class="col-md-4 leftForm">
                <div class="row">
                    <img src="../../../images/logoDanhNhap.png" class="img-fluid  mx-auto d-block" width="269px"
                        height="222px" alt="Logo" style="border-radius: 15px;">
                </div>
                <div class="row" style="margin-top:20%">
                    <img src="../../../images/ImageDangNhap.png" class="img-fluid" width="464px" height="466px"
                        alt="Image" style="border-radius: 15px;">
                </div>
            </div>

            <div class="col-md-8 rightForm">
                <div style="margin-top: 10%">
                    <h2 style="text-align:center">ĐĂNG NHẬP</h2>
                </div>
                <div class="row">
                    <Form @submit="handleLogin" :validation-schema="schema" v-slot="{ isSubmitting }">
                        <div class="form-group">
                            <label for="username">Tên đăng nhập</label>
                            <Field name="username" type="text" class="form-control" placeholder="Nhập số tên đăng nhập"
                                v-model="nhanvien.NV_Ma"
                                style="border-radius: 15px; background-color: #F5F4F4; color: #BABABA;" />
                            <ErrorMessage name="username" class="error-feedback" style="color:red" />

                        </div>

                        <div v-if="!isOpenMatKhau" class="form-group" style="margin-top:10%">
                            <label for="password">Mật khẩu</label>
                            <div class="row" style="background-color: #F5F4F4; border-radius: 15px; margin: 0 0 0 1%;">
                                <Field name="password" type="password" class="form-control" placeholder="Nhập mật khẩu"
                                    style="border-radius: 15px; background-color: #F5F4F4; color: #BABABA; width:85%; border: none"
                                    v-model="nhanvien.NV_MatKhau" />
                                <span class="btn far fa-eye-slash btnHienMatKhau"
                                    @click="isOpenMatKhau=!isOpenMatKhau"></span>
                            </div>
                            <ErrorMessage name="password" class="error-feedback" style="color:red" />
                        </div>

                        <div v-if="isOpenMatKhau" class="form-group" style="margin-top:10%">
                            <label for="password">Mật khẩu</label>
                            <div class="row" style="background-color: #F5F4F4; border-radius: 15px; margin: 0 0 0 1%;">
                                <Field v-if="nhanvien.NV_MatKhau==''" name="password" type="text" class="form-control"
                                    placeholder="Nhập mật khẩu"
                                    style="border-radius: 15px; background-color: #F5F4F4; color: #BABABA; width:85%; border: none"
                                    v-model="nhanvien.NV_MatKhau" />
                                <Field v-else name="password" type="text" class="form-control"
                                    placeholder="{{nhanvien.NV_MatKhau}}"
                                    style="border-radius: 15px; background-color: #F5F4F4; color: #BABABA; width:85%; border: none"
                                    v-model="nhanvien.NV_MatKhau" />
                                <span  class="btn  far fa-eye btnAnMatKhau"
                                    @click="isOpenMatKhau=!isOpenMatKhau, setIsOpenmatKhau"></span>
                            </div>
                            <ErrorMessage name="password" class="error-feedback" style="color:red" />
                        </div>

                        <a href="#" @click="goToQuenMatKhau">Bạn quên mật khẩu</a>
                        <p v-if="message" style="display: inline; color: red; float:right">
                            {{ message }}
                        </p>

                        <div class="form-group my-3">
                            <button class="btn btn-sm btn-outline-secondary btn-block btnDangNhap"
                                :disabled="isSubmitting" :class="{ 'submitting': isSubmitting }">
                                <span v-show="loading" class="spinner-border spinner-border-sm"></span>
                                <span>Đăng nhập</span>
                            </button>
                        </div>


                    </Form>

                </div>
            </div>

        </div>
    </div>
</template>

<script>
import * as yup from "yup";
import { Form, Field, ErrorMessage } from "vee-validate";
import NhanVienService from "../../../services/nhanvien.service"
export default {
    name: `QLDangNhap`,
    components: { Form, Field, ErrorMessage },
    data() {

        const schema = yup.object().shape({
            username: yup.string().required("Tên đăng nhập phải có giá trị."),
            password: yup.string().required("Mật khẩu phải có giá trị."),
        });

        return {
            loading: false,
            message: "",
            schema,
            isOpenMatKhau: false,
            nhanvien: {},
            nhanviencheck: {},
        };
    },

    methods: {
        async setIsOpenmatKhau() {
            if (this.nhanvien.NV_MatKhau != "") {
                console.log("hfcwihlf");
            }
            else {
                this.nhanvien.NV_MatKhau = "";
            }

        },

        async handleLogin() {
            console.log(this.nhanvien.NV_Ma)
            const [error, response] = await this.handle(
                NhanVienService.getByID(this.nhanvien.NV_Ma)
            );
            if (error) {
                console.log(error);
                this.message = "Không tìm thấy tài khoản"
            } else {
                console.log(response.data);
                this.nhanviencheck = response.data;
                this.checkAccount();
            }
        },

        async checkAccount() {
            if (this.nhanvien.NV_MatKhau == this.nhanviencheck.NV_MatKhau) {
                this.$router.push({name: 'QLDonHang', params: { id: this.nhanviencheck.NV_Ma }}); 
            }
            else {
                this.message = "Mật khẩu sai";
            }
        },

        async goToQuenMatKhau(){
            this.$router.push("/QLQuenMatKhau");
        }
    },
    mounted() {
        this.nhanvien.NV_MatKhau = "";
    }
}
</script>

<style>
@import "../../../assets/QLTaiKhoanStyle.css"
</style>