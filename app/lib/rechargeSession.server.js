import { createCookieSessionStorage } from '@shopify/remix-oxygen';

// Recharge session is good for 60 minutes so set to 55 minutes to avoid race conditions
const RECHARGE_SESSION_DURATION = 60 * 55;

/**
 * This is a custom session implementation for your Hydrogen shop.
 * Feel free to customize it to your needs, add helper methods, or
 * swap out the cookie-based implementation with something else!
 */
export class RechargeSession {
  #sessionStorage;
  #session;

  /**
   * @param {SessionStorage} sessionStorage
   * @param {Session} session
   */
  constructor(sessionStorage, session) {
    this.#sessionStorage = sessionStorage;
    this.#session = session;
  }

  /**
   * @static
   * @param {Request} request
   * @param {string[]} secrets
   */
  static async init(request, secrets) {
    const storage = createCookieSessionStorage({
      cookie: {
        name: 'session_recharge',
        httpOnly: true,
        path: '/',
        sameSite: 'lax',
        secrets,
        maxAge: RECHARGE_SESSION_DURATION,
      },
    });

    const session = await storage.getSession(request.headers.get('Cookie')).catch(() => storage.getSession());

    return new this(storage, session);
  }

  get has() {
    return this.#session.has;
  }

  get get() {
    return this.#session.get;
  }

  get flash() {
    return this.#session.flash;
  }

  get unset() {
    return this.#session.unset;
  }

  get set() {
    return this.#session.set;
  }

  destroy() {
    return this.#sessionStorage.destroySession(this.#session);
  }

  commit() {
    return this.#sessionStorage.commitSession(this.#session);
  }
}

/** @typedef {import('@shopify/hydrogen').HydrogenSession} HydrogenSession */
/** @typedef {import('@shopify/remix-oxygen').SessionStorage} SessionStorage */
/** @typedef {import('@shopify/remix-oxygen').Session} Session */