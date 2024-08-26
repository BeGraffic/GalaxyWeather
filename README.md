# Galaxy Weather

Galaxy Weather es una aplicación web que permite obtener la información meteorológica actual y la previsión del tiempo para varios días de cualquier localidad del mundo, haciendo uso de la API paga de [OpenWeatherMap](https://openweathermap.org/).

DEMO: (https://galaxy-weather.vercel.app/)

## Características

- Consultar la localidad y su estado meteorológico actual (soleado, nuboso, etc.).
- Mostrar la temperatura actual, máxima y mínima.
- Visualizar la presión atmosférica, humedad relativa, visibilidad e información del viento.
- Almacenar un listado de localidades consultadas para alternar entre ellas y mostrar su información meteorológica.

## Importante: Requisito de API de Pago

Para utilizar la funcionalidad de previsión del tiempo (forecast), es necesario adquirir una clave de API de pago en [OpenWeatherMap](https://openweathermap.org/price). La versión pública gratuita de la API de OpenWeather no incluye el acceso a las previsiones meteorológicas extendidas, lo que limita la funcionalidad de la aplicación a la información meteorológica actual.

## Tecnologías Utilizadas

- **Frontend**: Vue.js (con Vue CLI)
- **API**: [OpenWeatherMap](https://openweathermap.org/)
- **Estilos**: Tailwind CSS
- **Construcción y despliegue**: Vercel
- **Persistencia**: Local Storage

## Requisitos

- Node.js >= 14.x
- Vue CLI 4.x o superior

## Instalación y Ejecución en Local

1. **Clona el repositorio:**
git clone https://github.com/BeGraffic/GalaxyWeather.git

2.	Navega al directorio del proyecto:
cd GalaxyWeather


3.	Instala las dependencias:
Usando npm:
npm install

O usando yarn:
yarn install


4.	Configura las variables de entorno:
Crea un archivo .env en la raíz del proyecto con la siguiente variable:
VITE_WEATHER_API_KEY=tu_clave_de_api_de_pago_de_openweathermap
Asegúrate de reemplazar tu_clave_de_api_de_pago_de_openweathermap con tu clave real de API adquirida en OpenWeatherMap.


5.	Ejecuta la aplicación en modo de desarrollo:
npm run dev
O usando yarn:
yarn dev


6.	Abre la aplicación en tu navegador:
Por defecto estará disponible en http://localhost:5173.


Despliegue

Este proyecto está configurado para ser desplegado en Vercel.

1.	Configura las variables de entorno en Vercel:
En tu panel de Vercel, asegúrate de agregar la variable VUE_APP_WEATHER_API_KEY con tu clave de API de pago de OpenWeatherMap.
2.	Conecta el repositorio a Vercel:
Sigue los pasos para conectar el repositorio en Vercel y selecciona la rama main para el despliegue automático.
3.	Inicia el despliegue:
El proyecto debería desplegarse automáticamente cuando empujes a la rama main.



Git Flow

Este proyecto sigue el flujo de trabajo Git Flow:
	•	La rama principal es main, que contiene el código en producción.
	•	La rama develop es usada para la integración de las nuevas características.
	•	Las ramas feature/* se crean desde develop para desarrollar nuevas funcionalidades.
	•	Las ramas release/* se crean para preparar una nueva versión antes de ser lanzada a main.
	•	Las ramas hotfix/* se crean desde main para corregir errores en producción y luego se fusionan en main y develop.