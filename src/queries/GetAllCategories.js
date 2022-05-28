// Gets All the Categories with the product data
import { client, Field, Query } from '@tilework/opus';

export const GetAllCategories = async () => {
  try {
    client.setEndpoint('http://localhost:4000/graphql');
    const GetAll = new Query('categories', true).addField('name');
    let result = await client.post(GetAll);

    return result;
  } catch (error) {
    console.log(error);
  }
};
