const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const {User,Profile}= require('../models/user.js');

const ProjectSchema = new Schema({
    title:{
        type :String,
        required : true,
        length:520
    },
    details:String,
    code:{
        type:String,
        required : true,
        unique : true,
    },
    createdby:{
        _id:{
        type:Schema.Types.ObjectId,
        reference:Profile,
        required:true
        },
        name:{
            type:String,
            reference:Profile,
            required:true
        }
    },
    deadline:{
        type:Date,
        default:null,
    },
    members:[
        {
            _id:{
            type:Schema.Types.ObjectId,
            reference:Profile
            },
            name:{
                type:String,
                reference:Profile
            },
            designation:{
                type:String,
                default:" ",
                length:20
            },
    }],
    completedflag:{
        type:"Boolean",
        required:true,
        default:false
    },
})

const ApplicationSchema = new Schema({
        email: String,
        coverletter:String,
        salaryexpectation:String,
        availability:Date,
        additionalinfo:String,
})

const JobSchema= new Schema({
    jobtitle:String,
    company:String,
    location:String,
    salary:Number,
    jobdescription:String,
    requirements:String,
    howtoapply:String
})


const Project=mongoose.model('Project',ProjectSchema)
const Application=mongoose.model('Application',ApplicationSchema)
const Job=mongoose.model("Job",JobSchema)

module.exports={
    Project,
    Application,
    Job
}