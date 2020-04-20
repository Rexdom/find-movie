import fetch from 'isomorphic-unfetch';

export default async (req,res) => {
    const {query: { para }} = req;
    var content={};
    let load = await fetch("https://itunes.apple.com/search?"+
        "media=movie&limit=100&term="+para[0])
        .then(async (response)=>{
            let json = await response.json();
            for (let i=0;i<json.results.length;i++) {
                if (json.results[i].releaseDate.slice(0,4)==para[1]
                 &&Math.trunc(json.results[i].trackTimeMillis/60000)==para[2]){
                    content={
                        price: json.results[i].trackRentalPrice||json.results[i].trackPrice,
                        url: json.results[i].trackViewUrl,
                    }
                    break;
                }
            }
            // json.results.forEach(result=> content.push({
            //     name: result.trackName,
            //     censoredName: result.trackCensoredName,
            //     date: result.releaseDate.slice(0,4),
            //     time: Math.trunc(result.trackTimeMillis/60000),
            //     price: result.trackRentalPrice||result.trackPrice,
            //     url: result.trackViewUrl,
            // }));
        })
    res.json({results: content});
    
}