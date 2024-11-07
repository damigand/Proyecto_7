# PROYECTO 7 | David Miguel Andrés

Este proyecto es el Backend de una aplicación web de alquiler de coches, donde los usuarios pueden subir sus propios coches y otros usuarios
pueden alquilarlos.

## Estructuras de datos

### User

| Name     | Type   | Required | default |
| -------- | ------ | -------- | ------- |
| username | String | ✓        | -       |
| password | String | ✓        | -       |
| role     | String | ✓        | "user"  |

### Car

| Name     | Type             | Required | default |
| -------- | ---------------- | -------- | ------- |
| name     | String           | ✓        | -       |
| brand    | String           | ✓        | -       |
| year     | Number           | ✓        | -       |
| distance | Number           | ✓        | -       |
| rented   | Boolean          | ✓        | false   |
| owner    | Object ID (User) | x        | -       |

_Nota: todos los "Object ID" hacen referencia a un objeto que pertenece a otra estructura de datos._

### Rent

| Name      | Type            | Required | default |
| --------- | --------------- | -------- | ------- |
| carOwner  | ObjectID (User) | ✓        | -       |
| rentedCar | ObjectID (Car)  | ✓        | -       |
| rentedBy  | ObjectID (User) | ✓        | -       |
| active    | Boolean         | ✓        | false   |
| approved  | Boolean         | ✓        | false   |

_`approved` indica si un alquiler ha sido confirmado, mientras que `active` indica si un alquiler ha vencido o no._

## SCRIPTS

El proyecto cuenta con cuatro scripts diferentes: 3 seeds y 1 script para ejecutar el backend. Se recomienda ejecutar las "seeds" en el
siguiente orden: `npm run user-seed` > `npm run car-seed` > `npm run rent-seed`. `user-seed` crea tres usuarios, dos con rol "user" y otro
con rol "admin". `car-seed` crea un coche para cada usuario. `rent-seed` crea dos alquileres entre el primer usuario, el segundo y sus
coches. Para ejecutar el backend, se debe usar `npm run server`.

## API

### User endpoints

Todos los endpoints de "User" van precedidos de "/user". [GET] **`/`** Devuelve un `json` con objetos de todos los usuarios.

[GET] **`/:id`** Devuelve un `json` con el objeto de un usuario cuyo `id` es especificado por parámetro.

[GET] **`/name/:username`** Devuelve un `json` con un array de objetos de usuarios cuyo `username` coincide con el introducido por
parámetro.

[POST] **`/create`** Permite crear un objeto "User". Se debe pasar un objeto `json` en el cuerpo de la petición especificando el `username`
y `password`.

[POST] **`/login`** Permite hacer "log-in" de un usuario ya existente. Devuelve un `String` con un `jsonwebtoken`.

[PUT] **`/edit/:id`** Permite editar un usuario cuyo `id` es especificado por parámetro. Se debe pasar un objeto `json` en el cuerpo de la
petición especificando el campo que quiera cambiarse. Requiere un `jsonwebtoken` en la cabecera de la petición perteneciente al usuario que
se quiera editar, o de un usuario con rol administrador.

[DELETE] **`/delete/:id`** Permite borrar un usuario cuyo `id` es especificado por parámetro. Requiere un `jsonwebtoken` en la cabecera de
la petición perteneciente al usuario que se quiera borrar, o de un usuario con rol administrador.

### Car endpoints

Todos los endpoints de "Car" van precedidos de "/car". [GET] **`/`** Devuelve un `json` con objetos de todos los coches.

[GET] **`/:id`** Devuelve un `json` con el objeto del coche cuyo `id` es especificado por parámetro.

[GET] **`/brand/:brand`** Devuelve un `json` con un array de objetos cuya `brand` coincida con la introducida por parámetro.

[GET] **`/distance/:km`** Devuelve un `json` con un array de objetos cuya `distance` sea igual o mayor a la indicada por parámetro.

[GET] **`/name/:name`** Devuelve un `json` con un array de objetos cuyo `name` coincida con el introducido por parámetro.

[GET] **`/owner/:id`** Devuelve un `json` con un array de objetos cuyo `owner` coincida con el introducido por parámetro.

[GET] **`/rented/:rented`** Devuelve un `json` con un array de objetos cuyo `rented` coincida con el introducido por parámetro.

[POST] **`/create`** Permite crear un objeto "Car". Se debe pasar un objeto `json` en el cuerpo de la petición especificando las siguientes
propiedades: `name`, `brand`, `year`, `distance`. Requiere un `jsonwebtoken` de un usuario. La propiedad `owner` será el `ObjectID` del
usuario que realiza la petición. La propiedad `rented` será siempre `false` hasta que un usuario alquile el coche o un administrador la
cambie manualmente.

[PUT] **`/edit/:id`** Permite editar un coche cuyo `id` es especificado por parámetro. Se debe pasar un objeto `json` en el cuerpo de la
petición con los campos que se quieran editar. Un usuario solo podrá modificar las propiedades `name`, `brand`, `year` y `distance`,
mientras que un administrador podrá modificar todas. Requiere un `jsonwebtoken` en la cabecera de la petición perteneciente al usuario cuyo
`id` coincida con el campo `owner` del coche, o cuyo rol sea administrador.

[DELETE] **`/delete/:id`** Permite borrar un coche cuyo ´id´ es especificado por parámetro. Requiere un `jsonwebtoken` en la cabecera de la
petición perteneciente al usuario cuyo `id` coincida con el campo `owner` del coche, o cuyo rol sea administrador.

### Rent endpoints

Todos los endpoints de "Rent" van precedidos de "/rent". _NOTA: Los usuarios con rol "user" solo tendrán acceso a alquileres que hayan sido
aprobados por un administrador._ [GET] **`/`** Devuelve un `json` con objetos de todos los alquileres.

[GET] **`/:id`** Devuelve un `json` con un objeto del alquiler cuyo `id` es especificado por parámetro.

[GET] **`/car/:id`** Devuelve un `json` con un array de objetos cuyo `rentedCar` coincida con el `id` especificado por parámetro.

[GET] **`/renter/:id`** Devuelve un `json` con un array de objetos cuyo `rentedBy` coincida con el `id` especificado por parámetro.

[GET] **`/approved/:approved`** Devuelve un `json` con un array de objetos cuyo `approved` coincida con el especificado por parámetro. Solo
usuarios con rol administrador tendrán acceso a alquileres cuyo `approved` tenga un valor `false`.

[GET] **`/active/:active`** Devuelve un `json` con un array de objetos cuyo `active` coincida con el especificado por parámetro.

[POST] **`/create`** Permite crear un alquiler de un coche. Requiere un `json` en el cuerpo de la petición con los campos `carId` y
`userId`. `carId` debe ser el `id` del coche que vaya a ser alquilado, mientras que `userId` será el `id` del usuario que quiera hacer el
alquiler. La propiedad `carOwner` se establece automáticamente y tendrá el mismo valor que la propiedad `owner` del coche alquilado.
Requiere un `jsonwebtoken` en la cabecera de la petición perteneciente a un usuario. Si el usuario es administrador, también podrá indicar
en el cuerpo de la petición los campos `active` y `approved`.

[PUT] **`/edit/:id`** Permite editar un alquiler de un coche. Requiere un `json` en el cuerpo de la petición indicando los campos que se
quieran cambiar. Solo un usuario con rol administrador podrá editar un alquiler. Requiere un `jsonwebtoken` en la cabecera de la petición
perteneciente a un usuario con rol administrador.

[DELETE] **`/delete/:id`** Permite borrar el alquiler de un coche. Solo un usuario con rol administrador podrá borrar un alquiler. Requiere
un `jsonwebtoken` en la cabecera de la petición perteneciente a un usuario con rol administrador.
