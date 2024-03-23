import express from 'express';
import {
	deleteImageByUserId,
	getCreateImageByUserId,
	getDataUser,
	getDataUserDetails,
	getSavedImageByUserId,
	login,
	signUp,
	updateInfoUser,
} from '../controllers/authController.js';
import multer from 'multer';
const authRoute = express.Router();
authRoute.post('/login', login);
authRoute.post('/signup', signUp);
authRoute.get('/get-data-user-details', getDataUserDetails);
authRoute.get('/get-data-user', getDataUser);
authRoute.get('/get-create-image-by-user', getCreateImageByUserId);
authRoute.get('/get-save-image-by-user', getSavedImageByUserId);
authRoute.delete('/delete-image-by-user/:imageId', deleteImageByUserId);
//handle  upload image
const storage = multer.diskStorage({
	destination: process.cwd() + '/public/img',
	filename: (req, file, callback) => {
		let newName = new Date().getTime() + '_' + file.originalname;
		callback(null, newName);
	},
});
let upload = multer({ storage: storage });
authRoute.post('/upload-image', upload.single('file'), async (req, res) => {
	let { file } = req;
	res.send(file);
});

authRoute.put('/update-info-user', updateInfoUser);
export default authRoute;
