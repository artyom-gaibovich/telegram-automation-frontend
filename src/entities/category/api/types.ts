export declare namespace Category {
  interface Item {
    id: string;
    name: string;
    prompt: string;
    createdAt?: string;
    updatedAt?: string;
  }

  namespace Api {
    namespace Create {
      namespace Request {
        type Body = {
          name: string;
          prompt: string;
        };
      }
      namespace Response {
        type Data = Item;
      }
    }

    namespace FindAll {
      namespace Response {
        type Data = Item[];
      }
    }

    namespace FindOne {
      namespace Response {
        type Data = Item;
      }
    }

    namespace Update {
      namespace Request {
        type Body = Partial<{
          name: string;
          prompt: string;
        }>;
      }
      namespace Response {
        type Data = Item;
      }
    }

    namespace Remove {
      namespace Response {
        type Data = Item;
      }
    }
  }
}

