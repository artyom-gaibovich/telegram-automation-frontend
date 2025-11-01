export declare namespace Auth {
  interface User {
    id: string;
    email: string;
  }

  interface TokenResponse {
    access_token: string;
  }

  interface RegisterResponse {
    accessToken: string;
  }

  namespace Api {
    namespace Login {
      namespace Request {
        type Body = {
          email: string;
          password: string;
        };
      }
      namespace Response {
        type Data = TokenResponse;
      }
    }

    namespace Register {
      namespace Request {
        type Body = {
          email: string;
          password: string;
        };
      }
      namespace Response {
        type Data = RegisterResponse;
      }
    }

    namespace GetProfile {
      namespace Response {
        type Data = User;
      }
    }
  }
}
