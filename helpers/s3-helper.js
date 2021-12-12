const AWS = require('aws-sdk');

const getS3 = () =>{
    return new AWS.S3({
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
    });
}

const genericParamsS3 = {
    Bucket: process.env.AWS_BUCKET_NAME,
}

const uploadFile = (fileName, fileContent) => {

    const s3 = getS3();

    const params = {
        ...genericParamsS3,
        CreateBucketConfiguration: {
            // Set your region here
            LocationConstraint: "sa-east-1"
        },
        Key: fileName,
        Body: fileContent
    }

    return new Promise((resolve, reject) => {
        s3.upload(params, (err, data) => {
            if (err) {
              reject(err)
            }
            resolve(data.Location)
        });
    })
}

const getTemporalUrl = (fileName) => {
    const s3 = getS3();

    const signedUrlExpireSeconds = 60 * 5;

    return s3.getSignedUrlPromise('getObject', {
        ...genericParamsS3,
        Key: fileName,
        Expires: signedUrlExpireSeconds
    });
}

module.exports = {
    uploadFile,
    getTemporalUrl
}