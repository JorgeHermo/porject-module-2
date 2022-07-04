# project-module-2

Here are the relevant endpoints (routes) that the app provides to use and which we will be using.

Base routes

| Route             | METHOD      | Description                       |
| ----------------- | ---------     | -------------------------------   |
| `/`               | GET           |      Index route                  |
| `/auth`           | POST          | Auth route                        |
| `/user`           | GET           | User route                        |
| `/admin`          | POST          | Admin route                       |
| `/recipes`        | GET           | Recipes route                     |
| `/maps`           | POST          | Maps route                        |

Auth routes

| Route                | METHOD      | Description                       |
| -----------------    | ---------   | -------------------------------   |
| `/sign-up`           | GET         | Retrive the user data             |
| `/sign-up`           | POST        | Create a new user                 |
| `/log-in`            | GET         | Retrives the user Data            |
| `/log-in`            | POST        | Update a specific character       |

User routes

| Route               | METHOD      | Description                       |
| -----------------   | ---------   | -------------------------------   |
| `/users`            | GET         | Retrive the user list data        |
| `/user/:id/details` | GET         | Retrive the user details          |
| `/user/:id/edit`    | GET         | Retrives the user Data            |
| `/user/:id/edit`    | POST        | Update a specific User            |
| `/user/:id/delete`  | POST        | Delete a specific User            |

Admin routes

| Route               | METHOD      | Description                       |
| -----------------   | ---------   | -------------------------------   |
| `/admin`            | GET         | Retrive the admin panel           |


recipe routes

| Route                | METHOD      | Description                       |
| -----------------    | ---------   | -------------------------------   |
| `/recipes/list`      | GET         | Retrive the all recipe data       |
| `/recipe/create`     | POST        | Create the recipe  data           |
| `/recipe/create`     | POST        | Create the recipe  data           |
|`/recipe/:id/details` | GET         | Retrive the recipe details        |
| `/recipe/:id/edit`   | GET         | Retrives the recipe Data          |
| `/recipe/:id/edit`   | POST        | Update a specific recipe          |
| `/recipes/:id/delete`| POST        | Delete a specific recipe          |