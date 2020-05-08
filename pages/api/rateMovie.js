import firebase from '../../lib/firebase';
import jwtauth from '../../lib/jwtauth';

export default async (req, res) => {
    if (firebase.apps.length) {
        let db=firebase.firestore();
        if (req.method==='POST') {
            let verify = jwtauth(req);
            if (verify) {
                const {id,score}=req.body;
                let movieRef = db.collection('movies').doc(id.toString());
                let userRef = db.collection('users').doc(verify.user).collection('score').doc(id.toString());
                let error;
                let new_score;
                try{
                    await Promise.all([
                        movieRef.set({
                            rate_user:firebase.firestore.FieldValue.increment(1),
                            total_score:firebase.firestore.FieldValue.increment(score),
                        },{merge:true}),
                        userRef.set({value:score})
                    ])
                    new_score = await movieRef.get().then(doc=>{
                        return doc.data().total_score/doc.data().rate_user
                    })
                } catch(e) {
                    error=e
                }
                if (!error) res.json({status:"ok", new_score});
                else res.status(400).json({status:"fail"});
            }else res.status(400).json({status:"fail"});
        } else res.status(400).json({status:"fail"});
    } else res.status(400).json({status:"fail"});
};