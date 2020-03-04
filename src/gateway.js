const baseUrl = 'https://5e39d9d88d7e1300149cd70c.mockapi.io/api/v1/cookbook'

export const fetchRecipeList = () => {
	return fetch(baseUrl).then(response => response.json())
}

export const fetchRecipe = id => {
	return fetch(`${baseUrl}/${id}`).then(response => response.json())
}

export const createRecipe = newRecipe =>
	fetch(baseUrl, {
		method: 'POST',
		headers: {
			'Content-type': 'application/json; charset=UTF-8',
		},
		body: JSON.stringify(newRecipe),
	})

export const deleteRecipe = id => {
	return fetch(`${baseUrl}/${id}`, {
		method: 'DELETE',
	})
}

export const updateRecipe = (id, newRecipe) =>
	fetch(`${baseUrl}/${id}`, {
		method: 'PUT',
		body: JSON.stringify(newRecipe),
		headers: {
			'Content-type': 'application/json; charset=UTF-8',
		},
	})
