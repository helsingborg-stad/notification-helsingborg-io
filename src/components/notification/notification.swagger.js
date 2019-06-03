const { stringWithLimit, date } = require('../../../swagger/global.swagger');

const notificationsSchema = {
  Notification: {
    type: 'object',
    properties: {
      user_id: {
        required: true,
        ...stringWithLimit(5, 24),
      },
      service_id: {
        type: 'string',
        required: true,
      },
      acced_at: {
        ...date(),
      },
      created_at: {
        ...date(),
      },
      mail_sent_at: {
        ...date(),
      },
      sms_sent_at: {
        ...date(),
      },
      did_mail_sent_at: {
        ...date(),
      },
      pointer: {
        ...stringWithLimit(0, 50),
      },
      message: {
        ...stringWithLimit(10, 1000),
      },
    },
    example: {
      id: 10,
      user_id: 'john_snow',
      service_id: 'iron_bank',
      message: "Who's that blonde?",
      pointer: null,
      created_at: '2019-06-03T07:48:57.000Z',
      acced_at: null,
      mail_sent_at: null,
      sms_sent_at: null,
      digi_mail_sent_at: null,
    },
  },
};

const notificationPath = {
  post: {
    tags: ['CRUD operations'],
    description: 'Add a notification',
    summary: 'Add Notification with Service id and User id',
    operationId: 'addNotification',
    parameters: [
      {
        in: 'body',
        name: 'body',
        description: 'The notification to create.',
        required: true,
        schema: {
          type: 'object',
          properties: {
            user_id: {
              required: true,
              ...stringWithLimit(5, 24),
            },
            service_id: {
              type: 'string',
              required: true,
            },
            pointer: {
              ...stringWithLimit(0, 50),
            },
            message: {
              ...stringWithLimit(10, 1000),
              required: true,
            },
          },
          example: {
            user_id: 'john_snow',
            service_id: 'iron_bank',
            message: "Who's that blonde?",
          },
        },
      },
    ],
    responses: {
      200: {
        description: 'Notification created successfully.',
      },
      422: {
        description: 'Validation Error',
        schema: {
          $ref: '#/definitions/ValidationError',
        },
      },
    },
  },
  get: {
    tags: ['CRUD operations'],
    summary: 'Query notifications',
    description: 'Query notifications by User id and Service id. Can optionally add a limit parameter to controll the number of returned entities. All entities are sorted in chronological order.',
    operationId: 'queryNotifications',
    parameters: [
      {
        name: 'user_id',
        in: 'query',
        description: 'The user id of the notification',
        required: true,
        type: 'string',
      },
      {
        name: 'service_id',
        in: 'query',
        description: 'The service id of the notification',
        type: 'string',
      },
      {
        name: 'limit',
        in: 'query',
        description: 'The number of entities to fetch',
        type: 'integer',
        default: 10,
      },
    ],
    responses: {
      200: {
        description: 'successful operation',
        schema: {
          type: 'array',
          items: {
            $ref: '#/definitions/Notification',
          },
        },
      },
      422: {
        description: 'Validation Error',
        schema: {
          $ref: '#/definitions/ValidationError',
        },
      },
    },
  },
};

module.exports = {
  notificationPath,
  notificationsSchema,
};
