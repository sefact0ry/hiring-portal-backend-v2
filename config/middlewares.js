module.exports = [
  'strapi::errors',
  'strapi::security',
  'strapi::cors',
  'strapi::poweredBy',
  {
    name: "strapi::session",
    config: {
      secure: false,
    },
  },
  'strapi::logger',
  'strapi::query',
  // {
  //   name: 'strapi::body',
  //   config: {
  //     patchKoa: true,
  //     multipart: true,
  //     includeUnparsed: true,
  //   },
  // },
  'strapi::body',
  'strapi::session',
  'strapi::favicon',
  'strapi::public',
];
