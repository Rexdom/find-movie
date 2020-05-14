import jwtauth from "../../lib/jwtauth";

export default async (req, res) => {
  const verify = jwtauth(req);
  if (verify) res.status(200).send("ok");
  else res.status(400).send("fail");
};
