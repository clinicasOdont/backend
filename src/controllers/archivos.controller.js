import path from "path";
import fs from 'fs';

import cloudinary from 'cloudinary';
// import { createImagen } from "../controllers/imgbd.controller.js";

// Configurar Cloudinary con tus credenciales
cloudinary.v2.config({
    cloud_name: 'dniiiwih9', 
    api_key: '255452514566172', 
    api_secret: 'l0DQ9FwJCCMBmgdmvuE98mqrUDo'
});


export const uploadImage = (req, res) => {
    const { image, customName } = req.body; // Se recibe la imagen y el nombre personalizado

    if (!image) {
        return res.status(400).json({ error: 'No image provided' });
    }

    // Definir un nombre personalizado (si se proporciona) o usar uno por defecto
    const publicId = customName ? `${customName}` : `image-${Date.now()}`;

    // Subir la imagen a Cloudinary con el nombre personalizado
    cloudinary.v2.uploader.upload(image, { folder: 'odontogramas',public_id: publicId }, (error, result) => {
        if (error) {
            return res.status(500).json({ error: 'Error uploading the image' });
        }
        res.json({
            message: 'Image uploaded successfully',
            url: result.secure_url,
            public_id: result.public_id, // Retornar el ID público de la imagen
        });
    });
};
// export const uploadImage = async (req, res) => {
//     const { image, customName } = req.body;

//     if (!image) {
//         return res.status(400).json({ error: "No image provided" });
//     }

//     // Sanitizar y definir `publicId`
//     const sanitizedCustomName = customName ? customName.replace(/[^a-zA-Z0-9-_]/g, "_") : null;
//     const publicId = sanitizedCustomName || `image-${Date.now()}`;

//     try {
//         // Subir imagen a Cloudinary
//         const result = await cloudinary.v2.uploader.upload(image, {
//             folder: "odontogramas",
//             public_id: publicId,
//         });

//         // Crear los datos que necesitas enviar a `createImagen`
//         const imageData = {
//             message: "Image uploaded successfully",
//             url: result.secure_url,
//             public_id: result.public_id,
//             fecha: new Date(),
//         };

//         // Llama a `createImagen` directamente
//         await createImagen({ body: imageData });

//         // Responde al cliente
//         res.json({
//             message: "Image uploaded and saved successfully",
//             url: result.secure_url,
//             public_id: result.public_id,
//         });
//     } catch (error) {
//         res.status(500).json({
//             error: "Error uploading the image",
//             details: error.message,
//         });
//     }
// };


// Consultar imágenes en Cloudinary
export const listImages = async (req, res) => {
    const { folder = 'odontogramas', maxResults = 10 } = req.query;

    try {
        // Consultar imágenes en la carpeta especificada
        const result = await cloudinary.v2.api.resources({
            type: 'upload',
            prefix: folder, // Carpeta donde buscar imágenes
            max_results: maxResults,
        });

        res.json({
            message: 'Images fetched successfully',
            images: result.resources.map(image => ({
                url: image.secure_url,
                public_id: image.public_id,
                folder: image.folder,
            })),
        });
    } catch (error) {
        res.status(500).json({ error: 'Error fetching images' });
    }
};

// Obtener una imagen específica
export const getImage = async (req, res) => {
    const { publicId } = req.params;

    if (!publicId) {
        return res.status(400).json({ error: 'No publicId provided' });
    }

    try {
        const result = await cloudinary.v2.api.resource(publicId);
        res.json({
            message: 'Image fetched successfully',
            image: {
                url: result.secure_url,
                public_id: result.public_id,
                created_at: result.created_at,
            },
        });
    } catch (error) {
        console.error('Error fetching the image:', error);
        res.status(500).json({ error: 'Error fetching the image', details: error.message });
    }
};