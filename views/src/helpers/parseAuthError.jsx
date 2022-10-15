export default function (err) {
  console.log(err.code);
  let error;
  switch (err.code) {
    case "auth/wrong-password":
    case "auth/user-not-found":
      error = {
        name: "password",
        type: "auth error",
        message: "Invalid email or password",
      };
      break;
    case "auth/email-already-in-use":
      error = {
        name: "email",
        type: "auth error",
        message: "Email is already in use",
      };
      break;
    case "auth/missing-email":
      error = {
        name: "email",
        type: "auth error",
        message: "Please enter your email address",
      };
      break;
  }
  return error;
}
