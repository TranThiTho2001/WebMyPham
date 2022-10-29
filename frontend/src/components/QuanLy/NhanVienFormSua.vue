<template>
     <Form @submit="$emit('suaNhanVien-submit', nhanvienMoi)" :validation-schema="schema">
          <div class="functionName">
               <span class="fas fa-edit"> </span>
               <h3 style="display:inline"> Cập nhật thông tin nhân viên</h3>
          </div>
          <div class="row container-fluid content">
               <div class="col-md-6">
                    <div class="form-group">
                         <label for="maNV">Mã</label>
                         <Field name="maNV" type="name" class="form-control" 
                               v-model="nhanvienMoi.NV_Ma" :disabled="true"/>
                         <ErrorMessage name="maNV" class="error-feedback" />
                    </div>
                    <div class="form-group">
                         <label for="hoNV">Họ nhân viên</label>
                         <Field name="hoNV" class="form-control" v-model="nhanvienMoi.NV_Ho" />
                         <ErrorMessage name="hoNV" class="error-feedback" />
                    </div>
                    <div class="form-group">
                         <label for="tenNV">Tên</label>
                         <Field name="tenNV" class="form-control" v-model="nhanvienMoi.NV_Ten" />
                         <ErrorMessage name="tenNV" class="error-feedback" />
                    </div>
                    <div class="form-group">
                         <label for="cccdNV">Số CMND/CCCD</label>
                         <Field name="cccdNV" class="form-control" v-model="nhanvienMoi.NV_CCCD" />
                         <ErrorMessage name="cccdNV" class="error-feedback" />
                    </div>
                    <div class="form-group">
                         <label for="ngaysinhNV">Ngày sinh</label>
                         <Field name="ngaysinhNV" class="form-control" v-model="nhanvienMoi.NV_NgaySinh">
                              <datepicker :value="nhanvienMoi.NV_NgaySinh" :placeholder="nhanvienMoi.NV_NgaySinh">
                              </datepicker>
                         </Field>
                         <ErrorMessage name="ngaysinhNV" class="error-feedback" />
                    </div>
               </div>
               <div class="col-md-6">
                    <div class="form-group">
                         <label for="sdtNV">Số điện thoại</label>
                         <Field name="sdtNV" class="form-control" v-model="nhanvienMoi.NV_SDT" />
                         <ErrorMessage name="sdtNV" class="error-feedback" />
                    </div>
                    <div class="form-group">
                         <label for="emailNV">Email</label>
                         <Field name="emailNV" class="form-control" v-model="nhanvienMoi.NV_Email" />
                         <ErrorMessage name="emailNV" class="error-feedback" />
                    </div>
                    <div class="form-group">
                         <label for="diachiNV">Địa chỉ</label>
                         <Field name="diachiNV" class="form-control" v-model="nhanvienMoi.NV_DiaChi" />
                         <ErrorMessage name="diachiNV" class="error-feedback" />
                    </div>

                    <div class="form-group">
                         <label for="matkhauNV">Mật khẩu</label>
                         <Field name="matkhauNV" class="form-control" v-model="nhanvienMoi.NV_MatKhau" type="password"/>
                         <ErrorMessage name="matkhauNV" class="error-feedback" />
                    </div>
                    <div class="form-group">
                         <label for="loaiNV">Chức vụ &nbsp; </label><br>
                         <Field name="loaiNV" class="form-control" v-model="nhanvienMoi.NV_LoaiNV">
                              <select  v-model="nhanvienMoi.NV_LoaiNV" class="selectBox">
                                   <option v-if="nhanvienMoi.NV_LoaiNV == '1'" :selected="true">Quản lý</option>
                                   <option v-else>Quản lý</option>
                                   <option v-if="nhanvienMoi.NV_LoaiNV == '2'" :selected="true">Nhân viên</option>
                                   <option v-else>Nhân viên</option>
                              </select>
                         </Field>
                         <ErrorMessage name="loaiNV" class="error-feedback" />
                    </div>
               </div>
          </div>
          <div class="form-group">
               <span v-if="message1 == 'Cập nhật thành công'" class="fas fa-check-circle"
                    style="color:#00BA13; text-align: center; margin-left: 40%;"></span>
               <span v-if="message1 == 'Cập nhật không thành công'" class="fas fa-times-circle"
                    style="color:red; text-align: center;  margin-left: 38%;"></span>
               <p v-if="message1 == 'Cập nhật thành công'" class="textMessage2" style="color:#00BA13">{{ message1 }}
               </p>
               <p v-else class="textMessage2">{{ message1 }}</p><br>
               <p v-if="message1 == 'Cập nhật không thành công'" class="textMessage1">{{ message1 }}</p>
               <button class="btn btn-outline-secondary btnLuu">Lưu</button>
          </div>

     </form>
</template>
 
<script>
import * as yup from "yup";
import { Form, Field, ErrorMessage } from "vee-validate";
import Datepicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css'

export default {
     name: "NhanVienFormThem",
     components: {
          Datepicker,
          Form, Field, ErrorMessage
     },
     emits: ["suaNhanVien-submit"],
     props: ["newnhanvien", "message1"],
     data() {

          const schema = yup.object().shape({
               maNV: yup
                    .string()
                    .required("Mã nhân viên phải có giá trị")
                    .min(10, "Mã nhân viên phải gồm 10 ký tự")
                    .max(10, "Mã nhân viên phải gồm 10 ký tự"),
               hoNV: yup
                    .string()
                    .required("Họ nhân viên phải có giá trị"),
               tenNV: yup
                    .string()
                    .required("Tên nhân viên phải có giá trị"),
               cccdNV: yup
                    .string()
                    .required("Số CMND/CCCD phải được nhập"),
               ngaysinhNV: yup
                    .date()
                    .required("Ngày sinh phải có giá trị"),
               sdtNV: yup
                    .string()
                    .required("SDT phải có giá trị")
                    .matches(/^(0|\+84)(\s|\.)?((3[2-9])|(5[689])|(7[06-9])|(8[1-689])|(9[0-46-9]))(\d)(\s|\.)?(\d{3})(\s|\.)?(\d{3})$/,'Số điện thoại không hợp lệ.') ,
               emailNV: yup
                    .string()
                    .matches(/^[a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,4}$/, "Email phải đúng định dạng")
                    .required("Email phải có giá trị"),
               diachiNV: yup
                    .string()
                    .required("Địa chỉ phải có giá trị"),
               matkhauNV: yup
                    .string()
                    .required("Mật khẩu tài khoản phải có giá trị"),
               loaiNV: yup
                    .string()
                    .required("Loại nhân viên phải được chọn"),
          });
          return {
               nhanvienMoi: this.newnhanvien,
               schema,
          };
     },
};
</script>
 
<style>
@import '../../assets/QLNhanVienStyle.css';
@import '../../assets/QuanLyStyle.css';

.content {
     margin-top: 2%;
}

select {
     width: 200px;
     height: 35px;
     border-color: #c9c6c6;
}
</style>