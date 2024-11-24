import { pool } from "../db.js";
import https from 'https'; // Cambiado de http a https para manejar URLs https

export const getOdontogramas = async (req, res) => {
    try {
        const [rows] = await pool.query("SELECT * FROM odontogramas");
        res.json(rows);
    } catch (error) {
        return res.status(500).json({ message: "Something went wrong" });
    }
};

export const getOdontograma = async (req, res) => {
    try {
        const { id } = req.params;
        const [rows] = await pool.query("SELECT message, url, public_id, fecha, id FROM odontogramas WHERE public_id = ? ORDER BY id DESC LIMIT 1", [id]);

        if (rows.length <= 0) {
            return res.status(404).json({ message: "Odontograma not found" });
        }

        res.json(rows[0]);
    } catch (error) {
        return res.status(500).json({ message: "Something went wrong" });
    }
};

export const deleteOdontogramas = async (req, res) => {
    try {
        const { id } = req.params;
        const [rows] = await pool.query("DELETE FROM odontogramas WHERE id = ?", [id]);

        if (rows.affectedRows <= 0) {
            return res.status(404).json({ message: "Referencias not found" });
        }

        res.sendStatus(204);
    } catch (error) {
        return res.status(500).json({ message: "Something went wrong" });
    }
};


export const createOdontograma = async (req, res) => {
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

export const updateOdontograma = async (req, res) => {
    try {
        const { id } = req.params;
        const { message, url, public_id, fecha } = req.body;

        const [result] = await pool.query(
            "UPDATE odontogramas SET message = IFNULL(?, message), url = IFNULL(?, url), public_id = IFNULL(?, public_id), fecha = IFNULL(?, fecha) WHERE id = ?",
            [message, url, public_id, fecha, id]
        );

        if (result.affectedRows === 0)
            return res.status(404).json({ message: "Referencia not found" });

        const [rows] = await pool.query("SELECT * FROM odontogramas WHERE id = ?", [id]);

        res.json(rows[0]);
    } catch (error) {
        return res.status(500).json({ message: "Something went wrong" });
    }
};
