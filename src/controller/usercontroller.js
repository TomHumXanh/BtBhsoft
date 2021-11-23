import mongoose from "mongoose";
import User from "../models/usermodles";
import bcrypt from "bcrypt";
import signToken from "../ultils/token";


// Xác thực người dùng đăng ký
export const createUser = async function(req, res) {
    // Yêu cầu nhập dữ liệu từ người dùng
    const {username, password, email, phone} = await req.body;
    // Kiểm tra tên đăng nhập và email
    const userExisted = await User.findOne({
        username,
    });

    const emailExisted = await User.findOne({
        email,
    });

    console.log(userExisted, emailExisted);
    // Kiểm tra và tạo tài khoản 
    if (!userExisted && !emailExisted) {
        // Mã hóa mật khẩu 
        const saltRounds = 10;
        const hash = bcrypt.hashSync(password, saltRounds);
        // Tạo người dùng mới 
        const createRequire = {

            _id: mongoose.Types.ObjectId(),
            username,
            password: hash,
            email,
            phone,
            created: Date.now(),
        },
        // Thông báo khi tạo thành công
        const newUser = await User.create(createRequire);
        res.status(201).json({
            status: "Tạo tài khoản thành công",
            data: {
                user: newUser,
            }
        });
        // Thông báo khi tạo tài khoản thất bại
    }else {
        res.status(500).json({
            status: "Tài khoản hoặc email đã được sử dụng",
        })
    };
};




