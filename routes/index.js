exports.index = function(req, res){
    console.log('GET /api');
    res.render('index', {});
};

exports.users = function(req, res){
    console.log('GET /api/users');

    User.find(function(err, users) {
        if (err)
            res.send(err);
        res.json(users);
    });
};

exports.addUser = function(req, res){
    console.log('POST /api/users');

    var user = new User();      // create a new instance of the User model
    user.name = req.body.name;  // set the user's name (comes from the request)

    // save the user and check for errors
    user.save(function(err) {
        if (err)
            res.send(err);
        res.json({ message: 'User created!', data: user });
    });

};

exports.user = function(req, res) {
    console.log('GET /api/users/:user_id');
    User.findById(
        req.params.user_id,
        function(err, user) {
            if (err)
                res.send(err);
            res.json(user);
        }
    );
};

exports.updateUser = function(req, res) {
    console.log('PUT /api/users/:user_id');

    User.findById(
        req.params.user_id,
        function(err, user) {
            if (err)
                res.send(err);
            user.name = req.body.name;  // update the users info

            // save the user
            user.save(function(err) {
                if (err){
                    res.send(err);
                }
                res.json({ message: 'User updated!', data: user });
            });
        }
    );
};

exports.deleteUser = function(req, res) {
    console.log('DELETE /api/users/:user_id');

    User.remove(
        {_id: req.params.user_id},
        function(err, user) {
            if(err)
                res.send(err);

            res.json({message: 'User deleted!! :o', id:req.params.user_id});
        }
    );
};