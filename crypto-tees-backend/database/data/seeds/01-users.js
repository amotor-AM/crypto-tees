exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('users').del()
    .then(function () {
      // Inserts seed entries
      return knex('users').insert([
        {name: 'Alex', role: "admin", password: "test", email: "test@test.com"},
        {name: 'customer', password: "temp", email: "test1@test.com"}
      ]);
    });
};
