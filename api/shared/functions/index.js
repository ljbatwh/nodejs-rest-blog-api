const path = require("path");
const fs = require("fs");
var dir = "./public";

const constructURL = function(request, filePath) {
  console.log(request.headers.host);

  return `${request.secure ? "https://" : "http://"}${
    request.headers.host
  }/${filePath}`;
};

const createDir = function(dirname) {
  let folderPath = path.join(dir, dirname);
  return new Promise((resolve, reject) => {
    try {
      if (!fs.existsSync(folderPath)) {
        fs.mkdirSync(folderPath);
        resolve(true);
      }
    } catch (error) {
      reject(error);
    }
  });
};

const removeDir = function(dirname) {
  let folderPath = path.join(dir, dirname);
  return new Promise((resolve, reject) => {
    try {
      if (fs.existsSync(folderPath)) {
        fs.rmdir(folderPath, err => {
          if (!err) {
            resolve(true);
          } else {
            reject(err);
          }
        });
        resolve(true);
      }
    } catch (error) {
      reject(error);
    }
  });
};

module.exports = {
  constructURL: constructURL,
  createDir: createDir,
  removeDir: removeDir
};
