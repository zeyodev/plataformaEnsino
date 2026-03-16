import { MongoClient, ObjectId } from "mongodb";
import { ulid } from "ulid";

/**
 * @typedef {Object} LogEntry
 * @property {number} [timestamp]
 * // add other log properties here based on your data structure
 */

/**
 * Class representing the MongoDB connection wrapper.
 */
export class Mongodb {
    /**
     * Creates a MongoDB instance.
     * @param {string} url - The MongoDB connection string.
     */
    constructor(url) {
        /** @type {MongoClient} */
        this.mongoclient = new MongoClient(url, { maxConnecting: 20, maxPoolSize: 20 });
        /** @type {import("mongodb").Db} */
        this.db = this.mongoclient.db("duoacademy");
    }
}

/**
 * MongoDB repository implementation.
 */
export default class RepositoryMongoDB {
    /**
     * Creates a RepositoryMongoDB instance.
     * @param {Mongodb} mongo - The Mongodb instance.
     */
    constructor(mongo) {
        /** @type {Mongodb} */
        this.mongo = mongo;
    }

    /**
     * Gets all collections from the database.
     * @returns {Promise<any[]>} A promise resolving to an array of collections.
     */
    getCollections() {
        return this.mongo.db.listCollections().toArray();
    }

    /**
     * Converts a string value to a MongoDB ObjectId.
     * @param {string} value - The string ID to convert.
     * @returns {[any, boolean]} A tuple containing the ObjectId (or original string/error) and a boolean indicating if an error occurred.
     */
    convertMainKey(value) {
        if (value === "") return ["", false];
        try {
            return [new ObjectId(value), false];
        } catch (error) {
            return [error, true];
        }
    }

    /**
     * Creates a new document in the specified collection.
     * @param {string} collection - The collection name.
     * @param {any} value - The document to insert.
     * @returns {Promise<[any, boolean]>} A tuple containing the inserted document and an error flag.
     */
    async create(collection, value) {
        if (!value._id) {
            value._id = ulid(Date.now());
        }
        return new Promise(res => {
            this.mongo.db.collection(collection).insertOne(value)
                .then(result => { res([value, false]); })
                .catch(err => { if (err) res([err, true]); });
        });
    }

    /**
     * Updates a single document by ID.
     * @param {string} collection - The collection name.
     * @param {string} id - The document ID.
     * @param {any} value - The fields to update.
     * @returns {Promise<[any, boolean]>} A tuple containing the update result and an error flag.
     */
    async update(collection, id, value) {
        return new Promise((res) => {
            this.mongo.db.collection(collection).updateOne({ _id: id }, { $set: value })
                .then(result => res([result, false]))
                .catch(err => res([err, true]));
        });
    }

    /**
     * Updates multiple documents matching the query.
     * @param {string} collection - The collection name.
     * @param {any} query - The filter query.
     * @param {any} value - The fields to update.
     * @returns {Promise<[any, boolean]>} A tuple containing the update result and an error flag.
     */
    updateMany(collection, query, value) {
        return new Promise((res) => {
            this.mongo.db.collection(collection).updateMany(query, { $set: value })
                .then(result => res([result, false]))
                .catch(err => res([err, true]));
        });
    }

    /**
     * Updates a single document matching the query.
     * @param {string} collection - The collection name.
     * @param {any} query - The filter query.
     * @param {any} value - The fields to update.
     * @returns {Promise<[any, boolean]>} A tuple containing the update result and an error flag.
     */
    async updateQuery(collection, query, value) {
        return new Promise((res) => {
            this.mongo.db.collection(collection).updateOne(query, { $set: value })
                .then(result => res([result, false]))
                .catch(err => res([err, true]));
        });
    }

    /**
     * Deletes a single document by ID.
     * @param {string} collection - The collection name.
     * @param {string} id - The document ID.
     * @returns {Promise<[any, boolean]>} A tuple containing the delete result and an error flag.
     */
    async delete(collection, id) {
        return new Promise((res) => {
            this.mongo.db.collection(collection).deleteOne({ _id: id })
                .then(result => res([result, false]))
                .catch(err => res([err, true]));
        });
    }

    /**
     * Deletes multiple documents matching the query.
     * @param {string} collection - The collection name.
     * @param {Record<string, any>} query - The filter query.
     * @returns {Promise<[any, boolean]>} A tuple containing the delete result and an error flag.
     */
    async deleteMany(collection, query) {
        return new Promise((res) => {
            this.mongo.db.collection(collection).deleteMany(query)
                .then(result => res([result, false]))
                .catch(err => res([err, true]));
        });
    }

    /**
     * Finds multiple documents matching the query.
     * @param {string} collection - The collection name.
     * @param {Record<string, any>} query - The filter query.
     * @returns {Promise<[any[], boolean]>} A tuple containing an array of documents and an error flag.
     */
    async findMany(collection, query) {
        const result = await this.mongo.db.collection(collection).find(query).toArray();
        return [result ? result : [], false];
    }

    /**
     * Finds multiple documents matching the query, applying sorting and limits.
     * @param {string} collection - The collection name.
     * @param {Record<string, any>} query - The filter query.
     * @param {number} limit - The maximum number of documents to return.
     * @param {1 | -1} sort - The sort direction (1 for ascending, -1 for descending).
     * @returns {Promise<[any[], boolean]>} A tuple containing an array of documents and an error flag.
     */
    async findManySortLimit(collection, query, limit, sort) {
        const result = await this.mongo.db.collection(collection).find(query).sort({ _id: sort }).limit(limit).toArray();
        return [result ? result : [], false];
    }

    /**
     * Finds a single document matching the query.
     * @param {string} collection - The collection name.
     * @param {Record<string, any>} query - The filter query.
     * @returns {Promise<[any, boolean]>} A tuple containing the document and a boolean indicating if it was not found.
     */
    async findOne(collection, query) {
        const result = await this.mongo.db.collection(collection).findOne(query);
        return [result, !result];
    }

    /**
     * Test method to establish a connection and open a session.
     * @returns {Promise<[any, boolean]>}
     */
    async teste() {
        return new Promise((res) => {
            this.mongo.mongoclient.connect().then(client => {
                client.withSession(async (session) => {
                    session.removeAllListeners();
                    return session;
                });
            });
        });
    }

    /**
     * Saves a log entry.
     * @param {LogEntry} entry - The log entry to save.
     * @returns {Promise<void>}
     */
    async saveLog(entry) {
        // No Backend, synced é irrelevante, mas salvamos o histórico
        this.create("_Logs", entry);
        //this.historyLogs.push(entry);
        // Limpeza de logs antigos poderia ocorrer aqui
    }

    /**
     * Retrieves logs generated since a specific timestamp.
     * @param {number} timestamp - The minimum timestamp to retrieve logs for.
     * @returns {Promise<[LogEntry[], boolean]>} A tuple containing the log entries and an error flag.
     */
    async getLogsSince(timestamp) {
        return this.findMany("_Logs", { timestamp: { $gt: timestamp } });
    }
}