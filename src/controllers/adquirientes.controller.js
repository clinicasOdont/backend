import { pool } from "../db.js";
import https from 'https'; // Cambiado de http a https para manejar URLs https

export const getAdquirientes = async (req, res) => {
    try {
        const [rows] = await pool.query("SELECT * FROM pacientes");
        res.json(rows);
    } catch (error) {
        return res.status(500).json({ message: "Something went wrong" });
    }
};

export const getAdquiriente = async (req, res) => {
    try {
        const { id } = req.params;
        const [rows] = await pool.query("SELECT * FROM pacientes WHERE id = ?", [id]);

        if (rows.length <= 0) {
            return res.status(404).json({ message: "Adquiriente not found" });
        }

        res.json(rows[0]);
    } catch (error) {
        return res.status(500).json({ message: "Something went wrong" });
    }
};

export const deleteAdquirientes = async (req, res) => {
    try {
        const { id } = req.params;
        const [rows] = await pool.query("DELETE FROM pacientes WHERE id = ?", [id]);

        if (rows.affectedRows <= 0) {
            return res.status(404).json({ message: "Adquiriente not found" });
        }

        res.sendStatus(204);
    } catch (error) {
        return res.status(500).json({ message: "Something went wrong" });
    }
};


export const createAdquiriente = async (req, res) => {
    try {
        const { documento, tipo_documento, nombre, correo, direccion ,accidentes,alergias,alertamedica,anestesia,antecedentes_familiares,cabeza,	cardiovasculares,	cedula_acompanante,	ciudad,	departamento,	descripcion_antecedentes,	direccion_responsable,	documento_responsable,	edad,	endocrinos,	eps,	eps_responsable,	estado_civil,	genero,	hematopoyeticos,	hospitalizacion,	infectocontagiosas,	inmunizaciones,	inmunologicos,	medicacion_actual,	medicamento,	nacimiento,	nacionalidad,	neurologicos,	nombre_acompanante,	nombres_responsable,	ocupacion,	otro,	parantesco_acompanante,	parentesco_responsable,	piel,	psicologicos,	quirurgicos,	sangre,	telefono_acompanante,	telefono_responsable,	tel_paciente,	tipo_documento_responsable,	tipovinculacion,	transfuciones, respiratorios, fecha, fecha_registro } = req.body;
        const [result] = await pool.query(
            "INSERT INTO pacientes (documento, tipo_documento, nombre, correo, direccion ,accidentes,alergias,alertamedica,anestesia,antecedentes_familiares,cabeza,	cardiovasculares,	cedula_acompanante,	ciudad,	departamento,	descripcion_antecedentes,	direccion_responsable,	documento_responsable,	edad,	endocrinos,	eps,	eps_responsable,	estado_civil,	genero,	hematopoyeticos,	hospitalizacion,	infectocontagiosas,	inmunizaciones,	inmunologicos,	medicacion_actual,	medicamento,	nacimiento,	nacionalidad,	neurologicos,	nombre_acompanante,	nombres_responsable,	ocupacion,	otro,	parantesco_acompanante,	parentesco_responsable,	piel,	psicologicos,	quirurgicos,	sangre,	telefono_acompanante,	telefono_responsable,	tel_paciente,	tipo_documento_responsable,	tipovinculacion,	transfuciones, respiratorios,	fecha, fecha_registro) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
            [documento, tipo_documento, nombre, correo, direccion ,accidentes,alergias,alertamedica,anestesia,antecedentes_familiares,cabeza,	cardiovasculares,	cedula_acompanante,	ciudad,	departamento,	descripcion_antecedentes,	direccion_responsable,	documento_responsable,	edad,	endocrinos,	eps,	eps_responsable,	estado_civil,	genero,	hematopoyeticos,	hospitalizacion,	infectocontagiosas,	inmunizaciones,	inmunologicos,	medicacion_actual,	medicamento,	nacimiento,	nacionalidad,	neurologicos,	nombre_acompanante,	nombres_responsable,	ocupacion,	otro,	parantesco_acompanante,	parentesco_responsable,	piel,	psicologicos,	quirurgicos,	sangre,	telefono_acompanante,	telefono_responsable,	tel_paciente,	tipo_documento_responsable,	tipovinculacion,	transfuciones, respiratorios,	fecha, fecha_registro]
        );

        res.status(201).json({ id: result.insertId, documento, tipo_documento, nombre, correo, direccion ,accidentes,alergias,alertamedica,anestesia,antecedentes_familiares,cabeza,	cardiovasculares,	cedula_acompanante,	ciudad,	departamento,	descripcion_antecedentes,	direccion_responsable,	documento_responsable,	edad,	endocrinos,	eps,	eps_responsable,	estado_civil,	genero,	hematopoyeticos,	hospitalizacion,	infectocontagiosas,	inmunizaciones,	inmunologicos,	medicacion_actual,	medicamento,	nacimiento,	nacionalidad,	neurologicos,	nombre_acompanante,	nombres_responsable,	ocupacion,	otro,	parantesco_acompanante,	parentesco_responsable,	piel,	psicologicos,	quirurgicos,	sangre,	telefono_acompanante,	telefono_responsable,	tel_paciente,	tipo_documento_responsable,	tipovinculacion,transfuciones, respiratorios, fecha });
    } catch (error) {
        res.status(500).json({ message: "Something went wrong" });
    }
};

export const updateAdquiriente = async (req, res) => {
    try {
        const { id } = req.params;
        const { documento, tipo_documento, nombre, correo, direccion ,accidentes,alergias,alertamedica,anestesia,antecedentes_familiares,cabeza,	cardiovasculares,	cedula_acompanante,	ciudad,	departamento,	descripcion_antecedentes,	direccion_responsable,	documento_responsable,	edad,	endocrinos,	eps,	eps_responsable,	estado_civil,	genero,	hematopoyeticos,	hospitalizacion,	infectocontagiosas,	inmunizaciones,	inmunologicos,	medicacion_actual,	medicamento,	nacimiento,	nacionalidad,	neurologicos,	nombre_acompanante,	nombres_responsable,	ocupacion,	otro,	parantesco_acompanante,	parentesco_responsable,	piel,	psicologicos,	quirurgicos,	sangre,	telefono_acompanante,	telefono_responsable,	tel_paciente,	tipo_documento_responsable,	tipovinculacion,	transfuciones, respiratorios,	fecha, fecha_registro } = req.body;

        const [result] = await pool.query(
            "UPDATE pacientes SET documento = IFNULL(?, documento),	 tipo_documento=IFNULL(?, tipo_documento),	 nombre=IFNULL(?, nombre),	 correo=IFNULL(?, correo),	 direccion =IFNULL(?, direccion ),	accidentes=IFNULL(?,accidentes),	alergias=IFNULL(?,alergias),	alertamedica=IFNULL(?,alertamedica),	anestesia=IFNULL(?,anestesia),	antecedentes_familiares=IFNULL(?,antecedentes_familiares),	cabeza=IFNULL(?,cabeza),	 cardiovasculares=IFNULL(?, cardiovasculares),	cedula_acompanante=IFNULL(?, cedula_acompanante),	 ciudad=IFNULL(?, ciudad),	 departamento=IFNULL(?, departamento), descripcion_antecedentes=IFNULL(?, descripcion_antecedentes),direccion_responsable=IFNULL(?, direccion_responsable),	documento_responsable=IFNULL(?, documento_responsable),	edad=IFNULL(?, edad), endocrinos=IFNULL(?, endocrinos),	 eps=IFNULL(?, eps), eps_responsable=IFNULL(?, eps_responsable), estado_civil=IFNULL(?, estado_civil),genero=IFNULL(?, genero),	 hematopoyeticos=IFNULL(?, hematopoyeticos),hospitalizacion=IFNULL(?, hospitalizacion),	infectocontagiosas=IFNULL(?, infectocontagiosas),	inmunizaciones=IFNULL(?, inmunizaciones),	 inmunologicos=IFNULL(?, inmunologicos),	medicacion_actual=IFNULL(?, medicacion_actual),	 medicamento=IFNULL(?, medicamento), nacimiento=IFNULL(?, nacimiento),	 nacionalidad=IFNULL(?, nacionalidad),	neurologicos=IFNULL(?, neurologicos),nombre_acompanante=IFNULL(?, nombre_acompanante),	 nombres_responsable=IFNULL(?, nombres_responsable),ocupacion=IFNULL(?, ocupacion),	otro=IFNULL(?, otro),parantesco_acompanante=IFNULL(?, parantesco_acompanante),	parentesco_responsable=IFNULL(?, parentesco_responsable),	 piel=IFNULL(?, piel),	psicologicos=IFNULL(?, psicologicos),quirurgicos=IFNULL(?, quirurgicos),sangre=IFNULL(?, sangre),	 telefono_acompanante=IFNULL(?, telefono_acompanante),telefono_responsable=IFNULL(?, telefono_responsable),	tel_paciente=IFNULL(?, tel_paciente),tipo_documento_responsable=IFNULL(?, tipo_documento_responsable),	 tipovinculacion=IFNULL(?, tipovinculacion),transfuciones=IFNULL(?, transfuciones), respiratorios=IFNULL(?, respiratorios),	fecha=IFNULL(?, fecha),	fecha_registro=IFNULL(?, fecha_registro)  WHERE id = ?",
            [documento, tipo_documento, nombre, correo, direccion ,accidentes,alergias,alertamedica,anestesia,antecedentes_familiares,cabeza,	cardiovasculares,	cedula_acompanante,	ciudad,	departamento,	descripcion_antecedentes,	direccion_responsable,	documento_responsable,	edad,	endocrinos,	eps,	eps_responsable,	estado_civil,	genero,	hematopoyeticos,	hospitalizacion,	infectocontagiosas,	inmunizaciones,	inmunologicos,	medicacion_actual,	medicamento,	nacimiento,	nacionalidad,	neurologicos,	nombre_acompanante,	nombres_responsable,	ocupacion,	otro,	parantesco_acompanante,	parentesco_responsable,	piel,	psicologicos,	quirurgicos,	sangre,	telefono_acompanante,	telefono_responsable,	tel_paciente,	tipo_documento_responsable,	tipovinculacion,	transfuciones,	respiratorios, fecha, fecha_registro, id]
        );

        if (result.affectedRows === 0)
            return res.status(404).json({ message: "Adquiriente not found" });

        const [rows] = await pool.query("SELECT * FROM pacientes WHERE id = ?", [id]);

        res.json(rows[0]);
    } catch (error) {
        return res.status(500).json({ message: "Something went wrong" });
    }
};
