import "whatwg-fetch";

/**
 * Singleton http class to interact with score routes from api
 * @class
 */
class ScoreService {
  /**
   * called with the new keyword, this create singleton ScoreService instance
   * @constructs
   * @return { ScoreService } the ScoreService instance
   * */
  constructor() {
    if (!ScoreService.instance) {
      ScoreService.instance = this;
    }

    return ScoreService.instance;
  }

  /**
   * Call api to save the new score.
   * @param { Score } score.model instance
   * @return { Promise } the async result
   * */
  save(score) {
    fetch(`${process.env.MEMORY_API_URL}/scores`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: score.name,
        time: score.time,
      }),
    })
      .then((res) => res.json())
      .catch((e) => Promise.reject(e))
      .then((message) =>
        console.warn("enregistrement effectué avec succès", message)
      )
      .catch((e) => console.warn("une erreur est survenue", e));
  }

    /**
   * Call api to get the top 10 best scores from api.
   * @return { Promise } a promised score list 
   * */
  findAll() {
    return fetch(`${process.env.MEMORY_API_URL}/scores`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .catch((e) => Promise.reject(e))
      .then((message) => message)
      .catch((e) => console.warn("une erreur est survenue", e));
  }
}

const instance = new ScoreService();
Object.freeze(instance);

export default instance;
