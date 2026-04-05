const jwt = require("jsonwebtoken")
const isAuthenticat = async (req,res,next)=>{
try{
        let token = req.header("auth-token");
    if(!token){
        return res.json(
            {
                success:false,
                message:"please authenticat your self"
            }
        )
    }
    let decode = await jwt.verify(token,"RajDanish");
    req.user = decode
    next()
}catch(err){
    res.json(
        {
            success:false,
            message:"Invalid token please login again",
            error:err.message
        }
    )
}
}
module.exports = isAuthenticat;