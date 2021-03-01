export const handleRoot = (req, res, db) => {
    db.select('*').from('users').then(users => res.json(users));
};