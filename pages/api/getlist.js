import firebase from '../../lib/firebase';
import jwtauth from '../../lib/jwtauth';

export default async (req, res) => {
    if (firebase.apps.length) {
        let db=firebase.firestore();
        if (req.method==='GET') {
            let verify = jwtauth(req);
            if (verify) {
                let userRef = db.collection('users').doc(verify.user);
                let error;
                let list;
                try{
                    list = await Promise.all([
                        userRef.collection('watch').get().then(snapshot=>{
                            return snapshot.docs.map(doc=>parseInt(doc.id,10))
                        }),
                        userRef.collection('like').get().then(snapshot=>{
                            return snapshot.docs.map(doc=>parseInt(doc.id,10))
                        })
                    ])
                } catch(e) {
                    error=e
                }
                if (!error) res.json({watch:list[0].slice(1), like:list[1].slice(1)});
                else res.status(400).send("fail");
            }else res.send("fail");
        } else res.send("fail");
    } else res.send("fail");
};