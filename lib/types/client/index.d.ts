export declare const inject: string[];
export declare function apply(ctx: {
    slots: {
        inject: (slot: string, cb: () => unknown) => void;
        register: (opts: {
            name: string;
            id: string;
        }, comp: unknown) => unknown;
    };
}): void;
