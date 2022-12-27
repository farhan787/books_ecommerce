const NewErrorResp = (msg = '', respStatusCode = 0) => {
  const errObj = { isError: false, msg };

  if (msg && msg.length) errObj.isError = true;
  if (respStatusCode) errObj.respStatusCode = respStatusCode;

  return errObj;
};

const NewResp = (success, data = null, msg = '') => {
  if (success === undefined) {
    throw new Error('common/api:NewResp function success is required');
  }

  const respObj = {
    success,
    data,
  };

  if (msg && msg.length) {
    respObj.msg = msg;
  }
  return respObj;
};

module.exports = { NewErrorResp, NewResp };
