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

  export type TranslateResult = {
    filename: string;
    result: string;
  };

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

    export namespace UploadSingle {
      export namespace Request {
        export type Params = {
          code: string;
          seo_tags?: string[]; // если нужно передавать SEO теги
        };
      }

      export namespace Response {
        export type Data = {
          file: string;
          result: TranslateResult[]; // массив результатов перевода
          message: string; // сообщение от сервера
        };
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
