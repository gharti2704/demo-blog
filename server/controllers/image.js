const { uploadFile } = require("./awsS3");
const { Image } = require("../postgres/index");
const sharp = require("sharp");
const path = require("path");
const fs = require("fs");
const util = require("util");
const unlinkImage = util.promisify(fs.unlink);

const compress = (file, filePath) => {
  return new Promise((resolve, reject) => {
    sharp(file)
      .jpeg({ quality: 80, chromaSubsampling: "4:4:4" })
      .toFile(filePath, (err, success) => {
        if (err) {
          reject("Unble to save file");
        }
        resolve(success);
      });
  });
};

const readImageFile = (imagePath) => {
  return new Promise((resolve, reject) => {
    fs.readFile(imagePath, async (err, newFile) => {
      if (err) {
        reject(err);
      }
      resolve(newFile);
    });
  });
};

module.exports.uploadImage = async (req, res, next) => {
  const { blogId } = req.params;
  const userId = req.id;

  let imagePath = path.join(__dirname, "../", "uploads", "image" + ".jpeg");
  const file = req.files.file;

  try {
    compress(file.data, imagePath)
      .then(async () => {
        return await readImageFile(imagePath);
      })
      .then(async (newFile) => {
        const result = await uploadFile(
          newFile,
          new Date().getTime() + ".jpeg"
        );

        Image.create({
          blogId: blogId,
          userId: userId,
          imageUrl: result.Location,
        });

        await unlinkImage(imagePath);
        res.status(201).json({ msg: "Image upload successful" });
      });
  } catch (err) {
    res.status(500).json({ msg: "Unble to upload image." });
  }
};
