const mongoose=require('mongoose');
const Schema=mongoose.Schema;

const cartSchema= Schema({
    sku:{type:String,required:true,unique:true},
    image:{type:String,required:true},
    location:{type:String,required:true},
    title:{type:String,required:true,},
    date:{type:Number,required:true,},
    text:{type:String,required:true,},
    isDeleted:{type:Boolean,default:false}
    
},{timestamps:true});

cartSchema.methods.toJSON=function(){
    const obj=this._doc

    delete obj.password
    delete obj.__v
    delete obj.updateAt
    delete obj.createAt

    return obj
}

const Cart=mongoose.model('Cart',cartSchema);
module.exports=Cart;