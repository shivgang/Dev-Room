const mongoose = require('mongoose');

const FollowSchema = new mongoose.Schema(
    {
        user : {
            type:  mongoose.Schema.Types.ObjectId,
            ref: "user",
            required: true,
        },
        following :[  { type: mongoose.Schema.Types.ObjectId, ref: "user" } ],
    },
    {timestamps : true}
);

const Follow = mongoose.model("follow", FollowSchema);
module.exports = Follow ; 
// reference through post.js




// you can also make following and follower separately