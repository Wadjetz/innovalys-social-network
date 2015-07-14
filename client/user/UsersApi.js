import Qajax from 'qajax';
import { BASE_URL } from '../conf';

/**
 * Users Service who use server API for users
 */
class UsersApi {
  /**
   * Constructor
   * @param  {string} url Api Base Url 
   */
  constructor(url) {
    this.url = url;
  }

  /**
   * Get all users
   * @return {promise} List of users
   */
  getAll() {
    return Qajax({
      url: `${this.url}/users`,
      method: 'GET'
    })
    .then(Qajax.filterSuccess)
    .then(Qajax.toJSON);
  }

  /**
   * Get me
   * @return {promise} User object
   */
  me() {
    return Qajax({
      url: `${this.url}/users/me`,
      method: 'GET'
    })
    .then(Qajax.filterSuccess)
    .then(Qajax.toJSON);
  }

  /**
   * Get user profil
   * @param  {number} id User id
   * @return {promise}    User object
   */
  getProfil(id) {
    return Qajax({
      url: `${this.url}/users/profil/${id}`,
      method: 'GET'
    })
    .then(Qajax.filterSuccess)
    .then(Qajax.toJSON);
  }

  /**
   * Get user roles
   * @return {promise} List of user roles
   */
  roles() {
    return Qajax({
      url: `${this.url}/users/roles`,
      method: 'GET'
    })
    .then(Qajax.filterSuccess)
    .then(Qajax.toJSON);
  }

  /**
   * Create new user
   * @param  {User} user User object
   * @return {promise}      Result
   */
  create(user) {
    return Qajax({
      url: `${this.url}/users/signup`,
      method: 'POST',
      data: user
    })
    .then(Qajax.filterSuccess)
    .then(Qajax.toJSON);
  }

  /**
   * Login
   * @param  {Login} user Login object
   * @return {promise}      Result
   */
  login(user) {
    return Qajax({
      url: `${this.url}/users/login`,
      method: 'POST',
      data: user
    })
    .then(Qajax.filterSuccess)
    .then(Qajax.toJSON);
  }
    /**
   * Get all users
   * @return {promise}      List of users
   */
  getAllUsers() {
    return Qajax({
      url: `${this.url}/users`,
      method: 'GET'
    })
    .then(Qajax.filterSuccess)
    .then(Qajax.toJSON);
  }

  /**
   * Change password
   * @param  {string} currentPassword Current password
   * @param  {string} newPassword     News password
   * @return {promise}                 Result
   */
  changePassword(currentPassword, newPassword) {
    return Qajax({
      url: `${this.url}/users/password`,
      method: 'PUT',
      data: {
        current_password: currentPassword,
        new_password: newPassword
      }
    })
    .then(Qajax.filterSuccess)
    .then(Qajax.toJSON);
  }

  /**
   * Get user by id
   * @param  {number} id User id
   * @return {promise}    User
   */
  getOneById(id) {
    return Qajax({
      url: `${this.url}/users/${id}`,
      method: 'GET'
    })
    .then(Qajax.filterSuccess)
    .then(Qajax.toJSON);
  }

  /**
   * Delete user
   * @param  {number} id User id
   * @return {promise}    Result
   */
  delete(id) {
    return Qajax({
      url: `${this.url}/users/${id}`,
      method: 'DELETE'
    })
    .then(Qajax.filterSuccess)
    .then(Qajax.toJSON);
  }

  /**
   * Update user
   * @param  {number} id   User id
   * @param  {User} user User object
   * @return {promise}      Updated User
   */
  update(id, user) {
    return Qajax({
      url: `${this.url}/users/${id}`,
      method: 'PUT',
      data: user
    })
    .then(Qajax.filterSuccess)
    .then(Qajax.toJSON);
  }
}

export default new UsersApi(BASE_URL);
