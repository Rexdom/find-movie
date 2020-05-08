import firebase from '../../lib/firebase';
import jwtauth from '../../lib/jwtauth';

export default async (req, res) => {
    if (firebase.apps.length) {
        let db=firebase.firestore();
        if (req.method==='POST') {
            let verify = jwtauth(req);
            if (verify) {
                const { type, status, id, details } = req.body;
                const userRef = db.collection('users').doc(verify.user);
                const movieRef = db.collection('movies').doc(id.toString());
                

                await userRef.collection(type).doc(id.toString()).get()
                    .then(async (doc)=>{
                        if (status && !doc.exists) {
                            await userRef.collection(type).doc(id.toString()).set({time: firebase.firestore.FieldValue.serverTimestamp()});
                            await movieRef.get().then(async (doc)=>{
                                if (doc.exists && doc.data()[type]) await Promise.all([
                                    movieRef.set({ info:details},{ merge:true }),
                                    movieRef.update(type,firebase.firestore.FieldValue.increment(1))
                                ])
                                else await movieRef.set({ info:details, [type]:firebase.firestore.FieldValue.increment(1) }, { merge:true });
                            })
                            
                        }else if (!status && doc.exists) {
                            await userRef.collection(type).doc(id.toString()).delete();
                            await movieRef.get().then(async (doc)=>{
                                if (doc.exists && doc.data()[type]) await Promise.all([
                                    movieRef.set({ info:details},{ merge:true }),
                                    movieRef.update(type,firebase.firestore.FieldValue.increment(-1))
                                ])

                            })
                        }
                    })
                res.status(200).send("ok");
            } else res.status(400).send("fail")
        } else res.status(400).send("fail");
    } else res.status(400).send("fail");
}
