//1.import folder models dg file  UserModel.js
import User from "../models/UserModel.js";
//4.1
import {Op} from "sequelize";
//2.membuat function stop
export const getUsers = async(req, res) =>{
    //3. mereturn dgn parseInt, jika user tdk mengirimkan lastId maka seting menjadi 0
    const last_id = parseInt(req.query.lasInd) || 0;
    const limit = parseInt(req.query.limit) || 3;
    //menghubungkan infinite scroll dg pencarian. mebutuhkan string jd tidak membutuhkan parseInt
    const search = req.query.search_query || "";

    //6.masukan results kedalam variabel result
    let result = [];

    //5.1 jika last_id lebih kecil dari 1 maka exs query di bawah ini
    if(last_id < 1){
        //4.User di ambil dari modelnya
        const results = await User.findAll({
            //5.
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
        //mengurutkan datanya secara descending agat data yang terbaru akan tampil di paling atas
        order:[
            ['id','DESC']
        ]
    });
    //6.1
    result = results;
    //7. apabila  last_id nya tidak sama dgn 0 atau lebih besar dari 0 maka eksekusi query yang lain/ di bawah ini
    } else{
        const results = await User.findAll({
            where:{
                id:{
                    //lt = kurang dari (last than)
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