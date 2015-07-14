import Qajax from 'qajax';
import { BASE_URL } from '../conf';

/**
 * Article Comments Service who use server API for articles comment
 */
class CommentsService {
  /**
   * Constructor
   * @param  {string} url Api Base Url 
   */
  constructor(url) {
    this.url = url;
  }

  /**
   * Create new comment
   * @param  {Comment} comment Comment object
   * @return {promise}         Created Comment
   */
  create(comment) {
    return Qajax({
      url: `${this.url}/comments`,
      method: 'POST',
      data: comment
    })
    .then(Qajax.filterSuccess)
    .then(Qajax.toJSON);
  }

  /**
   * Update comment
   * @param  {number} id      Comment id
   * @param  {Comment} comment Comment object
   * @return {promise}         Updated Comment
   */
  update(id, comment) {
    return Qajax({
      url: `${this.url}/comments/${id}`,
      method: 'PUT',
      data: comment
    })
    .then(Qajax.filterSuccess)
    .then(Qajax.toJSON);
  }

  /**
   * Delete comment
   * @param  {number} id Comment id
   * @return {promise}    Delete result
   */
  delete(id) {
    return Qajax({
      url: `${this.url}/comments/${id}`,
      method: 'DELETE'
    })
    .then(Qajax.filterSuccess)
    .then(Qajax.toJSON);
  }

  /**
   * Get all comment by article slug
   * @param  {string} slug Article slug
   * @return {promise}      List of comments
   */
  getAllBySlug(slug) {
    return Qajax({
      url: `${this.url}/comments/news/${slug}`,
      method: 'GET'
    })
    .then(Qajax.filterSuccess)
    .then(Qajax.toJSON);
  }
}

export default new CommentsService(BASE_URL);
