import mongoose, {Schema} from "mongoose";
const usuarioSchema = new Schema({
    role: {type:String , maxlength:30, required:true},
    nome: {type:String, maxlength:50, unique: true, required:true},
    tipo_documento: {type:String, maxlength:20},
    num_documento: {type:String, maxlength:20},
    direcao: {type:String, maxlength:70},
    telefone: {type:String, maxlength:20},
    email: {type:String, maxlength:50, unique: true, required:true},
    password: {type:String, maxlength:64,required:true},
    estado: {type: Number, default:1},
    criacao: {type: Date, default: Date.now}
});

const Usuario = mongoose.model('usuario', usuarioSchema);
export default Usuario;