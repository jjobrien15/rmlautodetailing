import jwt from "jsonwebtoken"

const verifyToken = (req, res, next) => {
    const token = req.headers.auth;
    if (!token) {
        res.json({message:"No token found plase login..."});
        redirect("/Login");
    } else {
        jwt.verify(token, process.env.ACCESS_TOKEN, (err) => {
            if (err){
                res.sendStatus(403);
            } 
            next();
        })
    }
}

export default verifyToken