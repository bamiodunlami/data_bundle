import { response } from '#util/responder';

export const verifyInput = (...expectedValues) => {
  return (req, res, next) => {
    if (!req.body) return response(res, 400, false, 'All fields are required', {});
    
    //check if all values expected are filled in
    const inputValueArray = Object.keys(req.body);
    const areEqual = expectedValues.length === inputValueArray.length && inputValueArray.every((item) => expectedValues.includes(item));
    if (!areEqual) return response(res, 400, false, 'Fill the required field', {});

    //select only the expected values
    const payload = {};
    Object.keys(req.body).map((el) => {
      if (expectedValues.includes(el)) {
        payload[el] = req.body[el];
      }
    });
    req.body = payload;
    next();
  };
};
