'use strict';

/**
 * major controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController(
    "api::major.major",
    ({ strapi }) => ({
        
        async find(ctx) {
            const entries = await strapi.db.query('api::major.major').findMany({
                select: ['major'],
            });

            const majors = entries.map(entry => entry.major);

            return majors ;
        }
    })
);