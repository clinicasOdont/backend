import { pool } from "../db.js";
import https from "https"; // Cambiado de http a https para manejar URLs https

export const getPlanillas = async (req, res) => {
  try {
    const [rows] = await pool.query("SELECT '' AS `FECHA`, p.tipo_documento AS `TIPO DOC`, p.documento, p.nombre, p.genero AS `SEXO`, p.edad, e.motivo AS `DX`, e.procedimiento, '' AS `VALOR PROCEDIMIENTO`, '' AS `MEDIO DE PAGO`, e.hora AS `HORA DE ATENCION`, p.nacimiento, p.nacionalidad, '' AS `PAIS RESIDENCIA` FROM pacientes p JOIN evoluciones e ON p.documento = e.documento");
    res.json(rows);
  } catch (error) {
    return res.status(500).json({ message: "Something went wrong" });
  }
};

export const getPlanilla = async (req, res) => {
  try {
    const { id } = req.params;
    const [rows] = await pool.query("SELECT '' AS `FECHA`, p.tipo_documento AS `TIPO DOC`, p.documento, p.nombre, p.genero AS `SEXO`, p.edad, e.motivo AS `DX`, e.procedimiento, '' AS `VALOR PROCEDIMIENTO`, '' AS `MEDIO DE PAGO`, e.hora AS `HORA DE ATENCION`, p.nacimiento, p.nacionalidad, '' AS `PAIS RESIDENCIA` FROM pacientes p JOIN evoluciones e ON p.documento = e.documento WHERE documento = ?", [
      id,
    ]);

    if (rows.length <= 0) {
      return res.status(404).json({ message: "Historia not found" });
    }

    res.json(rows); // Devuelve todos los registros en 'rows'
  } catch (error) {
    return res.status(500).json({ message: "Something went wrong" });
  }
};


