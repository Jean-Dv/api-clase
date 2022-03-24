const request = require('supertest');
const app = require('../app').app;

describe('CRUD /api/v1/dog', () => {
	test('Obtener el nombre, la descripción y una imagen', async () => {
		const newDog = {
			name: 'Sirius',
			description: 'Perro de raza golden retriever',
			image: 'https://www.micachorro.net/wp-content/uploads/2018/02/Golden-Retriever-precio-y-cachorros.png'
		}
		const resPost = await request(app).post('/api/v1/dog').send(newDog);
		expect(resPost.statusCode).toBe(201);
		const resGet = await request(app)
			.get('/api/v1/dog/Sirius')
		console.log(resGet.body.description)
		expect(resGet.statusCode).toBe(200);
		expect(resGet.body.description).toContain(newDog.description);
		expect(resGet.body.image).toContain(newDog.image);
	});
	test('Editar la descripcion', async () => {
		const newDog = {
			name: 'Sirius',
			description: 'Perro de raza golden retriever',
			image: 'https://www.micachorro.net/wp-content/uploads/2018/02/Golden-Retriever-precio-y-cachorros.png'
		}
		const resPost = await request(app).post('/api/v1/dog').send(newDog);
		expect(resPost.statusCode).toBe(201);
		const description = 'Juansito me la pela';
		const resPatch = await request(app)
			.patch('/api/v1/dog/Sirius')
			.set('Accept', 'application/json')
			.send({ description: description })
		expect(resPatch.statusCode).toBe(200);
		const resGet = await request(app)
			.get('/api/v1/dog/Sirius')
		expect(resGet.statusCode).toBe(200);
		console.log(resGet.body)
		expect(resGet.body.description).toContain(description);
	});
	test('Eliminar un perro', async () => {
		const newDog = {
			name: 'Sirius',
			description: 'Perro de raza golden retriever',
			image: 'https://www.micachorro.net/wp-content/uploads/2018/02/Golden-Retriever-precio-y-cachorros.png'
		}
		const resPost = await request(app).post('/api/v1/dog').send(newDog);
		expect(resPost.statusCode).toBe(201);
		const resDelete = await request(app).delete('/api/v1/dog/Sirius');
		console.log(resDelete)
		expect(resDelete.statusCode).toBe(200);
		const resGet = await request(app)
			.get('/api/v1/dog/Sirius');
		expect(resGet.statusCode).toBe(400);
		expect(resGet.body.msg).toContain('No se encontro una pinga');
	})
})
