require('dotenv').config();
const Airtable = require('airtable-node');

const airtable = new Airtable({ apiKey: process.env.AIRTABLE_API_KEY })
  .base('appeggUDHephog0p5')
  .table('recipes');

exports.handler = async (event, context) => {
  console.log(event);
  try {
    const { records } = await airtable.list();
    const recipes = records.map(recipe => {
      const { id } = recipe;
      const { name, ingredients, wykonanie, images, trudnosc } = recipe.fields;
      const url = images[0].url;
      return { id, name, url, trudnosc, wykonanie, ingredients };
    });
    return {
      statusCode: 200,
      body: JSON.stringify(recipes),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: 'server error',
    };
  }
};
