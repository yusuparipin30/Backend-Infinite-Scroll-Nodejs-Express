//1.import sequelize
import {Sequelize} from "sequelize";
//2.import folder config file DataBase.js
import db from "../config/DataBase.js";

//3.
const {DataTypes} = Sequelize;

//4. membuat scema table
const User = db.define('users', {
    name:DataTypes.STRING,
    address:DataTypes.STRING,
    gender:DataTypes.STRING,
    marital_sts:DataTypes.STRING,
    category_peole:DataTypes.STRING,
    active_state:DataTypes.STRING
}, {
    freezeTableName:true 
});
//5.
export default User;

//6.membuat function untuk membuat table users, jika table users tidak terdapat di database
(async() => {
    await db.sync();
})();

