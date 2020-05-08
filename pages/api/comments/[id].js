import firebase from '../../../lib/firebase';
import jwtauth from '../../../lib/jwtauth';

export default async (req, res) => {
    if (firebase.apps.length) {
        let db=firebase.firestore();
        if (req.method==='GET') {
            let movieRef = db.collection('movies').doc(req.query.id.toString());
            const comments = await movieRef.get().then(doc=>{
                if (doc.exists) {
                    return doc.data().comments
                }else return null;
            })
            if (comments) {
                res.json({results:comments})
            }
            else {
                res.json({results:[]})
            }
        }else if (req.method==='POST') {
            let verify = jwtauth(req);
            if (verify) {
                let movieRef = db.collection('movies').doc(req.query.id.toString());
                let obj = {user:verify.user, time:req.body.time, comment:req.body.comment}
                let error;
                let comments;
                try{
                    await movieRef.get().then(async (doc)=>{
                        if (doc.exists&&doc.data().comments) {
                            await Promise.all([
                                movieRef.set({info: req.body.info,comments:firebase.firestore.FieldValue.arrayUnion(obj)},{merge:true}),
                                movieRef.update('num_of_comments',firebase.firestore.FieldValue.increment(1))
                            ])
                        }else {
                            movieRef.set({
                                info: req.body.info,
                                comments:firebase.firestore.FieldValue.arrayUnion(obj),
                                num_of_comments:firebase.firestore.FieldValue.increment(1)
                            },{merge:true})
                        }
                        comments = await movieRef.get().then(doc=>doc.data().comments)
                    })
                } catch(e) {
                    error=e
                }
                if (!error) res.json({status:"ok", comments});
                else res.status(400).json({status:"fail"});
            }else res.status(400).json({status:"fail"});
        } else res.status(400).json({status:"fail"});
    } else res.status(400).json({status:"fail"});
};