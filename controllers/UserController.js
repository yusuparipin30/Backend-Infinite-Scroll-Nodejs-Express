//1.import folder models dg file  UserModel.js
import User from "../models/UserModel.js";
//4.
import {Op} from "sequelize";
//2.membuat function stop
export const getUsers = async(req, res) =>{
    //3. jika user tdk mengirimkan lastId maka seting menjadi 0
    const last_id = parseInt(req.query.lasInd) || 0;
    const limit = parseInt(req.query.limit) || 3;
    const search = req.query.search_query || "";

    //6.masukan results kedalam variabel result
    let result = [];

    //5.jika last_id lebih kecil dari 1 maka exs query
    if(last_id < 1){
        const results = await User.findAll({
            where:{
                [Op.or]: [{name:{
                    [Op.like]: '%'+search+'%'
                }}, {address:{
                    [Op.like]: '%'+search+'%'
                }},{gender:{
                    [Op.like]: '%'+search+'%'
                }},{marital_sts:{
                    [Op.like]: '%'+search+'%'
                }},{ category_peole:{
                    [Op.like]: '%'+search+'%'
                }},{ active_state: {
                    [Op.like]: '%'+search+'%'
                }}]
        },
        limit: limit,
        order:[
            ['id','DESC']
        ]
    });
    result = results;
    //7.
    } else{
        const results = await User.findAll({
            where:{
                id:{
                    [Op.lt]: last_id
                },
                [Op.or]: [{name:{
                    [Op.like]: '%'+search+'%'
                }}, {address:{
                    [Op.like]: '%'+search+'%'
                }},{gender:{
                    [Op.like]: '%'+search+'%'
                }},{marital_sts:{
                    [Op.like]: '%'+search+'%'
                }},{ category_peole:{
                    [Op.like]: '%'+search+'%'
                }},{ active_state: {
                    [Op.like]: '%'+search+'%'
                }}]
        },
        limit: limit,
        order:[
            ['id','DESC']
        ]
    });
    result = results;
    }
    //8.memberi sespon
    res.json({
        result :result,
        //9.cek lasId ,jika terdapat data maka ambil id yang terakhir dr data tersebut, jika tidak set id menjadi 0
        lastId: result.length ? result[result.length -1].id: 0,
        //10.respon, jika terdapat data dan datanya lebihbesar atau samadengan limitnya,artinya terdapat data berikutnya
        hasMore:result.length >= limit ? true :false
    });
}