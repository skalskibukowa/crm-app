const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const Schema = mongoose.Schema;

// Enum jobTitle
const jobTitleEnum = [
    'Software Engineer',
    'Manager',
    'Sales Person',
    'Architect Solution',
    'Data Analyst',
    'Marketing Specialist',
    'intern',
];

const userRole = ['admin', 'user'];

const userSchema = new Schema(
    {
        firstName: { type: String, required: true },
        surname: { type: String, required: true },
        email: { type: String, required: true, unique: true },
        password: { type: String, required: true, minLength: 6 },
        jobTitle: { type: String, enum: jobTitleEnum, required: true },
        userRole: {
            type: String,
            enum: userRole,
            default: 'user',
            required: true,
        },
        image: { type: String, required: false },
        assignedProject: [
            { type: mongoose.Types.ObjectId, required: true, ref: 'Project' },
        ],
    },
    { timestamps: true },
);

userSchema.plugin(uniqueValidator);

module.exports = mongoose.model('User', userSchema);
