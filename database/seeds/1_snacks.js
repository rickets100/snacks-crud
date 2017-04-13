exports.seed = (knex) => {
  return knex('snacks').del()
    .then(() => {
      return knex('snacks').insert([
        {
          id: 1,
          name: 'Cheez-its',
          image_url: 'http://scene7.samsclub.com/is/image/samsclub/0002410012203_A?$img_size_380x380$',
          review_description: 'Cheez-its are a tasty snack food product.',
          rating: 3,
        },
        {
          id: 2,
          name: 'Smart Food',
          image_url: 'http://www.fritolay.com/images/default-source/blue-bag-image/smartfood-white-cheddar-cheese.png?sfvrsn=2',
          review_description: 'Smart food is also a tasty snack food product.',
          rating: 3,
        },
        {
          id: 3,
          name: 'Pretzels',
          image_url: 'https://s3.amazonaws.com/user-media.venngage.com/345654-5c7ca5df17a375f5f6b8303b03564062.jpg',
          review_description: 'Who doesn\'t like pretzels? Come on.',
          rating: 4,
        }
      ])
    }).then(() => {
      return knex.raw(
        "SELECT setval('snacks_id_seq', (SELECT MAX(id) FROM snacks));"
      )
    })
}
