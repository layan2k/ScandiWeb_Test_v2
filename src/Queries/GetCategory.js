// Get Category, expects an id to passed into the fuction to work
import { client, Field, Query } from '@tilework/opus';

export const GetCategory = async (categoryitem) => {
    try {
        client.setEndpoint('http://localhost:4000/graphql');
        const query = new Query('category')
            .addArgument('input', 'CategoryInput', { title: categoryitem })
            .addField('name')
            .addField(
                new Field('products')
                    .addFieldList(['id', 'name', 'inStock', 'gallery', 'brand'])
                    .addField(
                        new Field('attributes')
                            .addFieldList(['id', 'name', 'type'])
                            .addField(
                                new Field('items').addFieldList([
                                    'displayValue',
                                    'value',
                                    'id'
                                ])
                            )
                    )
                    .addField(
                        new Field('prices')
                            .addField(
                                new Field('currency').addFieldList([
                                    'label',
                                    'symbol'
                                ])
                            )
                            .addField('amount')
                    )
            );

        let result = await client.post(query);

        return result;
    } catch (error) {
        console.log(error);
    }
};
