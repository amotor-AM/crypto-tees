

exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('products').del()
    .then(function () {
      // Inserts seed entries
      return knex('products').insert([
        {
          name: "Mimble Wimble",
          description: "Mimble Wimble is a blockchain technology that prioritizes speed and privacy. Show your support with this ultra stylish shirt.",
          main_image: "/images/product1.png",
          price: 24.99,
          creator: 1,
          rating: 4.50,
          numReviews: 10

        },
        {
          name: "Bitcoin Glitch Logo",
          description: "High Quality",
          main_image: "/images/product2.png",
          price: 24.99,
          creator: 1,
          rating: 4.5,
          numReviews: 15

        },
        {
          name: "Bitcoin Box Logo",
          description: "High Quality",
          main_image: "/images/product3.png",
          price: 24.99,
          creator: 1,
          rating: 5.0,
          numReviews: 25

        },
        {
          name: "Ethereum Box Logo",
          description: "High Quality",
          main_image: "/images/product4.png",
          price: 24.99,
          creator: 1,
          rating: 5,
          numReviews: 5

        },
        {
          name: "Key to the future",
          description: "High Quality",
          main_image: "/images/product5.png",
          price: 24.99,
          creator: 1,
          rating: 4.5,
          numReviews: 15

        },
      ]);
    });
};
