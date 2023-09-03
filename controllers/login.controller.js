import * as LoginService from '../services/login.service.js'

export const login = async (req, res) => {
  try{
    const { email, password } = req.body
    if (email == null || password == null) {
      throw new Error("email or password can't be empty")
    }

    const infoUserLogin = await LoginService.login(email, password)

    res.status(200).json({
      id: infoUserLogin.id,
      name: infoUserLogin.name,
      email: infoUserLogin.email,
      token: infoUserLogin.token,
      user: infoUserLogin.user
    })

  } catch (err) {
    res.status(400).json({
      msg: err.toString()
    })
  }
  
}

export const createUser = async (req, res) => {
	try {
		const {
			name,
			surname,
			password,
			email,
			degree,
			description
		} = req.body

		let social_url = []
		let tfg_url = ''

		console.log("User")
		
		const user = await LoginService.createUser(name, surname, password, email, social_url, tfg_url, degree, description);
	
		
		res.status(200).json({
			user
		})



	} catch (err) {
		res.status(400).json({
			msg: err.toString()
		})
	}
}


