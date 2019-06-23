const multer = require('multer'); // multer est utilisé pour l'upload, le stockage, le download et la sauvegarde des images

const MIME_TYPE_MAP = {
  'image/png': 'png',
  'image/jpeg': 'jpg',
  'image/jpg': 'jpg'
}
const storage = multer.diskStorage({
  destination: (req, file, cb) => { // cb = callback
    const isValid = MIME_TYPE_MAP[file.mimetype];
    let error = new Error("Invalid mime type");
    if (isValid) {
      error = null;
    }
    cb(error, "backend/images"); // créer le dossier images dans le dossier backend pour que le code fonctionne
  },
  filename: (req, file, cb) => {
    const name = file.originalname.toLowerCase().split(' ').join('-');
    const ext = MIME_TYPE_MAP[file.mimetype];
    cb(null, name + '-' + Date.now() + '.' + ext);
  }
});

module.exports = multer({ storage: storage }).single("image");
