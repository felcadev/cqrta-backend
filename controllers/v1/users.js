const User = require('../../models/v1/user');
const bcrypt = require('bcryptjs');
const { generateToken } = require('../../helpers/jwt');

const getUsers = async (req, res) => {

    const skip = Number(req.query.skip) || 0;
    const limit = Number(req.query.limit) || 10;

    const [users, count] = await Promise.all([
        User.find({}, 'name email role google')
        .skip(skip)
        .limit(limit),
        User.count()
    ]);


    res.json({
        ok: true,
        users,
        count
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

        const token = await generateToken(user.id);

        return res.json({
            ok: true,
            user,
            token
        });

    }catch(error){
        return res.status(500).json({
            ok: false,
            msg: "Lo sentimos contactar al administrador..."
        })
    }

}


const updateUser = async (req, res) => {

    const id = req.params.id;

    try{

        let dbUser = await User.findById(id);

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

        const updatedUser = await User.findByIdAndUpdate(id, fields, { new: true} );

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

    const id = req.params.id;

    try{

        const dbUser = await User.findById(id);
        
        if(!dbUser){
            return res.status(404).json({
                ok: false,
                msg: "Usuario no encontrado"
            });
        }


        await User.findByIdAndDelete(id);

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