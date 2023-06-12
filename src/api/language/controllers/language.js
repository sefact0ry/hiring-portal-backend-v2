'use strict';

/**
 * language controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController(
    "api::language.language",
    ({ strapi }) => ({
        
        async find(ctx) {
            const entries = await strapi.db.query('api::language.language').findMany({
                select: ['language'],
            });
            const languages = entries.map(entry => entry.language);

            return languages ;
        }
    })

);