const mongoose = require("mongoose");

const taskSchema = mongoose.Schema({
    title: {
        type: String,
        required: true,
        unique:true
    },

    description: {
        type: String,
        required:true,
        unique:true,
    },

    status:{
        type: String,
        enum: ['Pendiente','En Proceso', 'Completada']
    },

},{timestamps: true})


module.exports = mongoose.model("Task", taskSchema);