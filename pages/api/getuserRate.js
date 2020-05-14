import firebase from "../../lib/firebase";
import jwtauth from "../../lib/jwtauth";

export default async (req, res) => {
  const {
    query: { id },
  } = req;
  if (firebase.apps.length) {
    let db = firebase.firestore();
    if (req.method === "GET") {
      let verify = jwtauth(req);
      if (verify) {
        const userRef = db.collection("users").doc(verify.user);
        let error;
        let score;
        try {
          score = await userRef
            .collection("score")
            .doc(id.toString())
            .get()
            .then((doc) => {
              if (doc.exists) return doc.data().value;
              else return null;
            });
        } catch (e) {
          error = e;
        }
        if (!error) res.json({ score });
        else res.status(400).send("fail");
      } else res.send("fail");
    } else res.send("fail");
  } else res.send("fail");
};
