const { validateFields } = require('../../middlewares/fields-validator');
const { check } = require('express-validator');
const { validateToken } = require('../../middlewares/token-validator');
const { Router } = require('express');
const { getAll } = require('../../controllers/v1/searches');

const router = Router();


router.get('/:searching', [
    validateToken
], getAll);



module.exports = router;