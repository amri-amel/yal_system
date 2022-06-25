import path from 'path'
import fs from 'fs'
import multer from 'multer'

const localStorage = multer.diskStorage({
  destination: function (req, file, callback) {
    const uploadFolder = path.join(__dirname, '..', '..', '..', 'uploads')
    if (!fs.existsSync(uploadFolder)) {
      fs.mkdirSync(uploadFolder)
    }
    callback(null, uploadFolder)
  },
  filename: function (req, file, cb) {
    const path = file.fieldname + '-' + Date.now() + '.' + file.originalname.split('.')[file.originalname.split('.').length - 1]
    cb(null, path)
  }
})

const upload = multer({ storage: localStorage })

export const courseUpload = upload.single('cover')

export const courseResource = upload.single('chapitre');
 
  //export const photosUpload = upload.array('photos', 12);