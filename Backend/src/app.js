import express from 'express';
import cors from 'cors';
import  pool  from './db.js';

const app= express();

app.use(cors());
app.use(express.json());

//ruta de prueba
app.get('/usuarios', async (req, res) =>{
    try {
        const result = await Pool.query('SELECT * FROM usuarios');
        res.json(result.rows);

    } catch (err){
        console.error(error);
        res.status(500).json({error: 'error en el servidor'})
    }
});

app.listen(3000,()=>{
    console.log('servidor corriendo en el puerto 3000');
});