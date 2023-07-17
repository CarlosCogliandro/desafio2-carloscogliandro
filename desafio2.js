
let fs = require('fs');

// Le agregue este try...catch para solucionar el problema de creacion del archivo productos.txt y que lo inicie con los []
	try{
		let ArrayProd = `[]`;
		let archivo = fs.writeFileSync('./productos.txt', ArrayProd);
	} catch(error){
		console.log(error);
	}

class Contenedor {
	constructor(url) {
		this.url = url;
	};

	async getAll() {
		try {
			const prod = await fs.promises.readFile(this.url, 'utf-8')
			return JSON.parse(prod)
		} catch (error) {
			console.log('Tenemos un error ----->', error);
		}
	};

	async save(prod) {
		const data = await this.getAll();
		let newId;
		if (data.length == 0) {
			newId = 1;
		} else {
			newId = data[data.length - 1].id + 1;
		}
		const newProd = { ...prod, id: newId }
		data.push(newProd);
		try {
			await fs.promises.writeFile(this.url, JSON.stringify(data, null, 2), (e, contenido) =>{});
			return newProd;
		} catch (error) {
			console.log('Error al guardar un nuevo producto ----->', error);
		}
	};

	async getById(id) {
		const data = await this.getAll()
		try {
			const prod = data.find(prod => prod.id == id);
			if (prod == undefined) {
				console.log(`No existe el producto con id ${id}`);
			} else {
				console.log(`El producto con id ${id} es:`, prod);
				return prod;
			}
		} catch (error) {
			console.log('Error al mostrar producto ----->', error);
		}
	};

	async deleteById(id) {
		const data = await this.getAll()
		try {
			const prod = data.find(obj => obj.id == id)
			if (prod == undefined) {
				console.log(`No existe el objeto con id ${id}`)
			} else {
				const newProd = data.filter(obj => obj.id != id)
				await fs.promises.writeFile(this.url, JSON.stringify(newProd, null, 2), (e, contenido) =>{})
				console.log(`Se elimino el producto con id ${id}`, prod);
				return prod;
			}
		} catch (error) {
			console.log(`Error al borrar un producto por ID ${id} ----->`, error)
		}
	};

	async deleteAll() {
		const data = await this.getAll()
		try {
			const newProd = []
			await fs.promises.writeFile(this.url, JSON.stringify(newProd, null, 2), (e, contenido) =>{})
			console.log('Se borraron todos los productos')
			return data;
		} catch (error) {
			console.log('Error al vaciar ----->', error);
		}
	};
}


const productos = new Contenedor('./productos.txt');


function actions(){
	setTimeout(()=>{
		productos.save({ nombre: 'Heladera', precio: 15975, thumbnail: 'www.foto.com/foto' });
	}, 500)

	setTimeout(()=>{
		productos.save({ nombre: 'Lavarropas', precio: 3215, thumbnail: 'www.foto.com/foto' });
	}, 1000)

	setTimeout(()=>{
		productos.save({ nombre: 'Cocina', precio: 98560, thumbnail: 'www.foto.com/foto'});
	}, 1500)

	setTimeout(()=>{
		productos.save({ nombre: 'Pava Electrica', precio: 5690, thumbnail: 'www.foto.com/foto'});
	}, 2000)

	setTimeout(()=>{
		productos.save({ nombre: 'Tostadora', precio: 690, thumbnail: 'www.foto.com/foto'});
	}, 2000)

	// setTimeout(()=>{
	// 	productos.getAll();
	// }, 2500)

	// setTimeout(()=>{
	// 	productos.getById(2);
	// }, 3000)

	// setTimeout(()=>{
	// 	productos.deleteById(1);
	// }, 3500)

	// setTimeout(()=>{
	// 	productos.deleteAll();
	// }, 4000)

	// setTimeout(()=>{
	// 	productos.save({ nombre: 'ULTIMO PRODUCTO AGREGADO', precio: 32165, thumbnail: 'www.foto.com/foto'});
	// }, 4500)
}

actions();