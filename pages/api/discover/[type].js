import firebase from '../../../lib/firebase';

export default async (req,res) => {
    const { type } = req;
    if (firebase.apps.length) {
        let db=firebase.firestore();
        let movieRef = db.collection('movies');
        let results = await Promise.all([
            movieRef.orderBy('like', 'desc').endBefore(0).get().then(snapshot=>snapshot.docs.map(doc=>{
                let obj={};
                obj.info=doc.data().info;
                obj.like=doc.data().like;
                return obj;
            })),
            movieRef.orderBy('watch', 'desc').endBefore(0).get().then(snapshot=>snapshot.docs.map(doc=>{
                let obj={};
                obj.info=doc.data().info;
                obj.watch=doc.data().watch;
                return obj;
            })),
            movieRef.orderBy('num_of_comments', 'desc').endBefore(0).get().then(snapshot=>snapshot.docs.map(doc=>{
                let obj={};
                obj.info=doc.data().info;
                obj.comments=doc.data().num_of_comments;
                return obj;
            })),
        ])
        res.json({results});
    } else res.status(400).json({status:'fail'})
}