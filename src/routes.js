"use strict";

const Joi = require("@hapi/joi");
Joi.objectId = require("joi-objectid")(Joi);

const { getAllUser, signUp, signIn, getUserById, updateUser, deleteUser, getAllItem, addItem } = require("./handler");

const routes = [
   {
      method: "GET",
      path: "/users",
      handler: getAllUser,
   },
   {
      method: "POST",
      path: "/sign-up",
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
                  lat: Joi.number().allow(null, ""),
                  lon: Joi.number().allow(null, ""),
               }),
            }),
            failAction: (request, h, err) => {
               request.log("error", err);
               throw err;
            },
         },
      },
      handler: signUp,
   },
   {
      method: "POST",
      path: "/sign-in",
      handler: signIn,
   },
   {
      method: "GET",
      path: "/users/{id}",
      handler: getUserById,
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
      path: "/items",
      handler: getAllItem,
   },
   {
      method: "POST",
      path: "/add-Item",
      handler: addItem,
   },
];

module.exports = routes;
