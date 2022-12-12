export const asyncCall = async () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => resolve('this works as expected'), 1000);
  })
};

export const asyncCallFailed = async (errMessage: string = 'this DID NOT work') => {
  return new Promise((resolve, reject) => {
    setTimeout(() => reject(new Error(errMessage)), 1000);
  })
};


export const catchErrMessage = async () => {
  try {
    await asyncCallFailed('Error has been caught and reported');
  } catch (err) {
    return err.message;
  }
}

export const throwErr = async () => {
  try {
    await asyncCallFailed('Error has been caught and reported');
  } catch (err) {
    throw err;
  }
}

export const catchErr = async () => {
  await throwErr().catch();
  return true;
}

export const catchErr2 = async () => {
  throwErr().catch();
  return true;
}

export const catchErr3 = () => {
  throwErr().catch();
  return true;
}
