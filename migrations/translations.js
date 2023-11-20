exports.up = function(knex) {
    return knex.schema.createTable('translations', table => {
        table.increments('id').primary();
        table.integer('user_id').unsigned().references('id').inTable('users').onDelete('CASCADE');
        table.text('original_text').notNullable();
        table.text('translated_text').notNullable();
        table.string('source_language', 10);
        table.string('target_language', 10);
        table.timestamp('created_at').defaultTo(knex.fn.now());
    });
};

exports.down = function(knex) {
    return knex.schema.dropTable('translations');
};
