const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const Schema = mongoose.Schema;

const userSchema = new Schema(
    {
        firstName: { type: String, required: true },
        surname: {type: String, required: true},
        email: { type: String, required: true, unique: true},
        password: { type: String, required: true, minLength: 6},
        jobTitle: { type: String, required: true},
        image: {type: String, required: false}
    },
    {timestamps: true}
);

userSchema.plugin(uniqueValidator);

module.exports = mongoose.model('User', userSchema);