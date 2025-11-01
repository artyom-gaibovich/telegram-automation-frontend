// api/types.ts
export declare namespace Message {
  interface Item {
    message: string;
  }

  namespace Api {
    namespace Rewrite {
      namespace Request {
        type Body = {
          userChannelId: string;
        };
      }

      namespace Response {
        type Data = {
          message: string;
        };
      }
    }
  }
}
