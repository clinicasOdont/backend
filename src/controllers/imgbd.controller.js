import { pool } from "../db.js";
import https from 'https'; // Cambiado de http a https para manejar URLs https

export const getReferencias = async (req, res) => {
    try {
        const [rows] = await pool.query("SELECT * FROM referencias");
        res.json(rows);
    } catch (error) {
        return res.status(500).json({ message: "Something went wrong" });
    }
};

export const getOdontograma = async (req, res) => {
    try {
        const { id } = req.params;
        const [rows] = await pool.query("SELECT * FROM odontogramas WHERE public_id = ?", [id]);

        if (rows.length <= 0) {
            return res.status(404).json({ message: "Odontograma not found" });
        }

        res.json(rows[0]);
    } catch (error) {
        return res.status(500).json({ message: "Something went wrong" });
    }
};

export const deleteReferencias = async (req, res) => {
    try {
        const { id } = req.params;
        const [rows] = await pool.query("DELETE FROM referencias WHERE id = ?", [id]);

        if (rows.affectedRows <= 0) {
            return res.status(404).json({ message: "Referencias not found" });
        }

        res.sendStatus(204);
    } catch (error) {
        return res.status(500).json({ message: "Something went wrong" });
    }
};


export const createImagen = async (req, res) => {
    try {
        const {message, url, public_id,fecha } = req.body;
        const [result] = await pool.query(
            "INSERT INTO odontogramas (message, url, public_id, fecha) VALUES (?, ?, ?, ?)",
            [message,url, public_id, fecha]
        );

        res.status(201).json({ id: result.insertId, message, url, public_id, fecha});
    } catch (error) {
        res.status(500).json({ message: "Something went wrong" });
    }
    
};

export const updateReferencia = async (req, res) => {
    try {
        const { id } = req.params;
        const { descripcion, iva_porcentaje, precio, fecha } = req.body;

        const [result] = await pool.query(
            "UPDATE referencias SET descripcion = IFNULL(?, descripcion), iva_porcentaje = IFNULL(?, iva_porcentaje), precio = IFNULL(?, precio), fecha = IFNULL(?, fecha) WHERE id = ?",
            [descripcion, iva_porcentaje, precio, fecha, id]
        );

        if (result.affectedRows === 0)
            return res.status(404).json({ message: "Referencia not found" });

        const [rows] = await pool.query("SELECT * FROM referencias WHERE id = ?", [id]);

        res.json(rows[0]);
    } catch (error) {
        return res.status(500).json({ message: "Something went wrong" });
    }
};
