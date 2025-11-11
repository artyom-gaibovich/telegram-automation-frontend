export declare namespace Transcription {
  interface Item {
    id: string;
    fileName: string;
    code: string;
    content: string;
    order: number;
  }

  namespace Api {
    namespace FindAll {
      namespace Request {}
      namespace Response {
        type Data = {
          content: Item[];
        };
      }
    }

    namespace Remove {
      namespace Response {
        type Data = Item;
      }
    }

    namespace Find {
      namespace Request {}
      namespace Response {}
    }
  }
}
