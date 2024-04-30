import prisma from "../DB/db.config.js";

export const createUserBook = async (req,res)=>{
    try{
        const {userID,bookID, ...other} = req.body;

        if(!userID || !bookID){
            return res.status(400).json({error : "Incorrect UserID or BookID ..."})
        }

        const newUserBook = await prisma.userBook.create({
            data:{
                userID,
                bookID,
                ...other,
                startedDate: other.startedDate ? new Date(otherData.startedDate) : new Date(Date.now()),
            },
        })

        return res.status(200).json({message: "User Book created ...", data:newUserBook});
    }catch(err){
        console.error(err);
        return res.status(500).json({ error: "Internal server error" });
    }
}

export const updateUserBook = async (req, res) => {
    try {
      const { userID, bookID } = req.params;
      const dataBody = req.body;

      const updatedUserBook = await prisma.userBook.updateMany({
        where: {
          userID,
          bookID,
        },
        data: {
          ...dataBody
        },
      });
  
      if (updatedUserBook.count === 0) {
        return res.status(404).json({ error: "UserBook not found" });
      }
  
      return res.json({ message: "UserBook updated successfully" });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "Internal server error" });
    }
  };

  export const getUserBooks = async (req, res) => {
    try {
      const { userID } = req.params;

      const userBooks = await prisma.userBook.findMany({
        where: {
          userID,
        },
      });

      return res.json({ userBooks });
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

      return res.json({ message: "UserBook deleted successfully" });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "Internal server error" });
    }
  };
