const query = require('../database/db-connection');
const { multipleColumnSet } = require('../utils/commonUtils');
const Status = require('../utils/schoolAuthStatusUtils');

class UserModel {
    tableName = 'school';

    find = async (params = {}) => {
        let sql = `SELECT * FROM ${this.tableName}`;

        if (!Object.keys(params).length) {
            return await query(sql);
        }

        const { columnSet, values } = multipleColumnSet(params)
        sql += ` WHERE ${columnSet}`;

        return await query(sql, [...values]);
    }

    findOne = async (params) => {
        const { columnSet, values } = multipleColumnSet(params)

        const sql = `SELECT * FROM ${this.tableName}
        WHERE ${columnSet}`;

        const result = await query(sql, [...values]);

        // return back the first row (user)
        return result[0];
    }

    // create = async ({ username, password, first_name, last_name, email, role = Role.SuperUser, age = 0 }) => {
    // create = async ({ owner_name, email, password, phone, school_name, address, city, state, country }) => {
    create = async ({ owner_name, owner_email, owner_phone, password, school_name, school_email, school_phone, address, city, state, country }) => {
        const sql = `INSERT INTO ${this.tableName}
        (owner_name, owner_email, owner_phone, password, school_name, school_email, school_phone, address, city, state, country) VALUES (?,?,?,?,?,?,?,?,?,?,?)`;

        const result = await query(sql, [owner_name, owner_email, owner_phone, password, school_name, school_email, school_phone, address, city, state, country]);
        const affectedRows = result ? result.affectedRows : 0;

        return affectedRows;
    }

    update = async (params, id) => {
        const { columnSet, values } = multipleColumnSet(params)

        const sql = `UPDATE user SET ${columnSet} WHERE id = ?`;

        const result = await query(sql, [...values, id]);

        return result;
    }

    delete = async (id) => {
        const sql = `DELETE FROM ${this.tableName}
        WHERE id = ?`;
        const result = await query(sql, [id]);
        const affectedRows = result ? result.affectedRows : 0;

        return affectedRows;
    }
}

module.exports = new UserModel;