const { Schema, model } = require('mongoose');

const ShopSchema = Schema({
    name: {
        type: String,
        required: true
    },
    img: {
        type: String,

    },
    user: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
});


ShopSchema.method('toJSON', function (){
    const { __v, ...object } = this.toObject();
    return object;

});

module.exports = model('Shop', ShopSchema);