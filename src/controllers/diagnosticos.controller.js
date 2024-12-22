import { pool } from "../db.js";
import https from 'https'; // Cambiado de http a https para manejar URLs https

export const getDiagnosticos = async (req, res) => {
    try {
        const [rows] = await pool.query("SELECT * FROM diagnosticos");
        res.json(rows);
    } catch (error) {
        return res.status(500).json({ message: "Something went wrong" });
    }
};

export const getDiagnostico = async (req, res) => {
    try {
        const { id } = req.params;
        const [rows] = await pool.query("SELECT * FROM diagnosticos WHERE id = ?", [id]);

        if (rows.length <= 0) {
            return res.status(404).json({ message: "Dianostico not found" });
        }

        res.json(rows[0]);
    } catch (error) {
        return res.status(500).json({ message: "Something went wrong" });
    }
};

export const deleteDiagnosticos = async (req, res) => {
    try {
        const { id } = req.params;
        const [rows] = await pool.query("DELETE FROM diagnosticos WHERE id = ?", [id]);

        if (rows.affectedRows <= 0) {
            return res.status(404).json({ message: "Diagnostico not found" });
        }

        res.sendStatus(204);
    } catch (error) {
        return res.status(500).json({ message: "Something went wrong" });
    }
};


export const createDiagnostico = async (req, res) => {
    try {
        const { descripcion, codigo } = req.body;
        const [result] = await pool.query(
            "INSERT INTO diagnosticos (descripcion, codigo) VALUES (?, ?)",
            [descripcion, codigo]
        );

        res.status(201).json({ id: result.insertId, descripcion, codigo });
    } catch (error) {
        res.status(500).json({ message: "Something went wrong" });
    }
    
};

export const updateDiagnostico = async (req, res) => {
    try {
        const { id } = req.params;
        const { descripcion, codigo } = req.body;

        const [result] = await pool.query(
            "UPDATE referencias SET descripcion = IFNULL(?, descripcion), codigo = IFNULL(?, codigo) WHERE id = ?",
            [descripcion, codigo]
        );

        if (result.affectedRows === 0)
            return res.status(404).json({ message: "Codigo not found" });

        const [rows] = await pool.query("SELECT * FROM diagnosticos WHERE id = ?", [id]);

        res.json(rows[0]);
    } catch (error) {
        return res.status(500).json({ message: "Something went wrong" });
    }
};
