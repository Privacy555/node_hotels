const jwt=require('jsonwebtoken');

const jwtAuthMiddleware=(req,res,next)=>{

    //first check request headers has authorization or not
    const authHeader= req.headers.authorization
   if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ error: "Token missing or incorrect format" });
}

    //extract the jwt token from the request headers
    const token= req.headers.authorization.split(' ')[1];                   //means token is after space from authorization header

    if(!token) return res.status(401).json({error:"unauthorized"});
    try{
        //verify that jwt token
        const decoded= jwt.verify(token,process.env.JWT_SECRET);
        
        //attach user information to the request object
        req.user= decoded;
        next();
    }catch(err){
        console.error(err);
        res.status(401).json({error:'Invalid token'});
    }
}

//function to generate JWT token
const generateToken=(userData)=>{
    //generate a new JWT token using userdata

    return jwt.sign(userData,process.env.JWT_SECRET,{expiresIn:30});                //token expires in 30 seconds
}


module.exports={jwtAuthMiddleware,generateToken};