const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Name is required'],
    },
    lastname: {
        type: String,
        required: [true, 'Last name is required'],
    },
    imageUrl:{
        type: String
    },
    alias: {
        type: String,
        required: [true, 'Alias is required'],
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        unique: true,
        validate: {
            validator: val => /^([\w-\.]+@([\w-]+\.)+[\w-]+)?$/.test(val),
            message: 'Please enter a valid email address'
        }
    },
    password: {
        type: String,
        required: [true, 'Please enter a password'],
        minlength: [3, 'Password must be 8 characters or longer']
    }
}, { timestamps: true });

//middleware
UserSchema.pre('save', async function (next) {
    try {
        console.log('NEW password', this.password)
        const hashedPassword = await bcrypt.hash(this.password, 10)
        this.password = hashedPassword
        next()
    } catch {
        console.log('Failed to save user', error)
    }
})


module.exports = mongoose.model('User', UserSchema)