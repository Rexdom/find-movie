import fetch from 'isomorphic-unfetch';

export default async (req,res) => {
    const {query: { para }} = req;
    var content={result:new Array(20)};
    res.json({results: content});
    
}