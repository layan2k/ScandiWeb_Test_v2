// Gets All the Currencies with the product data
import { client, Field, Query } from '@tilework/opus';

export const GetAllCurrencies = async () => {
  try {
    client.setEndpoint('http://localhost:4000/graphql');
    const GetAll = new Query('currencies', true).addField('label').addField('symbol');
    let result = await client.post(GetAll);

    return result;
  } catch (error) {
    console.log(error);
  }
};
