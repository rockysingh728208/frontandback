
// ye middleware isliye hai ki token lega aaur convert kar dega user ke id me and userid ke help se hm add,remove ,get data from cart 

import jwt from "jsonwebtoken"
const authMiddleware=async(req, res,next)=>{
    
const {token}=req.headers;
if(!token){
    return res.json({succees:false,message:"Not Authorized login again"})
}

try {
    const token_decode = jwt.verify(token,process.env.JWT_SECRET);
    req.body.userId=token_decode.id;
    next();
} catch (error) {
    console.log(error);
    res.json({success:false,message:"Error"})
}
}
export default authMiddleware;