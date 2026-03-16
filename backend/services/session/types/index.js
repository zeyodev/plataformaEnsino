/**
 * @typedef {Object} CommandParams
 * @property {string} event
 * @property {any} args
 * @property {Session} session
 */

/**
 * @typedef {Promise<[any, boolean]>} CommandReturn
 */

/**
 * @typedef {(event: string, args: any, session: Session) => CommandReturn} Command
 */

/**
 * @typedef {{ [key: string]: Command }} CommandList
 */

/**
 * @typedef {Object} States
 * @property {CommandList} unauth
 * @property {CommandList} auth
 */

/**
 * @typedef {Object} State
 * @property {string} name
 * @property {{ [key: string]: Command }} commands
 * @property {(state: keyof States) => void} setState
 */

/**
 * @typedef {Object} Session
 * @property {string} id
 * @property {any} client
 * @property {{ [key: string]: any }} auth
 * @property {State} state
 * @property {import('../../../repository/mongodb.js').default} repository
 * @property {(event: string, args: any) => CommandReturn} execute
 */

export {};
