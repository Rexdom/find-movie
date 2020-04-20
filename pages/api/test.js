import firebase from '../../lib/firebase';

export default (req, res) => {
    return new Promise((resolve) => {
        if (firebase.apps.length) {
            let db=firebase.firestore();
            if (req.method==='GET') {
                db.collection('user').get().then(()=>{
                    res.json({ok:true, message:'this is a get'});
                    return resolve()
                }).catch(()=>{
                    res.json({ok:false, message:`db connection error`});
                    return resolve()
                });
                    // .then((docs)=>{
                    //     let data =[];
                    //     docs.forEach(doc=>data.push(doc.data()));
                    //     res.json({ok:true,nok:"data"});
                    // }).catch(()=>{
                    //     res.json({ok:false,message:"error occured"})
                    // })
                // res.json({ok:true})
            } else if (req.method==='POST'){
                // db.collection('user').add({user:Math.random()})
                // .then(()=>{
                //     res.json({ok:true})
                //     return resolve()
                // })
                res.json({ok:true, message:'this is a '+req.method});
                return resolve();
            } else {
                res.json({ok:false, message:'this is ???'})
            }
        } else { 
            res.json({
                ok: false,
                message: "there is some problem",
            });
            return resolve();
        }
    })
};