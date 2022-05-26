// Gets Product By Id and expects and id to be passed in
import { Query, client, Field } from '@tilework/opus';

export const getProductsById = async id => {
  client.setEndpoint('http://localhost:4000/graphql');
  const query = new Query('product')
    .addArgument('id', 'String!', id)
    .addFieldList(['id', 'name', 'gallery', 'description', 'category', 'brand', 'inStock'])
    .addField(
      new Field('attributes')
        .addFieldList(['id', 'name', 'type'])
        .addField(new Field('items').addFieldList(['displayValue', 'value', 'id']))
    )
    .addField(
      new Field('prices')
        .addField(new Field('currency').addFieldList(['label', 'symbol']))
        .addField('amount')
    );
  const result = await client.post(query);

  return result;
};
