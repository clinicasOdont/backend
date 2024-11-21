
import { Router } from "express"; 
// const uploadImage = require('../controllers/archivos.controller.js');
import {
    uploadImage,
    listImages,
    getImage
  } from "../controllers/archivos.controller.js";


const router = Router();

// Ruta para subir imagen
//router.post('/subirOdontograma', uploadImage);

router.post('/subirOdontograma', uploadImage);
router.get('/odontogramas', listImages);
router.get('/odontogramas/:publicId', getImage);


//router.get("/subirOdontograma", listImages); // Listar imágenes
//router.get("/subirOdontograma/:publicId", getImage); // Obtener imagen específica

// module.exports = router;
export default router;



