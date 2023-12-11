export const validatePhoto = (req, res, next) => {
  if (req.mimeError) {
    return res.status(400).json({ message: req.mimeError });
  }
  if (req.file) {
    req.photo = req.file.filename;
  } else {
    req.photo = "defaultuserphoto.jpg";
  }
  next();
};
