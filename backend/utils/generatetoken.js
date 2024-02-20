const jwt = require("jsonwebtoken");

const generateTokenAndSaveCookie =(userId,res)=>{
    const token = jwt.sign({userId}, process.env.JWT_SECRET,{
        expiresIn: '15d'
    })
    res.cookie("jwt",token,{
        maxAge : 15*24*60*60*1000, //ms
        httpOnly : true ,// prevent xss attack cross-site scripting attacks
        samesite : "strict", // CSRF attack cross-site request forgery attacks
        secure : process.env.NODE_ENV !== "development",
    })
}

const verifyToken = (token)=>{
    jwt.verify(token)
}

module.exports ={generateTokenAndSaveCookie}