const express = require("express");
const router = express.Router();
const authenticate = require("../middlewares/authenticate");
const User = require("../models/User");

/*
    @usage : Get Only Followed People Posts
    @url : /api/following/
    @method : POST
    @access : PRIVATE
 */

router.post(
    "/",
    authenticate,
    async (request,response) => {

        try{
            const userId = request.body.user;
            const followingId = request.body.following;

            let user = await User.findOne({_id : userId});

            var following = user.following.includes(followingId);
           
            var option = following ? "$pull" : "$addToSet";
            // follow/unfolow 
            
            user = await User.findOneAndUpdate(
              { _id: userId },
              { [option]: { following: followingId } },
              { new: true }
            );
            // response.status(200).json({ msg: "Added Succesfully"  });
            response.status(200).json({ user : user  });
           
        }catch(error){
            response.status(500).json({ errors: [{ msg: request.body.user +" "+
            request.body.following + " " + error.message }] });
        }
        
    }
);

module.exports = router;
