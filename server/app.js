var express = require('express'),
    app = express(),
    orm = null;
var mysql_orm = require('mysql_orm');


/* Define a schema */
var schema = {

    /* User-defined type aliases */
    $types: {
        /* Name begins with colon -> foreign key to some table */
        'user': ':users',
        'role': ':roles',
        'string': 'varchar(64)',
        'password': 'char(60)',
        'boolean': 'bit',
        /* A field of type "country" would be a foreign key to table "countries" */
        'country': ':countries'
    },

    users: {
        /*
         * Dollar-prefix is used for metadata, e.g. specifying the
         * default sort order
         */
        $sort: '+username',
        /* This field must have a unique value (unique: true) */
        username: { type: 'string', unique: true },
        password: { type: 'password' },
        role: { type: 'role' },
        lastactive: { type: 'timestamp' },
        country: { type: 'country' }
    },

    roles: {
        name: { type: 'string', unique: true },
        rights: { type: 'string' }
    },

    posts: {
        /*
         * Prefix a sort field by + or - to explicitly set ascending
         * or descending sort order
         */
        $sort: '-date',
        /*
         * Set the ON UPDATE and ON DELETE actions for foreign key
         * constraint
         */
        user: { type: 'user', onDelete: 'cascade', onUpdate: 'cascade' },
        /* Index this field (index: true) */
        title: { type: 'string', index: true },
        content: { type: 'text' },
        date: { type: 'timestamp' },
        deleted: { type: 'boolean' }
    },

    countries: {
        $sort: '+name',
        name: { type: 'string', index: true }
    }

};

var data = {

    roles: [
        { name: 'admin', rights: '*' },
        { name: 'ploom', rights: 'being a ploom' },
        { name: 'pleb', rights: 'lol' }
    ],

    /*
     * The auto_increment primary key `id` field is created automatically for
     * each table
     */
    countries: [
        { id: 44, name: 'United Kingdom' },
        { id: 372, name: 'Estonia' },
        /* Lithuania was the largest country in Europe at one point */
        { id: 370, name: 'Lithuania' },
        { id: 7, name: 'Russia' }
    ],

    users: [
        /*
         * We don't know what ID values the roles will have and we didn't
         * explicitly specify them, but we can use the automatic foreign-key
         * lookup to specify roles by name instead.  Such search constraints
         * must resolve to one and only one record in the parent table.
         * Automatic lookup is also used for the country field.  Easy!
         */
        { username: 'mark', password: Array(61).join('\0'), role: { name: 'admin' }, country: { name: 'Estonia' } },
        { username: 'marili', password: Array(61).join('\0'), role: { name: 'ploom' }, country: { name: 'Estonia' } }
    ],

    posts: [
        { user: { username: 'mark' }, title: 'Test post', content: 'This is a test post', deleted: false }
    ]

};

var mysql_params = {
    host: 'localhost',
    user: 'root',
    password: 'password'
};

var orm_options = {
    mysql: mysql_params,
    database: 'mysql-orm-test',
    /*
     * CAUTION: Setting this to true will drop the database then recreate
     * it
     */
    recreateDatabase: false,
    /*
     * CAUTION: Setting this to true will drop the tables mentioned in
     * the schema then recreate them
     */
    recreateTables: false,
    /* Causes an annoying delay between each line output by ORM's logger */
    debug: process.env.DEBUG,
    /*
     * Log level (1,2,3=FAIL/WARN/INFO).  See logging.js for more info.
     * Level 2 (WARN) is default.
     */
    logLevel: 2
};


mysql_orm.create(schema, data, orm_options, function (err, ormObject) {
    if (err) {
        throw err;
    }
    orm = ormObject;
});