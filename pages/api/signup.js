import createjwt from '../../lib/createjwt';
import firebase from '../../lib/firebase';

export default async (req,res) => {
    if (req.method==="POST") {
        const {email,password} = req.body;
        let error;
        await firebase.auth().createUserWithEmailAndPassword(email, password)
            .catch(err=>error=err.message)        
        if (!error) {
            firebase.firestore().collection('users').doc(email).collection('watch').doc('0').set({initialize:true});
            firebase.firestore().collection('users').doc(email).collection('like').doc('0').set({initialize:true});
            const token = createjwt(email);
            res.status(200).json({status:'ok', token})
        } else res.status(400).json({status:'fail', err:error})
    }
}