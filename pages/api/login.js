import createjwt from '../../lib/createjwt';
import firebase from '../../lib/firebase';

export default async (req,res) => {
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
}
    