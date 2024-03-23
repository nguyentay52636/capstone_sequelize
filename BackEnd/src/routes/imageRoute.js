import express from 'express';
import {
	checkSavedImage,
	getCommentByImage,
	getImage,
	getInfoImage,
	getUserByImage,
	saveComment,
	searchByName,
} from '../controllers/actionController.js';
let imageRouter = express.Router();
imageRouter.get('/get-list-image', getImage);
imageRouter.get('/search-by-name/:name', searchByName);
imageRouter.get('/get-image-details/:idImage', getInfoImage);
imageRouter.get('/get-user-by-image/:idImage', getUserByImage);
imageRouter.get('/get-comment-by-image/:idImage', getCommentByImage);
imageRouter.get('/get-save-image/:idImage', checkSavedImage);
imageRouter.post('/save-comment', saveComment);

export default imageRouter;
