/**
 * Symbol used as metadata key for identifying injectable classes.
 */
export const INJECTABLE_KEY = Symbol('injectable');

/**
 * Decorator to mark a class as injectable.
 * @returns A class decorator function.
 */
export const Injectable = (): ClassDecorator => {
    /**
     * Class decorator function.
     * @param target The target class to mark as injectable.
     */
    return (target: Record<string, any>) => {
        Reflect.defineMetadata(INJECTABLE_KEY, true, target);
    };
};
