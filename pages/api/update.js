import firebase from '../../lib/firebase';

export default async (req, res) => {
    if (firebase.apps.length) {
        let db=firebase.firestore();
        if (req.method==='POST') {
            const userRef = db.collection('users').doc('guest');
            const movieRef = db.collection('movies');
            const { type, status, id, details } = req.body;

            userRef.collection(type).doc(id.toString()).get()
                .then(doc=>{
                    if (status && !doc.exists) {
                        userRef.collection(type).doc(id.toString()).set({time: firebase.firestore.FieldValue.serverTimestamp()});
                        movieRef.doc(id.toString()).set({ info:details, [type]:firebase.firestore.FieldValue.increment(1) }, { merge:true });
                    }else if (!status && doc.exists) {
                        userRef.collection(type).doc(id.toString()).delete();
                        movieRef.doc(id.toString()).set({ info:details, [type]:firebase.firestore.FieldValue.increment(-1) }, { merge:true });
                    }
                })
            res.send("ok");
        } else res.send("fail");
    } else res.send("fail");
}
