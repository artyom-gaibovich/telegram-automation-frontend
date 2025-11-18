export declare namespace Transcription {
  interface Item {
    id: string;
    fileName: string;
    code: string;
    content: string;
    order: number;
    section: string;
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

    namespace GeneratePrompt {
      namespace Request {
        type Data = {
          transcriptionId: string;
          categoryId: string;
          language: string;
          topic_tags: string[];
          audience_level: string;
          variants: number;
        };
      }
      namespace Response {
        type Data = {
          message: string;
        };
      }
    }

    namespace Remove {
      namespace Response {
        type Data = Item;
      }
    }

    namespace FindOne {
      namespace Request {}
      namespace Response {
        type Data = Item;
      }
    }

    namespace UpdatePartial {
      namespace Request {
        type Data = Partial<Item>;
      }
      namespace Response {}
    }
  }
}
