import fetch from 'isomorphic-unfetch';

export default async (req,res) => {
    console.log("Clicked");
    let load = await fetch("https://www.amazon.com/Frozen-Kristen-Bell/dp/B00J2PCCYQ",{
        headers: {
        'User-Agent': 'Mozilla/5.0 (Macintosh; U; Intel Mac OS X 10.6; rv:1.9.2.16) Gecko/20110319 Firefox/3.6.16'
        }
    });
    let text = await load.text();
    console.log(load);
    res.send(text);
}