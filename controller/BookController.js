import prisma from "../DB/db.config.js";
import { Prisma } from "@prisma/client";

// Create a new book
export const createBook = async (req, res) => {
  try {
    const { englishTitle, bookID, authors, publisher } = req.body;

    // Create the book
    const newBook = await prisma.book.create({
      data: {
        englishTitle,
        bookID,
        authors,
        publisher,
      },
    });

    return res.status(201).json({ message: "Book created successfully", book: newBook });
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      // Handle specific Prisma error cases
      if (error.code === "P2002") {
        return res.status(409).json({ error: "Unique constraint violation" });
      }
    }
    console.error(error);
    return res.status(500).json({ error: "Internal server error" });
  }
};
// Search for books
export const searchBooks = async (req, res) => {
  try {
    const { englishTitle, bookID, authors, publisher } = req.query;

    // Build the search query
    const where = {};

    if (englishTitle) {
      where.englishTitle = { contains: englishTitle, mode: "insensitive" };
    }
    
    if (bookID){
        where.bookID = { contains: bookID, mode: "insensitive" };
    }

    if (authors) {
      where.authors = { contains: authors, mode: "insensitive" };
    }

    if (publisher) {
      where.publisher = { contains: publisher, mode: "insensitive" };
    }

    // Execute the search query
    const books = await prisma.book.findMany({
      where,
      select: {
        id: true,
        englishTitle: true,
        romanizedTitle: true,
        publicRating: true,
        Description: true,
        coverUrl: true,
        chapters: true,
        genres: true,
        ratingCount: true,
        authors: true,
        firstPublished: true,
      },
    });

    return res.json({ books });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal server error" });
  }
};