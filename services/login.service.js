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
      token: token,
      user
    }
  } catch (e) {
    throw new Error('Error signin in')
  }
}

export const createUser = async function (name, surname, password, email, social_url, tfg_url, degree, description) {
  try {
      console.log("userprevio")
      const saltRounds = 10
      const passwordHash = await bcrypt.hash(password, saltRounds)
      console.log("user:")
      const user = new UserModel({
          name,
          surname,
          password: passwordHash,
          email,
          social_url,
          tfg_url,
          degree,
          description,
          groups: [],
          notifications: [],
          posts: [],
          rol: 'Alumno',
          status: 'connected'
      })

      return await user.save();
  } catch (e) {
      throw new Error('Error creating user')
  }
}
