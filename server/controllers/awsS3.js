const S3 = require("aws-sdk/clients/s3");
const aws = require("aws-sdk");
const bucketName = process.env.DO_SPACES_NAME;
const accessKeyId = process.env.DO_SPACES_ACCESS_KEY;
const secretAccessKey = process.env.DO_SPACES_SECRET_KEY;

const spacesEndpoint = new aws.Endpoint("nyc3.digitaloceanspaces.com");

const s3 = new S3({
  accessKeyId,
  secretAccessKey,
  endpoint: spacesEndpoint,
});

// uploads a file to s3
module.exports.uploadFile = (file, key) => {
  const uploadParams = {
    Bucket: bucketName,
    Body: file,
    Key: key.toString(),
    ACL: "public-read",
  };

  return s3.upload(uploadParams).promise();
};
