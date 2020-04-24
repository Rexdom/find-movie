import fetch from 'isomorphic-unfetch';
let url = "https://api.themoviedb.org/3/search/movie?api_key="+process.env.movieApiKey

export default async (req,res) => {
    const {query: { slugs }} = req;
    let result = await fetch(`${url}&language=en-US&query=${slugs[0]}&page=${slugs[1]}`)
    let json = await result.json();
    res.json({results: json.results});
}