// Ambient type augmentations for the dsh services this plugin injects.
// `tools` comes from @deepseek-ai/dsh-tools; `webServer` from
// @deepseek-ai/dsh-host-webserver; `effect` from the cordis fiber runtime.
// This file makes the injection contract visible to tsc without requiring
// those packages to be runtime deps here.
declare module '@deepseek-ai/cordis' {
  interface Context {
    /** Register a cleanup-aware effect on the current fiber. */
    effect<T>(execute: () => T | Promise<T> | (() => unknown), label?: string): () => void
    webServer: {
      register(route: {
        kind: 'exact' | 'prefix'
        path: string
        handler: (req: import('node:http').IncomingMessage, res: import('node:http').ServerResponse) => void | Promise<void>
      }): () => void
    }
  }
}

export {}
