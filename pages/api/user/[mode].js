import createjwt from '../../../lib/createjwt';
import firebase from '../../../lib/firebase';

export default async (req,res) => {
    const {query:{mode}}=req;
    if (mode==='login'){
        if (req.method==="POST") {
            const {email,password} = req.body;
            let error;
            await firebase.auth().signInWithEmailAndPassword(email, password)
                .then(()=>email)
                .catch(err=>error=err.message)
            if (!error) {
                const token = createjwt(email);
                res.status(200).json({status:'ok', token:token})
            } else res.status(400).json({status:'fail', err:error})
        }
    } else if (mode==='signup'){
        if (req.method==="POST") {
            const {email,password} = req.body;
            let error;
            await firebase.auth().createUserWithEmailAndPassword(email, password)
                .catch(err=>error=err.message)        
            if (!error) {
                try{
                    await Promise.all([
                        firebase.firestore().collection('users').doc(email).collection('watch').doc('0').set({initialize:true}),
                        firebase.firestore().collection('users').doc(email).collection('like').doc('0').set({initialize:true}),
                        // firebase.firestore().collection('users').doc(email).collection('score').doc('0').set({initialize:true}),
                    ])
                } catch(e) {
                    res.status(400).json({status:'fail', err:e})
                }
                const token = createjwt(email);
                res.status(200).json({status:'ok', token})
                
            } else res.status(400).json({status:'fail', err:error})
        }
    }else res.status(400).json({status:'fail'})
    
}
    