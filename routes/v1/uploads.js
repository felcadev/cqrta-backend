const { Route } = require('express');
const { Router } = require('express');
const { putUpload } = require('../../controllers/v1/uploads');
const { validateToken } = require('../../middlewares/token-validator');
const fileUpload = require('express-fileupload');
const { check } = require('express-validator');
const { validateFields } = require('../../middlewares/fields-validator');


const router = Router();

router.use(fileUpload());

router.put('/:model/:id', 
[
    validateToken,
    check('id', 'El id tiene que ser valido').isMongoId(),
    validateFields
], putUpload);


module.exports = router;

