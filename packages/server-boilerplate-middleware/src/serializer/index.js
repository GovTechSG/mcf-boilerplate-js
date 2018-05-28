import bodyParser from 'body-parser';

const BODY_SIZE_LIMIT = '4200kb';

module.exports = serializer;

/**
 * Returns an express.js compatible middleware which transforms POST data into
 * a JSON data structure available at req.body.
 *
 * @return {Function}
 */
export default function serializer() {
  return [
    bodyParser.json({
      extended: true,
      limit: BODY_SIZE_LIMIT,
    }),
    bodyParser.urlencoded({
      extended: true,
      limit: BODY_SIZE_LIMIT,
    }),
  ];
}
