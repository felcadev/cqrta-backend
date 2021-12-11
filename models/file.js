const { Schema, model } = require('mongoose');

const FileSchema = Schema({
    name: {
        type: String,
        required: true
    },
    path: {
        type: String,
    },
    user: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    shop: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'Shop'
    },
});


FileSchema.method('toJSON', function (){
    const { __v, ...object } = this.toObject();

    return object;

});

module.exports = model('File', FileSchema);