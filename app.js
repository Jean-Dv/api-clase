const express = require('express');
const dogController = require('./controllers/dog')
const app = express();
const port = 3000;

app.use(express.json())
app.use(express.urlencoded({ extended:false }))

app.get('/', (req, res) => {
	res.status(200).send('Hello World!');
})

function isObjEmpty(obj) {
	for (var prop in obj) {
		if (obj.hasOwnProperty(prop)) return false
	}
	return true
}

app.post('/api/v1/dog', (req, res) => {
	const { name, description, image } = req.body;
	dogController.addDog(name, description, image);
	res.status(201).json({ok: true, msg: 'Se agrego bien esta chimbada'});
})

app.get('/api/v1/dog/:name', (req, res) => {
	const { name } = req.params;
	const getDog = dogController.getDog(name)
	if (isObjEmpty(getDog)) {
		res.status(400).json({msg: 'No se encontro una pinga'})
	}
	res.status(200).json(getDog)
})

app.patch('/api/v1/dog/:name', (req, res) => {
	let response;
	if (req.body.description) {
		response = dogController.editDog(req.params.name, 'description', req.body.description);
	} else if ( req.body.image ) {
		response = dogController.editDog(req.params.name, 'image', req.body.image)
	}
	res.status(200).json(response)
})

app.delete('/api/v1/dog/:name', (req, res) => {
	const { name} = req.params;
	dogController.deleteDog(name)
	res.status(200).json({ok:true, msg: 'Se elimino esta mrda correctamente'})
})

app.listen(port, () => {
	console.log(`[*]Server listening in port ${port}`)
})

exports.app = app;
