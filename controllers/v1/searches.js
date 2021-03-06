const  User  = require('../../models/v1/user');
const  Shop  = require('../../models/v1/shop');



const getAll = async (req, res) => {

    const searching = req.params.searching;
    const regExp = new RegExp(searching, 'i');

    const [users, shops] = await Promise.all([
        User.find({name : regExp}),
        Shop.find({name : regExp})
    ]);

    return res.json({
        ok: true,
        users,
        shops
    });



}

module.exports = {
    getAll
}