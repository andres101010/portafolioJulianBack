import { Router } from "express";
import express from "express";
import mysql from "mysql"
import { BD_HOST, BD_NAME, BD_PASSWORD, BD_USER } from "../db/db.js";
const router = Router();
express().use(express.json());
const conectBD = mysql.createConnection({
    host: BD_HOST,
    user: BD_USER ,
    password: BD_PASSWORD,
    database: BD_NAME
});
router.get('/', (req,res) => {
    res.send("Bienvenido a login")
})
router.post('/', (req,res)=>{
    const {user,password} = req.body
    const values = [user,password]

    const sql = 'SELECT * FROM login WHERE user = ? and password = ?'

    conectBD.query(sql,values,(err, result) =>{
        if(err){
            res.status(500).send(err)
        }else if(result.length > 0){
            res.status(200).send('El usuario existe!')
        }else{
            res.status(400).send('El usuario no existe!')
        }
    })
});
router.post('/createUser',(req,res)=>{
    const sql = 'INSERT INTO login SET ?'
    const solicitudObj ={
        user: req.body.user,
        password: req.body.password
    }
    conectBD.query(sql,solicitudObj,(err,result)=>{
        if(err) throw err
        res.send(" Agregado con exito!")
    })
 });

export default router