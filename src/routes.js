"use strict";

const Joi = require("@hapi/joi");
Joi.objectId = require("joi-objectid")(Joi);

const { getAllUser, addUser, getUser, updateUser, deleteUser, fetchUser } = require("./handler");

const routes = [
   {
      method: "GET",
      path: "/users",
      handler: getAllUser,
   },
   {
      method: "POST",
      path: "/users",
      options: {
         validate: {
            payload: Joi.object({
               userId: Joi.string().required(),
               nama: Joi.string().required(),
               email: Joi.string().required(),
               password: Joi.string().required(),
               isBusinessAcc: Joi.boolean().default(false),
               storeName: Joi.string().allow(null, ""),
               company: Joi.string().allow(null, ""),
               storeLocation: Joi.object({
                  lat: Joi.string().allow(null, ""),
                  lon: Joi.string().allow(null, ""),
               }),
            }),
            failAction: (request, h, err) => {
               request.log("error", err);
               throw err;
            },
         },
      },
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
      method: "POST",
      path: "/fetchUser",
      handler: fetchUser,
   },
];

module.exports = routes;
