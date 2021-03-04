require('dotenv').config();
const Airtable = require('airtable-node');

const airtable = new Airtable({ apiKey: process.env.AIRTABLE_API_KEY })
  .base('appeggUDHephog0p5')
  .table('recipes');

exports.handler = async (event, context) => {
  const { id } = event.queryStringParameters;
  if (id) {
    try {
      const data = await airtable.retrieve(id);
      console.log(data);
      const {
        name,
        images,
        time,
        category,
        description,
        Date: date,
        ingredients,
      } = data.fields;
      const url = images[0].url;
      const recipe = {
        name,
        time,
        url,
        category,
        date,
        description,
        ingredients,
      };
      if (recipe.error) {
        return {
          statusCode: 404,
          body: `no recipes with id ${id}`,
        };
      }
      return {
        headers: {
          'Access-Control-Allow-Origin': '*',
        },
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
