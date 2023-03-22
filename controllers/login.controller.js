import * as LoginService from '../services/login.service.js'

export const postLogin = async (req, res, next) => {
  try {
    const { username, password } = req.body;
    const result = await LoginService.postLogin(username, password);
    res.status(200).json(result);
  } catch (error) {
    res.status(400).json({msg:error.toString()})
  }
};




