import mongoose from 'mongoose';
mongoose.Promise = global.Promise;
const Schema = mongoose.Schema;


const userSchema = new Schema({

    _id: mongoose.Schema.Types.ObjectId,
    username: {
        type: String,
        require: true,
        unique: true,
    },
    password:{
        type: String,
        require: true
    },
    email: {
        type: String,
        require: true,
    },
    phone: {
        type: String,
        default:"",
        require: false,
    },
    created: {
        type: Date,
        default: Date.now(),
    },
    isActive: {
        type: Boolean,
        require: true,
        default: true,
    },
    isAdmin: {
        type: Boolean,
        require: true,
        default: false,
    },
    isVerify: {
        type: Boolean,
        require: true,
        default: false,
    },
    avatar: {
        type: String,
        require: false,
        default: "default_avatar.jpg"
    },
    resetPasswordToken: {
        type: String,
        require: false,
    },

});

userSchema.statics.findByLogin = async function (login) {
    let user = await this.findOne({
        username: login,
    })

    if (!user) {
        user = await this.findOne({email: login})
    }
    
    return user;
};
export default mongoose.model('User', userSchema);
