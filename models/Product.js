const mongoose=require('mongoose');
const Schema=mongoose.Schema;

const productSchema= Schema({
    sku:{type:String,required:true,unique:true},
    image:{type:String,required:true},
    location:{type:String,required:true},
    title:{type:String,required:true,},
    date:{type:Number,required:true,},
    text:{type:String,required:true,},
    isDeleted:{type:Boolean,default:false}
    
},{timestamps:true});

productSchema.methods.toJSON=function(){
    const obj=this._doc

    delete obj.password
    delete obj.__v
    delete obj.updateAt
    delete obj.createAt

    return obj
}

const Product=mongoose.model('Product',productSchema);
module.exports=Product;