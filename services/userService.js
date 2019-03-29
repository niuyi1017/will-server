module.exports = {
  signUp: async (username, passworld, confirmPassword) => {
   return {
     username,
     passworld,
     confirmPassword
   }
 },
 signIn: async (username, passworld) => {
    return {
      username,
      passworld
    }
  }
}