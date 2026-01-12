import type { Status } from '@entities/scenario/api/code-types';

export declare namespace Scenario {
  export interface Item {
    id: string;
    content: string | null;
    code: string | null;
    section: string | null;
    createdAt: string;
    status: Status;
    order: number | null;
    tags: string[];
  }

  export namespace Api {
    export namespace CreateScenario {
      export namespace Request {
        export type Data = {
          content?: string;
          code?: string;
          section?: string;
          order?: number;
          tags?: string[];
        };
      }

      export namespace Response {
        export type Data = Item;
      }
    }

    export namespace GetOneScenario {
      export namespace Request {
        export interface Params {
          id: string;
        }
      }

      export namespace Response {
        export type Data = Item;
      }
    }

    export namespace GetScenarioList {
      export namespace Request {}

      export namespace Response {
        export type Data = { content: Item[] };
      }
    }

    export namespace UpdateScenario {
      export namespace Request {
        export interface Params {
          id: string;
        }

        export type Data = Partial<{
          content: string;
          code: string;
          section: string;
          status: Status;
          order: number;
          tags: string[];
        }>;
      }

      export namespace Response {
        export type Data = Partial<Item>;
      }
    }

    export namespace DeleteScenario {
      export namespace Request {
        export interface Params {
          id: string;
        }
      }

      export namespace Response {
        export type Data = { success: true };
      }
    }
  }
}
