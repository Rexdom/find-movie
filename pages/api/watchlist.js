import firebase from "../../lib/firebase";
import jwtauth from "../../lib/jwtauth";

export default async (req, res) => {
  if (firebase.apps.length) {
    let db = firebase.firestore();
    if (req.method === "GET") {
      let verify = jwtauth(req);
      if (verify) {
        let userRef = db.collection("users").doc(verify.user);
        let movieRef = db.collection("movies");
        let error;
        let data = {};
        let queries = [];
        try {
          let ori_arr = await userRef
            .collection("watch")
            .get()
            .then((snapshot) => {
              return snapshot.docs.map((doc) => doc.id);
            });
          let array = ori_arr.slice(1);
          if (array.length > 0) {
            for (let i = 0; i < array.length / 10; i++) {
              queries.push(
                movieRef
                  .where(
                    firebase.firestore.FieldPath.documentId(),
                    "in",
                    array.slice(i * 10, i * 10 + 10)
                  )
                  .get()
              );
            }
          }
          const snapshots = await Promise.all(queries);
          const movies = snapshots
            .map((snapshot) =>
              snapshot.docs.map((doc) => {
                return Object.assign(
                  { ...doc.data().info },
                  {
                    score: doc.data().total_score
                      ? (doc.data().total_score / doc.data().rate_user).toFixed(
                          1
                        )
                      : 0,
                  }
                );
              })
            )
            .flat();
          data = { results: movies };
        } catch (e) {
          error = e;
        }
        if (!error) res.json(data);
        else res.send("fail");
      } else res.send("fail");
    } else res.send("fail");
  } else res.send("fail");
};
