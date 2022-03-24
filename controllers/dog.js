let dogDatabase = {};

const getDog = (name) => {
	return dogDatabase[name];
}

const addDog = (name, description, image) => {
	dogDatabase[name] = {
		description: description,
		image: image
	}
}

const editDog = (name, paramDatabase, edit) => {
	if ( paramDatabase == 'description' ) {
		dogDatabase[name].description = edit;
	} else if ( paramDatabase == 'image' ) {
		dogDatabase[name].image = edit
	}
}

const deleteDog = (name) => {
	for (dog in dogDatabase) {
		if (dog === name) {
			delete dogDatabase[dog]
		}
	}
}

exports.addDog = addDog;
exports.getDog = getDog;
exports.editDog = editDog;
exports.deleteDog = deleteDog;
