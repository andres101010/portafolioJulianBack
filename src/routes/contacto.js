import { Router } from "express";
import express from "express";
import mysql from "mysql"
import { BD_HOST, BD_NAME, BD_PASSWORD, BD_USER } from "../db/db.js";
const router = Router();
express().use(express.json());

const conectBD = mysql.createConnection({
    host: BD_HOST ,
    user: BD_USER ,
    password: BD_PASSWORD,
    database: BD_NAME 
});

router.get('/', (req, res) => {
    res.send("Bienvenido a Contacto")
})
router.post('/newSolicitud',(req,res)=>{
    const sql = 'INSERT INTO solicitudes SET ?'
    const solicitudObj ={
        nombre: req.body.nombre,
        correo: req.body.correo,
        telefono: req.body.telefono,
        solicitud: req.body.solicitud,
        comentario: req.body.comentario
    }
    conectBD.query(sql,solicitudObj,(err,result)=>{
        if(err) throw err
        res.send("Solicitud agregada con exito!")
    })
 });

 export default router;