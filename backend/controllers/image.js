export const handleImage = (req, res, db) => {
    const id  = req.body.id;
    db('users').where('id', '=', id).increment('entries', 1).returning('entries')
    .then(entries => {
        entries.length > 0 ? res.json(entries[0]) : res.status(400).json('unable to get entries');
    })
};