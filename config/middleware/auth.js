const jwt = require('jsonwebtoken');
const userM = require('../controllers/userCont');
const userRoleAssign = require('../controllers/userRoleCont');
const assignRolePermission = require('../controllers/assignRolePermCont')
module.exports = async (req, res, next) => {
    try {
        const token = req.headers.authorization.split(" ")[1];

        const decoded = jwt.verify(token, process.env.JWT_KEY);
        console.log("decoded");
        //console.log(decoded.userId);
        const user = await userM.getUser(decoded.userId);
        //console.log(user);
        if(!user){
            res.status(401).json({
                message: "logged-in user not valid"
            })
        }
        console.log("UserRole");
        const user_role = await userRoleAssign.getUserRole(decoded.userId);
        //console.log("is user",user_role);
        if(!user_role){
            res.status(401).json({
                message: " user-role not valid"
            })
        }

        //return res.status(201).json({
           // message: 'Auth success'
        //}),
        //const query = {};
       // query.userId = req.body.userId;
       /// const userId = await userRole.findOne(query.userId);
        //const userId = userRole.find({userId: req.body.userId})
        //console.log(userId); //log userId
        //if (!userId){
           // res.status(404).json({
               // message: "UserId not found"
           // })
         // }
         
        next();

    } catch (error) {
        return res.status(401).json({
            message: 'Auth failed'
        });
    }
}
