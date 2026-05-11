//added by sr


const mongoose = require("mongoose");

const skillSchema = new mongoose.Schema({

    studentId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    },

    leadership:Number,

    communication:Number,

    management:Number

});

module.exports = mongoose.model("Skill",skillSchema);


