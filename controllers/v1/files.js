const File = require('../../models/v1/file');


const getFiles = async (req, res) => {

    const files = await File.find({})
                            .populate('user', 'name img')
                            .populate('shop', 'name');

    return res.json({
        ok: true,
        files
    });
}

const postFiles = async (req, res) => {

    const id = req.id;

    //TODO: upload file and save it in mongodb

    const file = new File({
        user: id,
        shop: req.body.shop_id,
        ...req.body
    });


    try{

        await file.save();

        return res.json({
            ok: true,
            msg: "Archivo guardado correctamente",
            file
        });


    }catch(error){
        return res.status(500).json({
            ok: false,
            msg: "Ups algo salio mal, contactar al administrador..."
        });
    }

}

const updateFiles = async (req, res) => {
    return res.json({
        ok: true,
        msg: 'Todo bien en update'
    });
}

const deleteFiles = async (req, res) => {
    return res.json({
        ok: true,
        msg: 'Todo bien en delete'
    });
}


module.exports = {
    getFiles,
    postFiles,
    updateFiles,
    deleteFiles
}