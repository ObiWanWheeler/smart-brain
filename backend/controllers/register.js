export const handleRegister = (req, res, db, bcrypt) => {
    const { email, name, password } = req.body;
    const hashedPass = bcrypt.hashSync(password);
    db.transaction(trx => 
        trx.into('login')
        .insert({
            hash: hashedPass,
            email: email
        })
        .returning('email')
        .then(loginEmail => 
            trx.into('users')
            .insert({
                name: name, 
                email: loginEmail[0], 
                joindate: new Date()
            }).returning('*')
            .then(user => {
                res.json(user[0])
            })
        )
        .then(trx.commit)
        .catch(trx.rollback)
    )
    .catch(err => {console.log(err); res.status(400).json('unable to register');})
};