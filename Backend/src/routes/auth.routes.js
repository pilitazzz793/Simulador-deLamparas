import express from 'express';
import pool from '../db.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const router = express.Router();

//registro
router.post("/register", async (req, res) =>{
    console.log("BODY:", req.body);
    const { nombre, email, password} = req.body;

    try {
        const hashedPassword = await bcrypt.hash(password, 10);

        const result = await pool.query(
            "INSERT INTO usuarios (nombre, email, password) VALUES ($1, $2, $3) RETURNING *",
            [nombre, email, hashedPassword]
        );
        
        res.status(201).json(result.rows[0]);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'error al registrar usuario' });
    }
});

//login

router.post('./login', async (req, res)=>{
    const { emial, password}= req.body;

    try {
        const result = await pool.query(
            "SELECT * FROM usuarios WHERE email = $1",
            [email]
        );

        if(result.rows.length === 0) {
            return res.status(404).json({ error: 'usuario no encontrado'});
        }

        const user = result.rows[0];

        const validPassword = await bcrypt.compare(password, user.password);

        if(!validPassword){
            return res.status(401).json({ error: ' contraseña incorrecta'});
        }
        const token = jwt.sign({ id: user.id}, "secret_key", {
            expiresIn: '1h',

        });
        res.json({ token, user});
    } catch(error){
        console.error(error);
        res.status(500).json({ error: 'error en login'});
    }
});

router.get("/test", (req, res) =>{
    res.send('funciona');
});

//login
router.post("/login", async (req, res)=>{
    const { email, password}= req.body;

    try{
        const result = await pool.query(
            "SELECT * FROM usuarios WHERE email = $1",
            [email]
        );

        if(result.rows.length === 0){
            return res.status(404).json({ error: "usuario no encontrado"});
        }

        const user = result.rows[0];

        const validPassword = await bcrypt.compare(password, user.password);
        if (!validPassword){
            return res.status(401).json({ error: "contraseña incorrecta"});
        }

        const token = jwt.sign({
            id: user.id, rol: user.rol 
        }, "secret_key",
    { expiresIn: "1h"}
);
const { password: _, ...userSinPassword} = user;

res.json({ token, user: userSinPassword});
    }
    catch(error){
        console.error(error);
        res.status(500).json({ error: "error en el login"});
    }
});
router.get("/test2", (req, res) => {
  res.send("login route file ok");
});

export default router;