import jwt from "jsonwebtoken";
import { token } from "morgan";
import models from "../models";

async function checkToken(token) {
  let __id = null;
  try {
    const { _id } = await jwt.decode(token);
    __id = _id;
  } catch (e) {
    return false;
  }
  const user = await models.Usuario.findOne({ __id: __id, estado: 1 });
  if (user) {
    const token = jwt.sign({ _id: __id }, "chavesecretaparagenerartoken", {
      expiresIn: "1d",
    });
    return { token, role: user.role };
  } else {
    return false;
  }
}

export default {
  encode: async (_id) => {
    const token = jwt.sign({ _id: _id }, "chavesecretaparagenerartoken", {
      expiresIn: "1d",
    });
    return token;
  },

  decode: async (token) => {
    try {
      const { _id } = await jwt.verify(token, "chavesecretaparagenerartoken");
      const user = await models.Usuario.findOne({ _id, estado: 1 });

      if (user) {
        return user;
      } else {
        return false;
      }
    } catch (e) {
        const newToken = await checkToken(token);
        return token
    }
  },
};
