import fetch from 'isomorphic-unfetch';

export default async function search(id, name=null,db=null) {
    let results;
    if (name) {
        await fetch(`https://apis.justwatch.com/content/titles/en_US/popular?body=${encodeURI(`{"content_types":["movie"],"query":"${name}"},"page":1,"page_size":10`)}`)
            .then(res=>res.json())
            .then(obj=>{
                let detailId;
                if (obj.items) {
                    for (let i=0;i<obj.items.length;i++) {
                        let index = 0;
                        while (obj.items[i].scoring[index].provider_type!=="tmdb:id"||obj.items[i].scoring.length<index) index++
                        if (obj.items[i].scoring[index].value===id) {
                            detailId = obj.items[i].id;
                            break;
                        }
                    }
                }
                if (detailId) {
                    db.collection('movies').doc(id.toString()).set({detailId},{merge:true})
                    return fetch(`https://apis.justwatch.com/content/titles/movie/${detailId}/locale/en_US`)
                        .then(res=>res.json()).then(obj=>results=obj)
                } else {
                    db.collection('movies').doc(id.toString()).set({detailId : "not available"},{merge:true})
                    results=null
                }
            })
    }else if (id!=="not available"){
        await fetch(`https://apis.justwatch.com/content/titles/movie/${id}/locale/en_US`)
            .then(res=>res.json()).then(obj=>results=obj)
    } else results = null
    return results
}