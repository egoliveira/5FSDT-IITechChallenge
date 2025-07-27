/**
 * @type {import('node-pg-migrate').ColumnDefinitions | undefined}
 */
const shorthands = undefined;

/**
 * @param pgm {import('node-pg-migrate').MigrationBuilder}
 * @param run {() => void | undefined}
 * @returns {Promise<void> | void}
 */
const up = (pgm) => {
    // Password is admin@123
    let sql = "INSERT INTO \"user\" (username, name, email, password, active) VALUES ('admin', 'Schola Blog Administrator', 'admin@schola.blog', '$2b$10$dkzY4/VivJGiT1egI77KAOlxNT5TB7Q7UWbrEbYldroBG/6J3na8C', true)";

    pgm.sql(sql);

    sql = "INSERT INTO user_roles (user_id, admin, teacher, student) VALUES ((SELECT id FROM \"user\" WHERE username='admin'), true, false, false)";

    pgm.sql(sql);
};

/**
 * @param pgm {import('node-pg-migrate').MigrationBuilder}
 * @param run {() => void | undefined}
 * @returns {Promise<void> | void}
 */
const down = (pgm) => {
    pgm.sql("DELETE FROM user_roles WHERE user_id = (SELECT id FROM \"user\" WHERE \"user\".username='admin')");

    pgm.sql("DELETE FROM \"user\" WHERE username = 'admin'");
};

module.exports = {shorthands, up, down};