const notificationsSchema = {
  type: 'object',
  items: {
    properties: {
      name: {
        type: 'string',
      },
    },
  }
};

const USER_PATHS = {
  '/find': {
    post: {
      tags: ['CRUD operations'],
      description: 'Create a notification',
      operationId: 'createUsers',
      parameters: [],
      requestBody: {
        content: {
          'application/json': {
            schema: {
              $ref: '#/components/schemas/Users',
            },
          },
        },
        required: true,
      },
      responses: {
        200: {
          description: 'New users were created',
        },
        400: {
          description: 'Invalid parameters',
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/Error',
              },
              example: {
                message: 'User identificationNumbers 10, 20 already exist',
                internal_code: 'invalid_parameters',
              },
            },
          },
        },
      },
    },
  },
};