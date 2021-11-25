import mongoose from "mongoose";
import User from "../models/usermodles.js";
import bcrypt from "bcrypt";
import signToken from "../ultils/token.js";


// Verify register users
export const createUser = async function(req, res) {
    // Request input from the user
    const {username, password, email, phone} = await req.body;
    // Check username and email
    const userExisted = await User.findOne({
        username,
    });

    const emailExisted = await User.findOne({
        email,
    });

    console.log(userExisted, emailExisted);
    // Check and create account 
    if (!userExisted && !emailExisted) {
        // Encrypt password
        const saltRounds = 10;
        const hash = bcrypt.hashSync(password, saltRounds);
        // Create new user
        const createRequire = {

            _id: mongoose.Types.ObjectId(),
            username,
            password: hash,
            email,
            phone,
            created: Date.now(),
        };
        // Notification when successful creation
        const newUser = await User.create(createRequire);
        res.status(201).json({
            status: "Tạo tài khoản thành công",
            data: {
                user: newUser,
            }
        });
        // Notice when creation failed
    }else {
        res.status(500).json({
            status: "Tài khoản hoặc email đã được sử dụng",
        })
    };
};
// Login handling
export const login = async function(req, res) {
    const username = await req.body.username;
    const password = await req.body.password;
    const email = await req.body.email;
    const result = !!username ? { username: username } : { email: email };
    
    try {

        // Check 
        const user = await User.findOne(result);
        // Report an error if doesn't match
        if (!user) {
            return res.status(404).json({
              statusCode: 404,
              message: "Tài khoản hoặc mật khẩu không chính xác",
              data: {},
            });
        
        };

        // Result 
        if (!bcrypt.compareSync(password, user.password)) {
            return res.status(404).json({
                statusCode: 404,
                message: "Mật khẩu không chính xác"
            });
        };
    
        const sendToken = singToken({
            id: user._id,
            username: user.username,
            email: user.email,
            isActive: user.isActive,

        });
      
        res.status(200).json({
            statusCode: 200,
            message: "Đăng nhập thành công",
            data: {
                token: sendToken
            }
        });
        
    } catch (err) {
        res.status(404).json({
            statusCode: 404,
            message: err.message,
            data: {},
          });
    };


};




