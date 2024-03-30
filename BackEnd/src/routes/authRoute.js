import express from 'express';
import {
	deleteImageByImageId,
	getCreateImageByUserId,
	getDataUser,
	getDataUserDetails,
	getSavedImageByUserId,
	login,
	signUp,
	updateInfoUser,
} from '../controllers/authController.js';
import multer from 'multer';
import { responseApi } from '../config/response.js';
import hinh_anh from '../models/hinh_anh.js';
import nguoi_dung from '../models/nguoi_dung.js';
import { dataToken } from '../config/jwt.js';
const authRoute = express.Router();
authRoute.post('/login', login);
authRoute.post('/signup', signUp);
authRoute.get('/get-data-user-details', getDataUserDetails);
authRoute.get('/get-data-user', getDataUser);
authRoute.get('/get-create-image-by-user', getCreateImageByUserId);
authRoute.get('/get-save-image-by-user', getSavedImageByUserId);
authRoute.delete('/delete-image-by-user/:imageId', deleteImageByImageId);
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
	let { token } = req.headers;
	let decode = dataToken(token);
	let userId = decode.userId;

	try {
		if (!req.file) {
			return responseApi(res, 400, '', 'error ');
		} else {
			const imagePath = req.file.path;
			const newImage = await hinh_anh.create({
				nguoi_dung_id: userId,
				duong_dan: imagePath,
			});
			return responseApi(res, 200, newImage, 'save path image success');
		}
	} catch (error) {
		return responseApi(res, 500, 'save path image failed');
	}
});

authRoute.put('/update-info-user', updateInfoUser);
export default authRoute;
