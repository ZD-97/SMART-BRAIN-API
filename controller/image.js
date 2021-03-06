const Clarifai = require('clarifai');

const app = new Clarifai.App({
    apiKey: "2d291335631446b18b1c5d5230562a36",
  });
const handleApiCall = (req,res) => {
    app.models.predict(
        Clarifai.FACE_DETECT_MODEL, req.body.input )
        .then(data =>{
            res.json(data);
        })
        .catch( err => res.status(400).json('unable to work with API'))
}   


const handleImage = (req,res,knex) => {
    const {id} = req.body;
    knex('users').where('id','=',id)
    .increment('entries', 1)
    .returning('entries')
    .then(entries => {
        res.json(entries[0].entries);
    })
    .catch(err => res.status(400).json('unable to get entries'))
}

module.exports = {
    handleImage,
    handleApiCall
}