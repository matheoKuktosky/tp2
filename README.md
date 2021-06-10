# TP FINAL - TP2 - Red social videojuegos

El proyecto sera una red social para que los usuarios puedan formar grupos de juego. Asi cuando quiera jugar algo que se requiera un minimo de 4 personas pueda buscar un grupo para tal.

## Seteando el desarrollo de entorno

1. Clone el Repo en su local

```
git clone https://github.com/matheoKuktosky/tp2.git
```

2. Instale todas las dependencias

```
npm i
```

3. Levanta el proyecto

```
npm start
```

## Entidades

- Usuario
- Publicacion
- Categoria
- PublicacionesXUsuarios
- PubliacionesxPostulantes
- PublicacionesXCategorias

## Actor

- Usuario

## Roles

- Postulante
- Creador

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

# Casos de Uso
## Registrar usuario
El usuario podrá registrarse ingresando sus datos(Nombre, Usuario, Contraseña y Mail) y en caso de que sean validos se le creara una cuenta.

## Modificar datos de usuario
El usuario podrá acceder a sus datos mediante su perfil y en el mimso podrá modificar su mail, nombre y contraseña.

## Crear publicación
El usuario podrá crear publicaciones con un titulo, categoria y cantidad maxima de postulantes para la misma. En caso de que los datos ingresados sean validos, su publicacion sera creada.

## Modificar publicación
El usuario podrá modificar los datos de su publicación una vez esta este creada.

## Borrar publicación
El usuario podrá borrar su publicación mediante su listado de publicaciones.

## Postularse en una publicación
El usuario podrá postularse a cualquier publicacion disponible en su pagina inicial desde que esa no haya alcanzado su numero maximo de postulantes.

## Retirar postulación en una publicación
El usuario podrá retirar su postulación de cualquier publicacion en la que se haya postulado previamente.

## Aceptar postulación
El usuario creador de una publicación podrá aceptar los postulantes de la misma

## Rechazar postulación
El usuario creador de una publicación podrá rechazar los postulantes de la misma

# Grupo
## Integrantes
- Matheo Kuktosky
- Tomas Baril

## License

[MIT](https://choosealicense.com/licenses/mit/)
