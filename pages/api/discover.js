import firebase from "../../lib/firebase";

export default async (req, res) => {
  if (firebase.apps.length) {
    let db = firebase.firestore();
    let movieRef = db.collection("movies");
    let results = await Promise.all([
      movieRef
        .orderBy("watch", "desc")
        .limit(30)
        .endBefore(0)
        .get()
        .then((snapshot) =>
          snapshot.docs.map((doc) => {
            let obj = {};
            obj = doc.data().info;
            obj.watch = doc.data().watch;
            obj.score = doc.data().total_score
              ? (doc.data().total_score / doc.data().rate_user).toFixed(1)
              : 0;
            return obj;
          })
        ),
      movieRef
        .orderBy("like", "desc")
        .limit(30)
        .endBefore(0)
        .get()
        .then((snapshot) =>
          snapshot.docs.map((doc) => {
            let obj = {};
            obj = doc.data().info;
            obj.like = doc.data().like;
            obj.score = doc.data().total_score
              ? (doc.data().total_score / doc.data().rate_user).toFixed(1)
              : 0;
            return obj;
          })
        ),
      movieRef
        .orderBy("num_of_comments", "desc")
        .limit(30)
        .endBefore(0)
        .get()
        .then((snapshot) =>
          snapshot.docs.map((doc) => {
            let obj = {};
            obj = doc.data().info;
            obj.num_of_comments = doc.data().num_of_comments;
            obj.score = doc.data().total_score
              ? (doc.data().total_score / doc.data().rate_user).toFixed(1)
              : 0;
            return obj;
          })
        ),
    ]);
    res.json({ results });
  } else res.status(400).json({ status: "fail" });
};
