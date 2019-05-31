const { stringWithLimit, date } = require('../../validation/global.schema');

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
  },
  Error: {
    type: 'object',
    properties: {
      id: {
        type: 'integer',
        format: 'int64',
      },
      name: {
        type: 'string',
      },
    },
    xml: {
      name: 'Error',
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
        description: 'Notifications object that needs to be added to the store',
        required: true,
        schema: {
          $ref: '#/definitions/Notification',
        },
      },
    ],
    requestBody: {
      content: {
        'application/json': {
          schema: {
            $ref: '#/definitions/Notification',
          },
        },
      },
      required: true,
    },
    responses: {
      200: {
        description: 'New notificaitons were created',
      },
      400: {
        description: 'Invalid parameters',
        content: {
          'application/json': {
            schema: {
              $ref: '#/definitions/Error',
            },
            example: {
              message: 'Notification identificationNumbers 10, 20 already exist',
              internal_code: 'invalid_parameters',
            },
          },
        },
      },
    },
  },
  get: {
    tags: ['CRUD operations'],
    summary: 'Find Notification by Service id and User id',
    description: 'find Notification',
    operationId: 'findNotification',
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
        required: true,
        type: 'string',
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
      400: {
        description: 'Invalid user_id value',
        content: {
          'application/json': {
            schema: {
              $ref: '#/definitions/Error',
            },
            example: {
              message: 'Notification with this user id doesn´t  exist',
              internal_code: 'invalid_parameters',
            },
          },
        },
      },
    },
  },
};

module.exports = {
  notificationPath,
  notificationsSchema,
};
