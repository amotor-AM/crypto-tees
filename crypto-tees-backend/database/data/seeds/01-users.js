
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('users').del()
    .then(function () {
      // Inserts seed entries
      return knex('users').insert([
        {name: 'Alex', role: "admin", password: "temp", email: "test@test.com"},
        {name: 'customer', password: "temp", email: "test1@test.com"},
        {name: "seller", role: "seller", password: "temp", email: "test2@test.com"}
      ]);
    });
};
