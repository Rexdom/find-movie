export default function search(results, verify) {
  let score_provider = ["tomato:meter", "imdb:score"];
  let obj = {
    description: results.short_description,
    photos: results.backdrops
      ? results.backdrops.map(
          (photo) =>
            `https://images.justwatch.com${photo.backdrop_url.replace(
              "{profile}",
              "s1440"
            )}`
        )
      : null,
    videos: results.clips
      ? results.clips
          .filter((video) => video.provider === "youtube")
          .map((video) => {
            return {
              preview: `https://img.youtube.com/vi/${video.external_id}/mqdefault.jpg`,
              url: `https://www.youtube.com/embed/${video.external_id}`,
            };
          })
      : null,
    score: results.scoring
      ? results.scoring.filter((detail) =>
          score_provider.includes(detail.provider_type)
        )
      : null,
  };
  let offers = {};

  if (verify) {
    let offer_provider = {
      2: "iTunes",
      3: "GooglePlay",
      7: "Vudu",
      10: "Amazon",
    };
    offers = {
      iTunes: { rent: null, buy: null, url: null },
      GooglePlay: { rent: null, buy: null, url: null },
      Vudu: { rent: null, buy: null, url: null },
      Amazon: { rent: null, buy: null, url: null },
    };
    if (results.offers) {
      for (let i = 0; i < results.offers.length; i++) {
        if (offer_provider[results.offers[i].provider_id]) {
          if (
            offers[offer_provider[results.offers[i].provider_id]][
              results.offers[i].monetization_type
            ] === null ||
            offers[offer_provider[results.offers[i].provider_id]][
              results.offers[i].monetization_type
            ] > results.offers[i].retail_price
          ) {
            offers[offer_provider[results.offers[i].provider_id]][
              results.offers[i].monetization_type
            ] = results.offers[i].retail_price;
            offers[offer_provider[results.offers[i].provider_id]].url =
              results.offers[i].urls.standard_web;
          }
        }
      }
    }
  } else {
    let offer_provider = {
      2: "iTunes",
    };
    offers = {
      iTunes: { rent: null, buy: null, url: null },
    };
    if (results.offers) {
      for (let i = 0; i < results.offers.length; i++) {
        if (offer_provider[results.offers[i].provider_id]) {
          if (
            offers[offer_provider[results.offers[i].provider_id]][
              results.offers[i].monetization_type
            ] === null ||
            offers[offer_provider[results.offers[i].provider_id]][
              results.offers[i].monetization_type
            ] > results.offers[i].retail_price
          ) {
            offers[offer_provider[results.offers[i].provider_id]][
              results.offers[i].monetization_type
            ] = results.offers[i].retail_price;
            offers[offer_provider[results.offers[i].provider_id]].url =
              results.offers[i].urls.standard_web;
          }
        }
      }
    }
  }

  obj.offers = offers;
  return obj;
}
