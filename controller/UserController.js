import prisma from "../DB/db.config.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

export const signUp = async (req, res) =>{
    try {
        const { username, password } = req.body;
        
        const existingUser = await prisma.user.findUnique({
            where: {username},
        })

        if(existingUser){
           return res.status(400).json({error : "username already exists "}) 
        }

        const saltRounds = 10;
        const passwordHash = await bcrypt.hash(password,saltRounds);

        const newUser = await prisma.user.create({
        data: {
            username,
            passwordHash,
        },
        });

        return res.status(201).json({ message: "User created successfully" });
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Internal server error" });
    }
};

// Login
export const login = async (req, res) => {
  try {
    const { username, password } = req.body;

    const user = await prisma.user.findUnique({
      where: { username },
    });

    if (!user) {
      return res.status(400).json({ error: "Invalid username or password" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.passwordHash);

    if (!isPasswordValid) {
      return res.status(400).json({ error: "Invalid username or password" });
    }

    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    const updatedUser = await prisma.user.update({
      where: { id: user.id },
      data: { userAuthToken: token },
    });

    return res.json(user.id);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

// export const updateUser = async (req ,res)=>{
//     const id = parseInt(req.params.id);


//     const user =await prisma.user.update({
//       where:{id},
//       data:req.body
//     })

//     return res.json({status : 200 , message : `${user.id} is updated `})
// }

export const getUser = async (req,res) =>{
    const users = await prisma.user.findMany({})

    return res.json({status : 200 , message : users})
}