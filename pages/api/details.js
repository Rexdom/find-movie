import jwtauth from '../../lib/jwtauth';
import search from '../../lib/search';
import handleResults from '../../lib/handleResults';
import firebase from '../../lib/firebase';

export default async (req,res) => {
    if (firebase.apps.length) {
        let db=firebase.firestore();
        if (req.method === "POST"){
            const {name, id} = req.body;
            const verify = jwtauth(req);
            const movieRef = db.collection('movies').doc(id.toString());
            let results;

            const detailId = await movieRef.get().then(doc=>{
                if (doc.exists) {
                    return doc.data().detailId
                }else return null;
            })

            if (detailId) results = await search(detailId)
            else results = await search(id, name, db)

            if (results) {
                const returnResults = handleResults(results, verify);
                res.json({
                    status:"ok", 
                    results:returnResults
                });
            } else res.json({status:"ok", results:{}})
        }else res.status(400).json({status:"fail"})
    }else res.status(400).json({status:"fail"})
}