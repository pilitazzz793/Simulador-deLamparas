import express from 'express';
import cors from 'cors';
import  pool  from './db.js';
import authRoutes from './routes/auth.routes.js';

const app= express();

app.use(cors());
app.use(express.json());
app.use('/auth', authRoutes);



app.listen(3000,()=>{
    console.log('servidor corriendo en el puerto 3000');
});