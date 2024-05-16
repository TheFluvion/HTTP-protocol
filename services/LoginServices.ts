import request from '.';

const LoginServices = {
  getEnv: async () =>
    await fetch('api/getEnv', {
      headers: {
        'Content-Type': 'application/json',
      },
      mode: 'cors',
    }).then((res) =>
      res.json().then((response) => {
        return response.env;
      })
    ),
  login: async (payload) => {
    try {
      return await fetch(
        'https://dev-to2vl2eqwly6uqbe.us.auth0.com/oauth/token',
        {
          headers: {
            'Content-Type': 'application/json',
          },
          mode: 'cors',
          method: 'POST',
          body: JSON.stringify(payload),
        }
      ).then((res) =>
        res.json().then((response) => {
          return { ok: true, data: response };
        })
      );
    } catch (error) {
      return { ok: false, data: {} };
    }
  },
};

export default LoginServices;
