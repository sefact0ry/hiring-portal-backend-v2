'use strict';

/**
 * job-type controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController(
    "api::job-type.job-type",
    ({ strapi }) => ({
        
        async find(ctx) {
            const entries = await strapi.db.query('api::job-type.job-type').findMany({
                select: ['job_type'],
            });
            const job_types = entries.map(entry => entry.job_type);

            return job_types ;
        }
  
    })

);
  