module.exports = mongoose => {
    const schema = mongoose.Schema(
        {
            KM_Ma: {
                type: String,
                required: [true, "Ma khuyen mai duoc yeu cau"],
            },

            KM_Ten: {
                type: String,
                required: [true, "Ten chuong trinh khuyen mai duoc yeu cau"],
            },

            KM_GiaTri: {
                type: Number,
                required: [true, "Thong tin khuyen mai duoc yeu cau"],
            },

            KM_NgayBatDau: {
                type: Date,
                required: [true, "Ngay bat dau khuyen mai duoc yeu cau"],
            },

            KM_NgayKetThuc: {
                type: Date,
                required: [true, "Ngay ket thuc khuyen mai duoc yeu cau"],
            },
            KM_HinhAnh: {
                type: String,
                required: [true, "Hinh anh chuong trinh khuyen mai duoc yeu cau"],
            }            
        });    
        
        // Replace _id with id and remove __V
        schema.method("toJSON", function() {
            const { __v, _id, ...object } = this.toObject();
            object.id = _id;
            return object;
        });


        return mongoose.model("KhuyenMai", schema);  
};