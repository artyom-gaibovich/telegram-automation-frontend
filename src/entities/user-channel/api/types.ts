import type { Category } from '@entities/category/api/types';

export declare namespace UserChannel {
  interface Item {
    id: string;
    userId: string;
    telegramId: string;
    title: string;
    categoryId: string;
    category?: Category.Item | null;
    channelsToRewrite: string[];
    createdAt?: string;
    updatedAt?: string;
  }

  namespace Api {
    namespace Create {
      namespace Request {
        type Body = {
          userId: string;
          telegramId: string;
          title: string;
          categoryId: string;
          channelsToRewrite: string[];
        };
      }
      namespace Response {
        type Data = Item;
      }
    }

    namespace FindAllByUserId {
      namespace Response {
        type Data = Item[];
      }
    }

    namespace Update {
      namespace Request {
        type Body = Partial<{
          userId: string;
          telegramId: string;
          title: string;
          categoryId: string;
          channelsToRewrite: string[];
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
