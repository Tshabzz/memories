import { Router } from "express";
import { getPosts } from "../controllers/posts.js";
import { createPost } from "../controllers/posts.js";

const router = Router();

router.get('/', getPosts);
router.post('/', createPost);


export default router