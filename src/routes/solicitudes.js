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


router.get('/', (req,res)=>{
    const {nombre,correo,telefono,solicitud,comentario} = req.body
    const values = [nombre,correo,telefono,solicitud,comentario]
    const sql = 'SELECT * FROM solicitudes'

    conectBD.query(sql,values,(err,result)=>{
        if(err){
            res.status(500).send(err)
        }else if(result.length > 0){
            res.status(200).send(result)
        }else{
            res.status(400).send("No hay solicitudes registradas.")
        }
    }) 
});

 router.get('/:userId',(req,res)=>{
    const userId = req.params.userId
    const sql = `SELECT * FROM solicitudes WHERE idsolicitudes = ${userId}`

    conectBD.query(sql, (err, result)=>{
        if(err){
            res.status(500).send(err)
        }else if(result.length > 0){
            res.status(200).send(result)
        }else{
            res.status(400).send("Informacion no encontrada")
        }
        
    }) 
 })

 router.put('/update-solicitud/:idsolicitudes',(req,res)=>{
       const id = req.params.idsolicitudes
       const {nombre,correo,telefono,solicitud,comentario} = req.body
       const sql = `UPDATE solicitudes SET nombre= '${nombre}', correo= '${correo}', telefono= '${telefono}',
       solicitud= '${solicitud}', comentario= '${comentario}' WHERE idsolicitudes = ${id}`
       
       conectBD.query(sql, error =>{
        if(error) throw error
        res.send(`Solicitud con el id ${id}, fue actualizado!`)
       })
 });

 router.delete('/delete-solicitud/:idsolicitudes',(req,res)=>{
    const id = req.params.idsolicitudes
    const sql = `DELETE FROM solicitudes WHERE idsolicitudes = ${id}`

    conectBD.query(sql, error =>{
        if(error) throw error
        res.send(`Solicitud con el id ${id}, fue eliminado con exito!`)
    })
 });

 export default router;