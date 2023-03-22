const loginService = require('./login.service');

export const postLogin = async (req, res, next) => {
  try {
    const { username, password } = req.body;
    const result = await loginService.login(username, password);
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};
module.exports = loginController;



