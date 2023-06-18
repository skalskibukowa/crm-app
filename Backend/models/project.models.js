const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const Schema = mongoose.Schema;

const projectSchema = new Schema(
    {
        projectName: { type: String, required: true },
        projectImage: { type: String, required: false },
        projectDetails: [
            {
                clientName: { type: String, required: true, unique: true },
                address: { type: String, required: true },
                industries: { type: String, required: true },
                size: { type: Number, required: false },
                contactPerson: { type: String, required: false },
            },
        ],
        AssignedUser: {
            type: mongoose.Types.ObjectId,
            required: true,
            ref: 'User',
        },
    },
    { timestamps: true }
);

projectSchema.plugin(uniqueValidator);

module.exports = mongoose.model('Project', projectSchema);
