import firebase from '../../lib/firebase';

export default async (req, res) => {
    if (firebase.apps.length) {
        let db=firebase.firestore();
        if (req.method==='GET') {
            let userRef = db.collection('users').doc('guest');
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
                console.log(list)
            } catch(e) {
                error=e
            }
            console.log("A getlist call at ",Date().toString())
            if (!error) res.json({watch:list[0], like:list[1]});
            else res.send("fail");
        } else res.send("fail");
    } else res.send("fail");
};