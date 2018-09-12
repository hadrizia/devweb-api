var userSchema = new mongoose.Schema({
  name: String,
  photoUrl: String,
  birth: { type: Date, default: Date.now },
  email: String,
  password: String
});
userSchema.methods.speak = function () {
  var greeting = this.name
    ? "Meow name is " + this.name
    : "I don't have a name";
  console.log(greeting);
}
var User = mongoose.model('users', userSchema);

var fluffy = new User({ name: 'fluffy' });
fluffy.speak();