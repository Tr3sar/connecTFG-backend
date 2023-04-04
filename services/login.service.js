import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt'
import UserModel from '../models/user.schema.js';


export const login = async (email, password) => {

  try{
    const user = await UserModel.findOne({email})
    
    const passwordCorrect = user === null
      ? false
      : await bcrypt.compare(password, user.password)

    if (!(user && passwordCorrect)) {
      
      throw new Error('Invalid user or password')
    }
    const userForToken = {
      id: user._id,
      email: user.email
    }

    const token = jwt.sign(
      userForToken,
      process.env.JWT_SECRET,
      {
        expiresIn: 60 * 60 * 24 * 7
      }
    )
    
    return {
      id:user._id,
      name: user.name,
      email: user.email,
      token: token
    }
  } catch (e) {
    throw new Error('Error signin in')
  }
}

