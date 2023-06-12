'use strict';

/**
 * skill controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::skill.skill');

module.exports = createCoreController(
    "api::skill.skill",
    ({ strapi }) => ({
        
        async find(ctx) {
            const entries = await strapi.db.query('api::skill.skill').findMany({
                select: ['skill'],
            });
            const skills = entries.map(entry => entry.skill);

            return skills ;
        }
    })
);