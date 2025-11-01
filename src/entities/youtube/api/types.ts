// api/types.ts
export declare namespace Youtube {
  interface Comment {
    author: string;
    text: string;
    publishedAt: string;
  }

  interface VideoInfo {
    title: string;
    tags: string[];
  }

  interface UploadResult {
    filename: string;
    result: string;
    prompt: string;
  }

  namespace Api {
    namespace GetComments {
      namespace Request {
        type Body = {
          videoUrl: string;
          categoryId: string;
        };
      }

      namespace Response {
        type Data = string; // возвращается отформатированный текст сообщения
      }
    }

    namespace Upload {
      namespace Request {
        type Params = {
          categoryId: string;
          code: string;
        };
      }

      namespace Response {
        type Data = UploadResult;
      }
    }

    namespace UploadMultiple {
      namespace Request {
        type Params = {
          categoryId: string;
          code: string;
        };
      }

      namespace Response {
        type Data = {
          message: string;
          results: {
            file: string;
            result: UploadResult;
          }[];
        };
      }
    }
  }
}
