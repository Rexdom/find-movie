import jwtauth from '../../../lib/jwtauth';
import search from '../../../lib/search';
import handleResults from '../../../lib/handleResults';
import firebase from '../../../lib/firebase';

export default async (req,res) => {
    const {query:{type}}=req
    if (firebase.apps.length) {
        let db=firebase.firestore();
        if (type==="details"&&req.method === "POST"){
            const {name, id} = req.body;
            const verify = jwtauth(req);
            const movieRef = db.collection('movies').doc(id.toString());
            let results;

            const detailId = await movieRef.get().then(doc=>{
                if (doc.exists) {
                    return doc.data().detailId
                }else return null;
            })

            if (detailId) results = await search(detailId);
            else results = await search(id, name, db);

            if (results) {
                const returnResults = handleResults(results, verify);
                res.json({
                    status:"ok", 
                    results:returnResults
                });
            } else res.json({status:"ok", results:{}})
        }else if (type==="getlist" && req.method==='GET') {
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
                else res.status(400).json({status:"fail"})
            }else res.status(400).json({status:"fail"})
        } else res.status(400).json({status:"fail"})
    }else res.status(400).json({status:"fail"})
}