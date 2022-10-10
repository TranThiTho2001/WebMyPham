<template>
    <Form @submit="$emit('themDanhMuc-submit', danhmucLocal)" :validation-schema="schema">
        <div class="functionName">
            <span class="fa fa-plus-circle"> </span>
            <p style="display:inline">Thêm danh mục mới </p>
        </div>

        <div class="form-group">
            <label for="name">Mã danh mục</label>
            <Field name="ma" type="name" class="form-control" v-model="danhmucLocal.DM_Ma" placeholder="Nhập mã danh mục" />
            <ErrorMessage name="ma" class="error-feedback" />
            <!-- <p class="textMessage1">{{message1}}</p> -->
        </div>
        <div class="form-group">
            <label for="profile">Tên danh mục</label>
            <Field name="profile" class="form-control" v-model="danhmucLocal.DM_Ten" placeholder="Nhập tên danh mục" />
            <ErrorMessage name="profile" class="error-feedback" />
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

export default {
    name: "ThemDanhForm",
    components: {
        Form,
        Field,
        ErrorMessage,
    },
    emits: ["author-submit", "author-delete"],
    props: ["newdanhmuc", "message1", "message2"],
    data() {

        const schema = yup.object().shape({
            ma: yup
                .string()
                .required("Mã danh mục phải có giá trị.")
                .min(10, "Mã danh mục phải gồm 10 ký tự.")
                .max(10, "Mã danh mục phải gồm 10 ký tự."),
            profile: yup

                .string()
                .required("Tên danh mục phải được nhập")
        });
        return {
            danhmucLocal: this.newdanhmuc,
            schema,
        };
    },
    methods: {
        goToQLDanhMuc() {
            this.$router.push("/QLDanhMuc");
        }
    }
};
</script>

<style>
form {
    width: 510px;
    height: 470px;
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