import Clarifai from 'clarifai';

const app = new Clarifai.App({
	apiKey: '3160b1eb71a7425b8b78e134bf56e940'
});

export const handleApiCall = async (req, res) => {
    try {
        const clarifaiResp = await app.models.predict(Clarifai.FACE_DETECT_MODEL, req.body.input);
        res.json(clarifaiResp);
    }
    catch (error) {
        console.log(error);
        res.status(400).json('unable to call API');
    }
};

export const handleImage = (req, res, db) => {
    const id  = req.body.id;
    db('users').where('id', '=', id).increment('entries', 1).returning('entries')
    .then(entries => {
        entries.length > 0 ? res.json(entries[0]) : res.status(400).json('unable to get entries');
    })
};

