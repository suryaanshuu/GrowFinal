const bcrypt = require('bcryptjs');

const password = 'password';

bcrypt.hash(password, 10, (err, hash) => {
  if (err) {
    console.error(err);
  } else {
    console.log(hash);
  }
});
