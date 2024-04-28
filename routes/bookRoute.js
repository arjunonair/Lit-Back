import { Router } from "express";
import { createBook, searchBooks } from "../controller/BookController.js";

const router = Router()

router.post( '/', createBook)
router.get('/search', searchBooks)

export default router;