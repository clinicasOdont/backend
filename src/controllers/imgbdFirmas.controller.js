import { pool } from "../db.js";
import https from 'https'; // Cambiado de http a https para manejar URLs https

export const getFirmas = async (req, res) => {
    try {
        const [rows] = await pool.query("SELECT * FROM firmas");
        res.json(rows);
    } catch (error) {
        return res.status(500).json({ message: "Something went wrong" });
    }
};

export const getFirma = async (req, res) => {
    try {
        const { id } = req.params;
        const [rows] = await pool.query("SELECT message, url, public_id, fecha, id FROM firmas WHERE public_id = ? ORDER BY id DESC LIMIT 1", [id]);

        if (rows.length <= 0) {
            return res.status(404).json({ message: "Firma not found" });
        }

        res.json(rows[0]);
    } catch (error) {
        return res.status(500).json({ message: "Something went wrong" });
    }
};

export const deleteFirmas = async (req, res) => {
    try {
        const { id } = req.params;
        const [rows] = await pool.query("DELETE FROM firmas WHERE id = ?", [id]);

        if (rows.affectedRows <= 0) {
            return res.status(404).json({ message: "Referencias not found" });
        }

        res.sendStatus(204);
    } catch (error) {
        return res.status(500).json({ message: "Something went wrong" });
    }
};


export const createFirma = async (req, res) => {
    try {
        const {message, url, public_id,fecha } = req.body;
        const [result] = await pool.query(
            "INSERT INTO firmas (message, url, public_id, fecha) VALUES (?, ?, ?, ?)",
            [message,url, public_id, fecha]
        );

        res.status(201).json({ id: result.insertId, message, url, public_id, fecha});
    } catch (error) {
        res.status(500).json({ message: "Something went wrong" });
    }
    
};

export const updateFirma = async (req, res) => {
    try {
        const { id } = req.params;
        const {  message, url, public_id, fecha } = req.body;

        const [result] = await pool.query(
            "UPDATE firmas SET message = IFNULL(?, message), url = IFNULL(?, url), public_id = IFNULL(?, public_id), fecha = IFNULL(?, fecha) WHERE id = ?",
            [message, url, public_id, fecha, id]
        );

        if (result.affectedRows === 0)
            return res.status(404).json({ message: "Firma not found" });

        const [rows] = await pool.query("SELECT * FROM firmas WHERE id = ?", [id]);

        res.json(rows[0]);
    } catch (error) {
        return res.status(500).json({ message: "Something went wrong" });
    }
};
