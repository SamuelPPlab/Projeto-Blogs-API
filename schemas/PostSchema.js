const yup = require('yup');

const postSchema = yup.object().shape({
  title: yup.string()
    .required('"title" is required'),
  content: yup.string()
    .required('"content" is required'),
});

module.exports = {
  postSchema,
};
