const { Router } = require('express');
const { getShops, postShop, updateShop, deleteShop  } = require('../../controllers/v1/shop');
const { check } = require('express-validator');
const { validateFields } = require('../../middlewares/fields-validator');
const { validateToken } = require('../../middlewares/token-validator');


const router = Router();

router.get('/', [validateToken], getShops);

router.post('/', [
    validateToken,
    check('name', 'El nombre es requerido').not().isEmpty(),
    validateFields
], postShop);

router.put('/:uid',
[
    validateToken,
], updateShop);

router.delete('/:uid', [validateToken], deleteShop);


module.exports = router;