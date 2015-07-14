import Qajax from 'qajax';
import { BASE_URL } from '../conf';

/**
 * Articles Service who use server API for articles
 */
class ArticlesService {
  /**
   * Constructor
   * @param  {string} url Api Base Url 
   */
  constructor(url) {
    this.url = url;
  }

  /**
   * Find all articles
   * @return {promise} List of news
   */
  findAll() {
    return Qajax({
      url: `${this.url}/news`,
      method: 'GET'
    })
    .then(Qajax.filterSuccess)
    .then(Qajax.toJSON);
  }

  /**
   * Get article by slug
   * @param  {string} slug News slug
   * @return {promise}      News object
   */
  get(slug) {
    return Qajax({
      url: `${this.url}/news/${slug}`,
      method: 'GET'
    })
    .then(Qajax.filterSuccess)
    .then(Qajax.toJSON);
  }

  /**
   * Create News
   * @param  {Article} article Article object
   * @return {promise}         Created Article
   */
  create(article) {
    return Qajax({
      url: `${this.url}/news`,
      method: 'POST',
      data: article
    })
    .then(Qajax.filterSuccess)
    .then(Qajax.toJSON);
  }

  /**
   * Delete news
   * @param  {Article} article Article object
   * @return {promise}         Delete result
   */
  delete(article) {
    return Qajax({
      url: `${this.url}/news/${article.id}`,
      method: 'DELETE'
    })
    .then(Qajax.filterSuccess)
    .then(Qajax.toJSON);
  }

  /**
   * Update news
   * @param  {number} id      News id
   * @param  {Article} article Article object
   * @return {promise}         Updated Article
   */
  update(id, article) {
    return Qajax({
      url: `${this.url}/news/${id}`,
      method: 'PUT',
      data: article
    })
    .then(Qajax.filterSuccess)
    .then(Qajax.toJSON);
  }

}

export default new ArticlesService(BASE_URL);
