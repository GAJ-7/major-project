const express = require("express");
const multer = require("multer");
const cors = require("cors");
const app = express();

app.use(cors({
    origin: ["http://localhost:3001"]
}))

const excelStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "uploadedFiles");
    },
    filename: (req, file, cb) => {
        console.log(`file:`, file);
        cb(null, `${Date.now()}-downloaded-${file.originalname}`);
    }
});
const excelFilter = (req, file, cb) => {
    if (file.mimetype.includes("excel") || file.mimetype.includes("spreadsheetml")) {
        cb(null, true);
      } else {
        cb("Please upload only excel file.", false);
      }     
}
const uploadExcel = multer({
    storage: excelStorage,
    fileFilter: excelFilter
})

app.get("/home", (req, res) => {
    console.log(`home_page`);
    res.status(200).json("home");
})

app.post("/uploadFile", uploadExcel.single('file'), (req, res) => {
    console.log(`file: `, req.body);
    res.status(200).json("uploaded")
})

app.listen(3000, () => {
    console.log(`server_running: http://localhost:3000`)
})