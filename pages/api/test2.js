import nextConnect from 'next-connect';
import middleware from '../../middlewares/middleware';

const handler = nextConnect();

handler.use(middleware);

handler.get(async (req, res) => {
    try{
        if (req.db) {
            console.log('loaded db');
            await req.db.collection('users').add({
                capital: true,
                user: true
            }).then(()=> {
                return res.json({
                    ok: true
                })
            }).catch(()=>{
                console.log('cant add data');
                throw new Error('cant add data');
            });
        } else {
            console.log('cant load db');
            throw new Error('cant load db');
        }
    } catch(err) {
        console.log('cant load db / add data');
        return res.json({
            ok: false,
            message: err.toString()
        });
    }
});

// handler.get(async (req, res) => {
//     if (req.db) {
//         let ref = req.db.collection('users');
//         // ref.add({
//         //     capital: false,
//         //     user: Math.random()*100
//         // });
//         // res.json({
//         //     ok:true,
//         //     data: 'updated'
//         // });
        
//         ref.get().then((docs)=>{
//             docs.forEach(doc=>{
//                 console.log('Data exist?: ', doc.exists);
//                 console.log(doc.data().user)
//             });
//         }).catch(()=>{
//             console.log('data: error getting data')
//         })
//         return res.json({
//             ok:true,
//             data: 'updated'
//         })
//     }
//     return res.json({
//         ok:false,
//         data: 'cannot updated'
//     })
// });

export default handler;