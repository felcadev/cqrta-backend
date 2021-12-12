const { v4: uuidv4 } = require('uuid');
const { uploadFile } = require('../../helpers/s3-helper');
const File = require('../../models/v1/file');

const putUpload = async (req, res) => {

    const { model, id} = req.params;
    const userId  = req.id;

    const allowedModels = ['files'];
    if(! allowedModels.includes(model)){
        return res.status(400).json({
            ok: false,
            msg: 'Modelo no permitido'
        });
    }
    
    const dbFile = await File.findById(id);
    if(!dbFile){
        return res.status(404).json({
            ok: false,
            msg: "Registro de Archivo no encontrado"
        });
    }

    if(dbFile.user
        .toString() != userId){
        return res.status(401).json({
            ok: false,
            msg: "No es dueño de archivo"
        });
    }

    if (!req.files || Object.keys(req.files).length === 0) {
        return res.status(400).json({
            ok: false,
            msg: 'No se ha enviado archivo'
        });
    }

    try{
        const file = req.files.file;

        const splitName = file.name.split('.');
        const lastPosition = splitName.length - 1;
        const extensionName = splitName[lastPosition];
    
        const fileName = `${uuidv4()}.${extensionName}`;
    
        const filePath = `/uploads/${model}/${fileName}`;
    
        const response = await uploadFile(filePath, file.data);

        dbFile.path = fileName;
        await dbFile.save();
    
        return res.json({
            ok: true,
            msg: 'Se ha guardao el archivo correctamente',
        });
    }catch(error){
        return res.status(500).json({
            ok: false,
            msg: 'Ups un error, contacte al administrador...'
        });
    }

}


module.exports = {
    putUpload
}