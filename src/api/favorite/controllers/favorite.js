"use strict";

/**
 *  favorite controller
 */

const { createCoreController } = require("@strapi/strapi").factories;
const deepcopy = (obj) => JSON.parse(JSON.stringify(obj));

module.exports = createCoreController(
  "api::favorite.favorite",
  ({ strapi }) => ({
    async find(ctx) {
        console.log(ctx);
      ctx.query = {
        ...ctx.query,
        filters: {
          user: {
            id: {
              $eq: ctx.state.user.id,
            },
          },
        },
      };
      const { data, meta } = await super.find(ctx);

      return { data, meta };
    },

    async create(ctx) {
        console.log(ctx.state.auth.credentials.id);
      ctx.request.body = {
        data: {
          ...ctx.request.body.data,
          user: ctx.state.auth.credentials.id,
        },
      };

      let response = await strapi
        .service("api::favorite.favorite")
        .create(ctx.request.body);

      return response;
    },
  })
);
