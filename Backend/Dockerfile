#STAGE 1
# Iniciamos un stage para hacer la build del frontend
# Usamos una imagen base oficial
FROM node:20 as build-stage
# Establecemos el directorio de trabajo para el front
WORKDIR /app/frontend
# Copiamos el package.json y el package-lock.json del frontend
COPY ./Frontend/package*.json /app/frontend/
# Instalamos dependencias
RUN npm install
# Copiamos el resto de ficheros del frontend
COPY ./Frontend .
# Hacemos el build
RUN npm run build


#STAGE 2
# Iniciamos un stage para copiar los archivos static del front 
# y crear la imagen del back con ellos
# usamos una imagen base oficial
FROM node:20 as production-stage
# Establecemos el directorio para el backend
WORKDIR /app/backend
# copiamos el package.json y package-lock.json del backend
COPY ./Backend/package*.json /app/backend/
# Instalamos dependencias del backend
RUN npm install
# Copiamos el resto de archivos del backend
COPY ./Backend /app/backend/
# Copiamos el resultado de la build del frontend a la carpeta del backend
COPY --from=build-stage /app/frontend/dist /app/backend/dist
# Exponemos el puerto
EXPOSE 8080
# Iniciamos el servidor
CMD ["npm", "start"]
