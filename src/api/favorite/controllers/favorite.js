"use strict";

/**
 *  favorite controller
 */

const { createCoreController } = require("@strapi/strapi").factories;
const deepcopy = (obj) => JSON.parse(JSON.stringify(obj));

module.exports = createCoreController(
  "api::favorite.favorite",
  ({ strapi }) => ({
    // async find(ctx) {
    //   ctx.query = {
    //     ...ctx.query,
    //     filters: {
    //       user: {
    //         id: {
    //           $eq: ctx.state.auth.credentials.id,
    //         },
    //       },
    //     },
    //   };
    //   const { data, meta } = await super.find(ctx);

    //   return { data, meta };

    async find(ctx) {
        const entries = await strapi.db.query('api::favorite.favorite').findMany({
            where: {
                user: {
                    id: {
                        $eq: ctx.state.auth.credentials.id,
                    },
                },
            },
            populate: {
                student: {
                    select: ['*'],
                    populate : {
                        majors: {
                            select: ['major', 'id']
                        },
                        skills: {
                            select: ['skill', 'id']
                        },
                        job_types: {
                            select: ['job_type', 'id']
                        },
                        languages: {
                            select: ['language', 'id']
                        },
                    } 
                }
            },
        });
        return entries ;
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

    async delete(ctx) {
        console.log(ctx.params.id);
        const user = await strapi.db.query('api::favorite.favorite').delete({
            where: {
                student: {
                    id: {
                        $eq: ctx.params.id,
                    }
                },
                user: {
                    id: {
                        $eq: ctx.state.auth.credentials.id,
                    },
                },
            },
        });
        if ( user ) {
            return { 
                "message": "Removed Successfully",
                "status": "OK"
            }
        }
        
    }
  })
);
