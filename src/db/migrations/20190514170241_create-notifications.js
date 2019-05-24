const up = async (db) => {
  await db.schema.createTable('notifications', (t) => {
    t.increments('id').unsigned().primary();
    t.string('user_id').notNull();
    t.string('service_id').notNull();
    t.string('message').notNull();
    t.string('pointer');
    t.dateTime('created_at').notNull().defaultsTo(db.fn.now());
    t.dateTime('acced_at');
    t.dateTime('mail_sent_at');
    t.dateTime('sms_sent_at');
    t.dateTime('digi_mail_sent_at');
  });
};

const down = async (db) => {
  await db.schema.dropTableIfExists('notifications');
};

module.exports = {
  up,
  down,
};
