const messages = {
  successResponse: 'Success',
  isAlreadyActivated: 'The user has already been active.',
  unauthorized: 'The user is unauthorized.',
  wrongTypeOfId: 'Wrong type of id',
  shouldIncludeId: 'Request params should include id',
  noItem: 'No item founded',
  noImages: 'No files were uploaded',
  fileUpload: 'File uploaded!',
  unexpectedError: 'Unexpected Error',
  invalidCredential: 'An invalid credential',
  notUserWithLink: 'Not a user with the current link.',
  userExist(email) {
    return `User with email ${email} is already exist`;
  },
  userNotExist(email) {
    return `User with email ${email} is not exist`;
  },
};

module.exports = messages;
