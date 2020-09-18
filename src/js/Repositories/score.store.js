import "whatwg-fetch";

class ScoreStore {
  constructor() {
    if (!ScoreStore.instance) {
      ScoreStore.instance = this;
    }

    return ScoreStore.instance;
  }

  save(score) {
    window
      .fetch("/score", {
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
      .then(console.warn("enregistrement effectué avec succès"))
      .catch((e) => console.warn("une erreur est survenue", e));
  }
}

const instance = new ScoreStore();
Object.freeze(instance);

export default instance;
