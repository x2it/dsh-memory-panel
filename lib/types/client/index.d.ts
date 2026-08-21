export declare const inject: string[];
export declare function apply(ctx: {
    slots: {
        inject: (slot: string, cb: () => unknown) => void;
        register: (opts: {
            name: string;
            id: string;
            locale: string;
        }, comp: unknown) => unknown;
    };
    locale: {
        register: (ns: string, dicts: Record<string, Record<string, string>>) => () => void;
    };
}): void;
