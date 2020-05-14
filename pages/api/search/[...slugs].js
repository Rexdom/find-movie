import fetch from "isomorphic-unfetch";
import firebase from "../../../lib/firebase";
let url =
  "https://api.themoviedb.org/3/search/movie?api_key=" +
  process.env.movieApiKey;

export default async (req, res) => {
  if (firebase.apps.length) {
    let db = firebase.firestore();
    const {
      query: { slugs },
    } = req;
    const movieRef = db.collection("movies");
    let result = await fetch(
      `${url}&language=en-US&query=${encodeURIComponent(slugs[0])}&page=${
        slugs[1]
      }`
    );
    let json = await result.json();
    let results = json.results;
    let arr = results.map((movie) => movie.id.toString());
    let queries = [];
    if (arr.length > 0) {
      for (let i = 0; i < arr.length / 10; i++) {
        queries.push(
          movieRef
            .where(
              firebase.firestore.FieldPath.documentId(),
              "in",
              arr.slice(i * 10, i * 10 + 10)
            )
            .get()
        );
      }
    }
    const snapshots = await Promise.all(queries);
    snapshots.map((snapshot) => {
      for (let doc of snapshot.docs) {
        let i = 0;
        while (results[i].id.toString() !== doc.id) {
          i++;
        }
        results[i].score = doc.data().total_score
          ? (doc.data().total_score / doc.data().rate_user).toFixed(1)
          : 0;
      }
    });
    res.json({ results });
  } else res.status(400).json({ status: "fail" });
};
