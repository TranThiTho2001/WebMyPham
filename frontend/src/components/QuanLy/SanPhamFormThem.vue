<template>
    <Form @submit="$emit('themSanPham-submit', sanphamLocal)" :validation-schema="schema">
        <div class="functionName">
            <span class="fa fa-plus-circle"> </span>
            <p style="display:inline">Thêm danh mục mới </p>
        </div>

        <div class="form-group">
            <label for="ma">Mã san pham</label>
            <Field name="ma" type="name" class="form-control" v-model="sanphamLocal.SP_Ma" placeholder="Nhập mã sản phẩm" />
            <ErrorMessage name="ma" class="error-feedback" />
            <!-- <p class="textMessage1">{{message1}}</p> -->
        </div>
        <div class="form-group">
            <label for="name">ma danh muc san pham</label>
            <Field name="ID_Catalog" class="form-control" v-model="sanphamLocal.DMSP_Ma" placeholder="Nhập ma danh muc sản phẩm" />
            <ErrorMessage name="name" class="error-feedback" />
        </div>
        <div class="form-group">
            <label for="name">thuong hieu san pham</label>
            <Field name="ID_Branch" class="form-control" v-model="sanphamLocal.TH_Ma" placeholder="Nhập ma thuong hieu sản phẩm" />
            <ErrorMessage name="name" class="error-feedback" />
        </div>
        <div class="form-group">
            <label for="name">Tên san pham</label>
            <Field name="name" class="form-control" v-model="sanphamLocal.SP_Ten" placeholder="Nhập tên sản phẩm" />
            <ErrorMessage name="name" class="error-feedback" />
        </div>
        <div class="form-group">
            <label for="information">Thong tin sp</label>
            <Field name="information" class="form-control" v-model="sanphamLocal.SP_ThongTin" placeholder="Thông tin sản phẩm" />
            <ErrorMessage name="information" class="error-feedback" />
        </div>
        <div class="form-group">
            <label for="quality">So luonh nhap</label>
            <Field name="quality" class="form-control" v-model="sanphamLocal.SP_SoLuongNhap" placeholder="Nhập Số lượng sản phẩm nhập vào" />
            <ErrorMessage name="quality" class="error-feedback" />
        </div>
        <div class="form-group">
            <label for="purchase_price">Gia mua vao</label>
            <Field name="purchase_price" class="form-control" v-model="sanphamLocal.SP_GiaMuaVao" placeholder="Nhập Giá mua sản phẩm " />
            <ErrorMessage name="purchase_price" class="error-feedback" />
        </div>
        <div class="form-group">
            <label for="saleprice">gia ban ra</label>
            <Field name="saleprice" class="form-control" v-model="sanphamLocal.SP_GiaBanRa" placeholder="Giá bán sản phẩm" />
            <ErrorMessage name="saleprice" class="error-feedback" />
        </div>
        <div class="form-group">
            <label for="image">Hinh anh</label>
            <!-- <file-input v-model="sanphamLocal.SP_HinhAnh" name="SP_HinhAnh"></file-input> -->
            <!-- <input type="file" ref="file" name="image" v-model="sanphamLocal.SP_HinhAnh">@change="selectFile" -->
            <p>{{sanphamLocal.SP_HinhAnh}}</p>
            <Field name="image" class="form-control"  type="file" ref="file" v-model="sanphamLocal.SP_HinhAnh"/>
            <!-- <ErrorMessage name="image" class="error-feedback" /> -->
        </div>
        <div class="form-group">
            <span v-if="message2=='Thêm thành công'" class="fas fa-check-circle" style="color:#00BA13; text-align: center; margin-left: 180px;"></span>
            <span v-if="message2=='Thêm không thành công'" class="fas fa-times-circle" style="color:red; text-align: center;  margin-left: 145px;"></span>
            <p v-if="message2=='Thêm thành công'" class="textMessage2" style="color:#00BA13">{{message2}}</p>
            <p v-else class="textMessage2" >{{message2}}</p><br>
            <p v-if="message2=='Thêm không thành công'" class="textMessage1">{{message1}}</p>
            <button class="btn btn-outline-secondary btnLuu">Lưu</button>
        </div>
    </form>

</template>

<script>
import * as yup from "yup";
import { Form, Field, ErrorMessage } from "vee-validate";
// import FileInput from 'vue3-simple-file-input';
export default {
    name: "SanPhamFormThem",
    components: {
        Form,
        Field,
        ErrorMessage, 
        // FileInput,
    },
    emits: ["themSanPham-submit", "author-delete"],
    props: ["newsanpham", "message1", "message2"],
    data() {

        const schema = yup.object().shape({
            ma: yup
                .string()
                .required("Mã danh mục phải có giá trị.")
                .min(10, "Mã danh mục phải gồm 10 ký tự.")
                .max(10, "Mã danh mục phải gồm 10 ký tự."),
            ID_Catalog: yup
                .string()
                .required("Mã danh mục phải có giá trị."),
            ID_Branch: yup
                .string()
                .required("Thuong hieu phai cos"),
            name: yup
                .string()
                .required("Tên danh mục phải được nhập"),
            information: yup
                .string()
                .required(" TT phai dc nhap"),
            quality: yup
                .number()
                .required("so luong phai dc nhap"),
            purchase_price: yup
                .number()
                .required(" Gia mua phai dcnhpa"),
            saleprice: yup
                .number()
                .required("Gia ban ra phai doc nha[p]"),
            // image:yup
   
                // .object()
                // .required("Hinh anh phai dc chon")
        });
        return {
            sanphamLocal: this.newsanpham,
            schema,
           
        };
    },
    methods: {
        goToQLDanhMuc() {
            this.$router.push("/QLDanhMuc");
        },
      async  selectFile() { 
        // debugger;
            this.sanphamLocal.SP_HinhAnh  =  this.$refs.file[0]; 
            console.log(this.sanphamLocal.SP_HinhAnh);
        }
    }
};
</script>

<style>
form {
    /* width: 510px;
    height: 470px; */
    border-radius: 15px;
    transform: translateX(6%);
    margin-top: 20px;
    background-color: #FFFFFF;
    margin-bottom: 10px;
}

form .functionName {
    text-align: center;
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    color: #515151;
    font-size: 25px;
    padding-top: 20px;
}

form .form-group {
    color: black;
    width: 90%;
    margin-left: 25px;
    margin-top: 50px;
}

form .error-feedback {
    text-align: right;
    color: red;
    float: right;
}

form .textMessage2{
    padding-top: 5px;
    text-align: center;
    padding-bottom: 2px;
    color: #D30000;
    display: inline;
}
form .textMessage1 {
    padding-bottom: 2px;
    color: #D30000;
    text-align: center;
}

form .btnLuu {
    text-align: center;
    transform: translateY(0px);
    margin-left: 175px;
    margin-top: 5px;
    width: 125px;
    background-color: #515151;
    color: #FFFFFF;
}
</style>