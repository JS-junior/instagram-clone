require('dotenv').config()
const jwt = require('jsonwebtoken')

module.exports = (req,res,next)=>{
	const token = req.headers.authorization.split(" ")[1]
	const user = jwt.verify(token, process.env.JWT_KEY)

	req.user = user
	next()
}

