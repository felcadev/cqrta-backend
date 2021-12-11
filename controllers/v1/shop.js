const Shop = require('../../models/v1/shop');


const getShops = async (req, res) => {

    const shops = await Shop.find({})
                            .populate('user', 'name img');

    return res.json({
        ok: true,
        shops
    });
}

const postShop = async (req, res) => {

    const id  = req.id;
    const shop = new Shop({
        user: id,
        ...req.body
    });

    try{

        await shop.save();

        return res.json({
            ok: true,
            msg: 'Tienda agregada correctamente',
            shop
        });


    }catch(error){
        return res.status(500).json({
            ok: false,
            msg: "Ups algo salio mal, contacte al administrador..."
        });
    }

}

const updateShop = async (req, res) => {
    return res.json({
        ok: true,
        msg: 'Todo bien en update'
    });
}

const deleteShop = async (req, res) => {
    return res.json({
        ok: true,
        msg: 'Todo bien en delete'
    });
}


module.exports = {
    getShops,
    postShop,
    updateShop,
    deleteShop
}