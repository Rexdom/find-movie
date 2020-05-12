import fetch from 'isomorphic-unfetch';

export default async function search(id, name=null,db=null) {
    if (name) {
        const res = await fetch(`https://apis.justwatch.com/content/titles/en_US/popular?body=${encodeURI(`{"content_types":["movie"],"query":"${name}"},"page":1,"page_size":10`)}`)
        const obj = res.json()
       
        let movie = obj.items.find(item => {
            const provider = item.scoring.find(provider=>provider.provider_type==="tmdb:id")
            return provider && provider.value === id
        })
                
        if (movie) {
            db.collection('movies').doc(id.toString()).set({detailId: movie.id},{merge:true})
            const movieResult = await fetch(`https://apis.justwatch.com/content/titles/movie/${movie.id}/locale/en_US`)
            return movieResult.json()
        } else {
            db.collection('movies').doc(id.toString()).set({detailId : "not available"},{merge:true})
            return null
        }
    }
    
    if (id!=="not available"){
        const res = await fetch(`https://apis.justwatch.com/content/titles/movie/${id}/locale/en_US`)
        return res.json()
    }
    
    return null
}
