import Error from "../src/components/Error";

export default function customError({ statusCode }) {
  return <Error status={statusCode} />;
}

customError.getInitialProps = ({ res, err }) => {
  const statusCode = res ? res.statusCode : err ? err.statusCode : 404;
  return { statusCode };
};
