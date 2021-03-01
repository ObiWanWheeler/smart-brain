export const handleProfile = (req, res, db) => {
    const id  = req.params.id;
    db.select('*').from('users').where('id', id).then(user => {
        user.length > 0 ? res.json(user) : res.status(404).json('error retreiving user')
    });
}