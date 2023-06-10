'use strict';
// const unparsed = require('koa-body/unparsed.js');
/**
 * student controller
*/

const { createCoreController } = require('@strapi/strapi').factories;


module.exports = createCoreController(
  "api::student.student",
  ({ strapi }) => ({
    async findAvailable(ctx) {
        ctx.query = {
          ...ctx.query,
          Available: {
            $eq: true
          },
        };
    
        const { data, meta } = await strapi.controllers["api::student.student"].find(ctx);
    
        return { data, meta };
    },


    async findByName(ctx) {   
        const entries = await strapi.db.query('api::student.student').findMany({
            where: {
                full_name: 'tony kosseify',
            },
          });
        
        return entries ;
    },

    async find(ctx) {
        const entries = await strapi.db.query('api::student.student').findMany({
            populate: {
                majors: true,
                skills: true,
                job_types: true,
                languages: true,
            },
          });
        
        return entries ;
    },

    async findByFilters(ctx) {
        const { majors } = ctx.request.body;

        return majors ;

        
        const entries = await strapi.db.query('api::student.student').findMany({
            where: {
                majors: {
                    major :"Computer Science",
                    // id: { $in: [1,2,3] }
                },
            },
            populate: {
                majors: true,
                skills: {
                    select: ['skill', 'id']
                },
                job_types: true,
                languages: true,
                
            },
        });
        return entries ;
    }

  })


);
