import firebase from '../../lib/firebase';

export default async (req, res) => {
    if (firebase.apps.length) {
        let db=firebase.firestore();
        if (req.method==='GET') {
            let userRef = db.collection('users').doc('guest');
            let movieRef = db.collection('movies');
            let error;
            let data={};
            let queries=[];
            try{
                let obj = await userRef.get();
                let array = obj.data();
                if (array.length>0) {
                    for (let i=0;i<array.length/10;i++){
                        queries.push(movieRef.where(
                            firebase.firestore.FieldPath.documentId(),
                            'in',
                            array.slice(i*10,i*10+10)
                        ).select('info').get());
                    }
                }
                const details = await Promise.all(queries);
                data= {array, details};
            } catch(e) {
                error=e
            }
            if (!error) res.json(data);
            else res.send("fail");
        } else res.send("fail");
    } else res.send("fail");
};