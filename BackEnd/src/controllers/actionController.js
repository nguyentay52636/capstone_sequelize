import initModels from '../models/init-models.js';
import { responseApi } from '../config/response.js';
import { Op } from 'sequelize';
import sequelize from '../models/connection.js';
import { dataToken } from '../config/jwt.js';
const model = initModels(sequelize);
let getImage = async (req, res) => {
	try {
		let data = await model.hinh_anh.findAll();
		responseApi(res, 200, data, 'get image success');
	} catch (error) {
		responseApi(res, 500, '', 'Lỗi...');
	}
};
let searchByName = async (req, res) => {
	let { name } = req.params;
	console.log(name);
	try {
		const images = await model.hinh_anh.findAll({
			where: {
				ten_hinh: {
					[Op.like]: `%${name}%`,
				},
			},
		});
		if (images.length === 0) {
			return responseApi(
				res,
				404,
				'',
				'Không tìm thấy hình ảnh nào với tên được cung cấp',
			);
		} else {
			return responseApi(res, 200, images, 'get image success');
		}
	} catch (error) {
		responseApi(res, 500, '', 'Lỗi...');
	}
};
let getInfoImage = async (req, res) => {
	let { idImage } = req.params;
	try {
		let dataDetail = await model.hinh_anh.findOne({
			where: {
				hinh_id: idImage,
			},
		});
		responseApi(res, 200, dataDetail, 'get info image success');
	} catch (error) {
		responseApi(res, 500, '', 'Lỗi...');
	}
};
let getUserByImage = async (req, res) => {
	let { idImage } = req.params;
	try {
		let dataUser = await model.hinh_anh.findOne({
			where: {
				hinh_id: idImage,
			},
		});
		if (dataUser) {
			await model.nguoi_dung.findAll({
				where: {
					nguoi_dung_id: dataUser.nguoi_dung_id,
				},
			});
		}
		responseApi(res, 500, dataUser, 'get data success!');
	} catch (error) {
		responseApi(res, 500, '', 'Lỗi...');
	}
};
let getCommentByImage = async (req, res) => {
	let { idImage } = req.params;
	try {
		let checkImageId = await model.hinh_anh.findOne({
			where: {
				hinh_id: idImage,
			},
		});
		if (checkImageId) {
			let dataComment = await model.binh_luan.findAll({
				where: {
					hinh_id: checkImageId.hinh_id,
				},
			});
			responseApi(res, 200, dataComment, 'get comment success');
		}
	} catch (error) {
		responseApi(res, 500, '', 'Lỗi...');
	}
};
let checkSavedImage = async (req, res) => {
	let { idImage } = req.params;
	try {
		const images = await model.luu_anh.findOne({
			where: {
				hinh_id: idImage,
			},
		});
		if (images) {
			responseApi(res, 200, null, 'Image saved');
		} else {
			responseApi(res, 404, null, 'Image not saved');
		}
	} catch (error) {
		responseApi(res, 500, '', 'Lỗi...');
	}
};
let saveComment = async (req, res) => {
	let { comment, idHinh } = req.body;
	let { token } = req.headers;
	let decode = dataToken(token);
	let getImageId = await model.hinh_anh.findOne({
		where: {
			hinh_id: idHinh,
		},
	});
	if (!getImageId) {
		return responseApi(res, 404, null, 'Image not found');
	}

	let newComment = {
		nguoi_dung_id: decode.userId,
		hinh_id: getImageId.hinh_id,
		noi_dung: comment,
		ngay_binh_luan: new Date(),
	};
	try {
		let createComment = await model.binh_luan.create(newComment);
		responseApi(res, 201, createComment, 'Comment saved successfully');
	} catch (error) {
		responseApi(res, 500, null, 'Internal server error');
	}
};
export {
	getImage,
	searchByName,
	getInfoImage,
	getUserByImage,
	getCommentByImage,
	checkSavedImage,
	saveComment,
};
