export const user = (obj) => {
  let u = {
    email: obj.email,
    username: obj.username,
    firstname: obj.firstname,
    lastname: obj.lastname,
    password: obj.password,
    id: obj.id,
  };

  return u;
};
