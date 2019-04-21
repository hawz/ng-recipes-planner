/**
 *            AuthData Model
 *
 * The AuthData interface is used as a parameter when authenticating and sending
 * requests to Firebase. Its structure is pretty straightforward and consists in
 * two fields:
 *
 * - email (string),
 * - password (string)
 *
 */

export interface AuthData {
  email: string;
  password: string;
}
