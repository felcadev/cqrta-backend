const User = require('../models/user');
const bcrypt = require('bcryptjs');
const user = require('../models/user');

const getUsers = async (req, res) => {

    const users = await User.find({}, 'name email role google');


    res.json({
        ok: true,
        users
    });
}


const postUser = async (req, res) => {

    const { email, password } = req.body;

    try{

        const emailExists = await User.findOne({email});

        if(emailExists){
            return res.status(400).json({
                ok: false,
                msg: "Email ya registrado"
            });
        }

        const user = new User( req.body );

        const salt = bcrypt.genSaltSync();
        user.password = bcrypt.hashSync(password, salt);


        await user.save();

        return res.json({
            ok: true,
            user
        });

    }catch(error){
        return res.status(500).json({
            ok: false,
            msg: "Lo sentimos contactar al administrador..."
        })
    }

}


const updateUser = async (req, res) => {

    const uid = req.params.uid;

    try{

        let dbUser = await User.findById(uid);

        if(!dbUser){
            return res.status(404).json({
                ok: false,
                msg: "Usuario no encontrado"
            });
        }

        const {google, password, email, ...fields} = req.body;

        if(dbUser.email != email){
            const emailExists = User.find({ email });

            if(emailExists.exists){
                return res.status(409).json({
                    ok: false,
                    msg: "El email ya esta registrado"
                });
            }

        }

        fields.email = email;

        const updatedUser = await User.findByIdAndUpdate(uid, fields, { new: true} );

        return res.json({
            ok: true,
            msg: "Usuario actualizado",
            user: updatedUser
        });


    }catch(error){
        return res.status(500).json({
            ok: false,
            msg: "Lo sentimos contactar al administrador..."
        });
    }

}

const deleteUser = async (req, res) => {

    const uid = req.params.uid;

    try{

        const dbUser = await User.findById(uid);
        
        if(!dbUser){
            return res.status(404).json({
                ok: false,
                msg: "Usuario no encontrado"
            });
        }


        await user.findByIdAndDelete(uid);

        return res.json({
            ok: true,
            msg: "Usuario eliminado"
        });



    }catch(error){
        return res.status(500).json({
            ok: false,
            msg: "Lo sentimos contactar al administrador..."
        });
    }



} 



module.exports = {
    getUsers,
    postUser,
    updateUser,
    deleteUser
}