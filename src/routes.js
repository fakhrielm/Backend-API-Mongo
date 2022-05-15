const Joi = require("@hapi/joi");
Joi.objectId = require("joi-objectid")(Joi);

const { getAllUser, addUser, getUser, updateUser, deleteUser, checkUser } = require("./handler");

const routes = [
   {
      method: "GET",
      path: "/users",
      handler: getAllUser,
   },
   {
      method: "POST",
      path: "/users",
      handler: addUser,
   },
   {
      method: "GET",
      path: "/users/{id}",
      handler: getUser,
   },
   {
      method: "PUT",
      path: "/users/{id}",
      options: {
         validate: {
            params: Joi.object({
               id: Joi.objectId(),
            }),
         },
      },
      handler: updateUser,
   },
   {
      method: "DELETE",
      path: "/users/{id}",
      options: {
         validate: {
            params: Joi.object({
               id: Joi.objectId(),
            }),
         },
      },
      handler: deleteUser,
   },
   {
      method: "*",
      path: "/{any*}",
      handler: () => "Halaman tidak ditemukan",
   },
   {
      method: "GET",
      path: "/fetchUser",
      handler: checkUser,
   },
];

module.exports = routes;
