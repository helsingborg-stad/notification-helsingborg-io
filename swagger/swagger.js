const { notificationPath, notificationsSchema } = require('../src/components/notification/notification.swagger');

module.exports = {
  swagger: '2.0',
  info: {
    version: '0.0.1',
    title: 'Simple API',
    description: 'Api document to test and document all available API functionality',
  },
  host: 'simple.api',
  paths: {
    '/notification': {
      post: notificationPath.post,
    },
    '/notification/find': {
      get: notificationPath.get,
    },
  },
  definitions: {
    ...notificationsSchema,
  },
};
