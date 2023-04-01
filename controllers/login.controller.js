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

export const login = async (req, res) => {
  try{
    const { email, password } = req.body
    if (email == null || password == null) {
      throw new Error("email or password can't be empty")
    }

    const infoUserLogin = await LoginService.login(email, password)

    res.status(200).json({
      name: infoUserLogin.name,
      email: infoUserLogin.email,
      token: infoUserLogin.token
    })

  } catch (err) {
    res.status(400).json({
      msg: err.toString()
    })
  }
}




