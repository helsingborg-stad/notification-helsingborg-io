const { client, extractQueryParts } = require('../../db/db.client');

const Notifications = () => client('notifications');

const reset = () => Notifications()
  .truncate();

const query = async (params = {}) => {
  const { where, limit } = extractQueryParts(params);

  return Notifications()
    .select()
    .where(where)
    .orderBy('created_at', 'desc')
    .limit(limit || 10);
};

const create = entity => Notifications()
  .insert(entity);

module.exports = {
  reset,
  query,
  create,
};
