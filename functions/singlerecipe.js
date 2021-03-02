require('dotenv').config();
const Airtable = require('airtable-node');

const airtable = new Airtable({ apiKey: process.env.AIRTABLE_API_KEY })
  .base('appeggUDHephog0p5')
  .table('recipes');

exports.handler = async (event, context) => {
  const { id } = event.queryStringParameters;
  if (id) {
    try {
      const recipe = await airtable.retrieve(id);
      if (recipe.error) {
        return {
          statusCode: 404,
          body: `no recipes with id ${id}`,
        };
      }
      return {
        statusCode: 200,
        body: JSON.stringify(recipe),
      };
    } catch (error) {
      return {
        statusCode: 404,
        body: `no recipes with id ${id}`,
      };
    }
  }
  return {
    statusCode: 400,
    body: 'server error',
  };
};
