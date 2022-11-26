//.membuat koneksi kedatabase 
//1.import sequelize
import {Sequelize} from "sequelize";

//2.
const db = new Sequelize('infinite_db', 'root', '', {
    host :"localhost",
    dialect :"mysql"
});

//3.
export default db;