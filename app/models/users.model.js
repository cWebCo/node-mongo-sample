const validator = require('validator');

module.exports = mongoose => {
  var schema = mongoose.Schema(
    {
      name: {
        type: String,
        required: [true, 'required']
      },
      email: {
        type: String,
        required: [true, 'required'],
        unique: true, // if you want only one email address
        lowercase: true,
        validate: {
          validator: validator.isEmail,
          message: '{VALUE} is not a valid email',
          isAsync: false
        }
      },
      password: {
        type: String,
        required: [true, 'required']
      },
    },
    { timestamps: true }
  );

  schema.method("toJSON", function () {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
  });

  return mongoose.model("users", schema);
};