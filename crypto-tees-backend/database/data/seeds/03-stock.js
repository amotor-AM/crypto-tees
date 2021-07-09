
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('stock').del()
    .then(function () {
      // Inserts seed entries
      return knex('stock').insert([
        {product: 1, small: 0, medium: 100, large: 100, Xlarge: 100},
        {product: 2, small: 100, medium: 100, large: 100, Xlarge: 100},
        {product: 3, small: 100, medium: 100, large: 100, Xlarge: 100},
        {product: 4, small: 100, medium: 9, large: 100, Xlarge: 100},
        {product: 5, small: 100, medium: 100, large: 100, Xlarge: 100},
      ]);
    });
};
