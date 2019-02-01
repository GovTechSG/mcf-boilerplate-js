import bodyParser from 'body-parser';

const BODY_SIZE_LIMIT = '4200kb';

/**
 * Returns an express.js compatible middleware which transforms POST data into
 * a JSON data structure available at req.body.
 *
 */
export const serializer = () => {
  return [
    bodyParser.json({
      limit: BODY_SIZE_LIMIT,
    }),
    bodyParser.urlencoded({
      extended: true,
      limit: BODY_SIZE_LIMIT,
    }),
  ];
};
