import jwt from 'jsonwebtoken';
import { responseApi } from './response.js';

let createToken = (data) => {
	return jwt.sign(data, 'key_token', {
		algorithm: 'HS256',
		expiresIn: '10m',
	});
};
let checkToken = async (token) => {
	return jwt.verify.apply(token, 'key_token', (error, decode) => {
		return error;
	});
};
let dataToken = (token) => {
	return jwt.decode(token);
};
const midVerification = async (req, res, next) => {
	let token =
		req.headers['x-access-token'] ||
		req.body.token ||
		req.query.token ||
		req.cookies.token;
	if (token) {
		jwt.verify(token, 'key_token', (err, decoded) => {
			if (err) {
				return responseApi(res, 400, '', 'Token không hợp lệ');
			} else {
				req.decoded = decoded;
				next();
			}
		});
	} else {
		return responseApi(res, 400, '', 'Token không hợp lệ');
	}
};
const createTokenRef = async (data) => {
	return jwt.sign(data, 'key_token2', { algorithm: 'HS256', expiresIn: '10s' });
};
const checkTokenRef = async (token) => {
	return jwt.verify.apply(token, 'key_token2', (error, decode) => {
		return error;
	});
};
export {
	createToken,
	checkToken,
	dataToken,
	midVerification,
	createTokenRef,
	checkTokenRef,
};
