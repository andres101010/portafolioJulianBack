 import  express from "express";
 import Login from "./routes/login.js"
 import Contact from "./routes/contacto.js"
 import Solicitudes from "./routes/solicitudes.js"
 const app = express()
 const PORT = process.env.PORT || 3005;
 app.use(express.json());
 app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
    next();
  });

   app.use('/login', Login)
   app.use('/contact', Contact)
   app.use('/solicitudes', Solicitudes)

   app.listen(PORT)
   console.log("Puerto corriendo en", PORT)
  export default app;