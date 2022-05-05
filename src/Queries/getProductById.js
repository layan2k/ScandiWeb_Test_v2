import {Query, client, Field}  from '@tilework/opus'

export const getProductsById = (id) => {
    client.setEndpoint('http://localhost:4000/graphql')
    const query = new Query('product', true)
    .addArgument('id', String, id)
    .addFieldList(['id', 'name', 'gallery', 'description', 'category', 'brand'])
    .addField(
        new Field('attributes')
        .addFieldList(['id', 'name', 'type'])
        .addField(new Field('items')
        .addFieldList(['displayValue', 'value', 'id'])
        )
    )
    const result = client.post(query)

    return result
}