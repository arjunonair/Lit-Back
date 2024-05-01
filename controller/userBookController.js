import prisma from "../DB/db.config.js";

export const createUserBook = async (req, res) => {
  try {
    const { userID, bookID, bookCategoryIds, ...otherData } = req.body;

    if (!userID || !bookID) {
      return res.status(400).json({ error: "userID and bookID are required" });
    }

    const newUserBook = await prisma.userBook.create({
      data: {
        userID,
        bookID,
        ...otherData,
        bookCategory: {
          connect: bookCategoryIds.map((id) => ({ id })),
        },
      },
    });

    return res.status(201).json({ userBook: newUserBook });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

export const updateUserBook = async (req, res) => {
  try {
    const { uid, bid } = req.params;
    const { bookCategoryIds, ...dataBody  } = req.body;

    const existingCategoryIds = await prisma.userBook.findUnique({
      where: { userID_bookID: { userID: uid, bookID: bid } },
      select: { bookCategory: { select: { id: true } } },
    }).then((userBook) => userBook?.bookCategory.map((category) => category.id) || []);

    const categoriesToDisconnect = existingCategoryIds.filter(
      (id) => !bookCategoryIds?.includes(id)
    );

    const updatedUserBook = await prisma.userBook.update({
      where: { userID_bookID: { userID: uid, bookID: bid } },
      data: {
        ...dataBody,
        bookCategory: {
          disconnect: categoriesToDisconnect.map((id) => ({ id })),
          connect: bookCategoryIds ? bookCategoryIds.map((id) => ({ id })) : undefined,
        },
      },
    });

    if (!updatedUserBook) {
      return res.status(404).json({ error: "UserBook not found" });
    }

    return res.json( "UserBook updated successfully" );
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal server error" });
  }
};


export const deleteUserBook = async (req, res) => {
  try {
    const { userID, bookID } = req.params;

    const deletedUserBook = await prisma.userBook.deleteMany({
      where: {
        userID,
        bookID,
      },
    });

    if (deletedUserBook.count === 0) {
      return res.status(404).json({ error: "UserBook not found" });
    }

    return res.json( "UserBook deleted successfully" );
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

export const getUserBooks = async (req, res) => {
  try {
    const { uid,bid } = req.params;

    const userBooks = await prisma.userBook.findUnique({
      where: {
        userID_bookID: {
          userID : uid,
          bookID : bid,
        },
      },
      include: {
        bookCategory: true, 
      },
    });

    return res.json( {userBooks} );
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal server error" });
  }
};