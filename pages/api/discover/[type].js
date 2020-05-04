import firebase from '../../../lib/firebase';

export default async (req,res) => {
    const {query: { type }} = req;
    const name = {
        comment:'num_of_comments',
        watchlist: 'watch',
        like: 'like',
    }
    if (name[type]){
        if (firebase.apps.length) {
            let db=firebase.firestore();
            let movieRef = db.collection('movies');
            let results = await movieRef.orderBy(name[type], 'desc').limit(50).endBefore(0).get()
                .then(snapshot=>snapshot.docs.map(doc=>{
                    let obj={};
                    obj=doc.data().info;
                    obj[name[type]]=doc.data()[name[type]];
                    return obj;
                }))
            res.json({results});
        } else res.status(400).json({status:'fail'})
    }   
}