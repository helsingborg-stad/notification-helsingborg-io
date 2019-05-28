const { model } = require('../../db/db.client');

const Notifications = model('notifications');

const reset = () => Notifications.fetchAll().map(res => res.destroy());

const query = async (params = {}) => {
  const where = params;
  const limit = params.limit || 10;

  delete where.limit;

  return Notifications
    .query('orderBy', 'created_at', 'desc')
    .query('limit', limit)
    .where(where)
    .fetchAll();
};

const create = entity => (new Notifications(entity).save());

module.exports = {
  reset,
  query,
  create,
};
