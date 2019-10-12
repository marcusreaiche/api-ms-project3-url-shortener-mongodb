function handleAsyncError(err) {
    console.log(err.message);
    return err;
  }

module.exports = handleAsyncError;