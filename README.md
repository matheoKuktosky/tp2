# TP FINAL - TP2 - Red social videojuegos

El proyecto sera una red social para que los usuarios puedan formar grupos de juego. Asi cuando quiera jugar algo que se requiera un minimo de 4 personas pueda buscar un grupo para tal.

## Entidades

- Usuario
- Publicacion
- Categoria
- PublicacionesXUsuarios
- PubliacionesxPostulantes
- PublicacionesXCategorias

# API endpoints

## Usuarios

| REST   | URL        |                                 |
| ------ | ---------- | ------------------------------- |
| GET    | /users     | Trae a todos los usuarios       |
| GET    | /users/:id | Trae un usuario específico      |
| POST   | /users/new | Crea un nuevo usuario           |
| PUT    | /users/:id | Actualiza los datos del usuario |
| DELETE | /users/:id | Borra el usuario                |

## Publicaciones

| REST   | URL                |                                       |
| ------ | ------------------ | ------------------------------------- |
| GET    | /publicaciones     | Trae a todas las publicaciones        |
| GET    | /publicaciones/:id | Trae una publicacion específico       |
| POST   | /publicaciones/new | Crea una nueva publicacion            |
| PUT    | /publicaciones/:id | Actualiza los datos de la publicacion |
| DELETE | /publicaciones/:id | Borra la publicacion                  |

## Categoria

| REST   | URL             |                                     |
| ------ | --------------- | ----------------------------------- |
| GET    | /categorias     | Trae todas las categorias           |
| GET    | /categorias/:id | Trae una categoria específica       |
| POST   | /categorias/new | Crea una nueva categoria            |
| PUT    | /categorias/:id | Actualiza los datos de la categoria |
| DELETE | /categorias/:id | Borra la categoria                  |

## Grupo

- Matheo Kuktosky
- Tomas Baril
