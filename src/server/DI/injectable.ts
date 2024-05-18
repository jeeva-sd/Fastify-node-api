export const INJECTABLE_KEY = Symbol('injectable');

export const Injectable = (): ClassDecorator => {
    return (target: Record<string, any>) => {
        Reflect.defineMetadata(INJECTABLE_KEY, true, target);
    };
};
