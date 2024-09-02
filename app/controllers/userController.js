const User = require('../models/UserModel');

module.exports = {
    index: (req,res) => {
        User.find().lean().then((users)=>{
            res.render('usersView/usersData', {users: users});
        }).catch((err)=> {
            res.send(err);
        })
    }
}