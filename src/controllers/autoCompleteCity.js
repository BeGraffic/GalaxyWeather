import cityList from '@/assets/documents/city.list.json'

export const getAutocompleteText = async (city) => {
  // Normalizamos el nombre de la ciudad a minúsculas para hacer la búsqueda más robusta
  const normalizedCity = city.toLowerCase()

  // Filtramos las ciudades que comiencen con el nombre proporcionado
  const matchingCities = cityList
    .filter((item) => item.name.toLowerCase().startsWith(normalizedCity))
    .sort((a, b) => a.name.toLowerCase().localeCompare(b.name.toLowerCase())) // Ordenar alfabéticamente asegurando que ambas comparaciones sean en minúsculas

  // Retornamos las ciudades que coincidan y estén ordenadas
  return matchingCities
}
