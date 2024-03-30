import sequelize from '../models/connection.js';
import initModels from '../models/init-models.js';
import { responseApi } from '../config/response.js';
import bcrypt from 'bcrypt';
import { createToken, dataToken } from '../config/jwt.js';
const model = initModels(sequelize);
const login = async (req, res) => {
	try {
		let { email, password } = req.body;
		console.log(email, password);
		let checkEmail = await model.nguoi_dung.findOne({
			where: {
				email: email,
			},
		});
		console.log(checkEmail.dataValues.email);
		if (checkEmail) {
			// console.log(password, checkEmail.dataValues.mat_khau);
			if (bcrypt.compareSync(password, checkEmail.dataValues.mat_khau)) {
				console.log(
					bcrypt.compareSync(password, checkEmail.dataValues.mat_khau),
				);
				let token = createToken({
					userId: checkEmail.dataValues.nguoi_dung_id,
				});
				console.log(token);
				return responseApi(res, 200, token, 'login thành công !');
			} else {
				return responseApi(res, 400, '', 'Mật khẩu không đúng !');
			}
		}
		return responseApi(res, 400, '', 'Email không đúng !');
	} catch (error) {
		responseApi(res, 500, '', 'Lỗi ...');
	}
};

const signUp = async (req, res) => {
	let { email, matKhau, hoTen, tuoi } = req.body;
	let newUser = {
		email: email,
		mat_khau: bcrypt.hashSync(matKhau, 10),
		ho_ten: hoTen,
		tuoi: tuoi,
	};

	try {
		let checkEmail = await model.nguoi_dung.findOne({
			where: { email: email },
		});
		if (!checkEmail) {
			await model.nguoi_dung.create(newUser);
			responseApi(res, 200, newUser, 'dang ki thanh cong');
		} else {
			responseApi(res, 400, '', 'Email đã tồn tại');
		}
	} catch (error) {
		responseApi(res, 500, '', 'Lỗi ...');
	}
};
const getDataUserDetails = async (req, res) => {
	try {
		let { token } = req.headers;
		console.log(token);
		let decoded = dataToken(token);
		console.log(decoded);
		if (!decoded || !decoded.userId) {
			return responseApi(
				res,
				400,
				'',
				'Token không hợp lệ hoặc thiếu thông tin người dùng',
			);
		}
		let dataUserDetails = await model.nguoi_dung.findOne({
			where: {
				nguoi_dung_id: decoded.userId,
			},
		});
		responseApi(res, 200, dataUserDetails, 'get user success');
	} catch (error) {
		responseApi(res, 500, '', 'Lỗi');
	}
};

const getSavedImageByUserId = async (req, res) => {
	let { token } = req.headers;
	let decoded = dataToken(token);
	let userId;

	if (decoded && decoded.userId) {
		userId = decoded.userId;
		try {
			let dataImage = await model.luu_anh.findAll({
				where: {
					nguoi_dung_id: userId,
				},
			});
			console.log(dataImage);
			responseApi(res, 200, dataImage, 'get image by userId success');
		} catch (error) {
			responseApi(res, 500, '', 'Lỗi...');
		}
	} else {
		return responseApi(
			res,
			400,
			'',
			'Token không hợp lệ hoặc thiếu thông tin người dùng',
		);
	}
};

const getCreateImageByUserId = async (req, res) => {
	let { token } = req.headers;

	try {
		let decoded = dataToken(token);

		if (!decoded || !decoded.userId) {
			return responseApi(
				res,
				400,
				'',
				'Token không hợp lệ hoặc thiếu thông tin người dùng',
			);
		}
		let dataImage = await model.hinh_anh.findAll({
			where: {
				nguoi_dung_id: decoded.userId,
			},
		});

		responseApi(res, 200, dataImage, 'Danh sách ảnh đã tạo theo userId');
	} catch (error) {
		console.error('Lỗi:', error);
		responseApi(res, 500, '', 'Lỗi...');
	}
};

const deleteImageByImageId = async (req, res) => {
	let { imageId } = req.params;

	let { token } = req.headers;

	let decoded = dataToken(token);
	let userId;
	if (decoded && decoded.userId) {
		userId = decoded.userId;

		console.log(userId);
		try {
			let dataImage = await model.hinh_anh.findOne({
				where: {
					hinh_id: imageId,
				},
			});
			console.log(dataImage.dataValues.hinh_id);
			if (dataImage) {
				let data = await model.hinh_anh.destroy({
					where: {
						hinh_id: imageId,
					},
				});
				console.log(data);
				return responseApi(res, 200, data, 'delete image by userId success');
			} else {
				return responseApi(res, 404, '', 'not found image');
			}
		} catch (error) {
			return responseApi(res, 500, '', 'Lỗi...');
		}
	}
};
let updateInfoUser = async (req, res) => {
	let { token } = req.headers;
	let decode = dataToken(token);
	let nguoiDungId = decode.userId;

	let { email, hoTen, tuoi } = req.body;

	try {
		let findUser = await model.nguoi_dung.findOne({
			where: {
				nguoi_dung_id: nguoiDungId,
			},
		});

		if (findUser) {
			let newInfoUser = {
				email: email,
				// mat_khau: bcrypt.hashSync(matKhau, 10),
				ho_ten: hoTen,
				tuoi: tuoi,
			};
			let updatedUserData = await model.nguoi_dung.update(newInfoUser, {
				where: { nguoi_dung_id: nguoiDungId },
			});

			return responseApi(
				res,
				200,
				updatedUserData,
				'Cập nhật thông tin người dùng thành công',
			);
		}
	} catch (error) {
		responseApi(res, 500, '', 'Lỗi...');
	}
};
let getDataUser = async (req, res) => {
	try {
		let dataUser = await model.nguoi_dung.findAll();
		responseApi(res, 200, dataUser, 'get user success');
	} catch {
		responseApi(res, 500, '', 'Lỗi...');
	}
};
export {
	getSavedImageByUserId,
	login,
	getDataUser,
	signUp,
	getDataUserDetails,
	getCreateImageByUserId,
	deleteImageByImageId,
	updateInfoUser,
};
