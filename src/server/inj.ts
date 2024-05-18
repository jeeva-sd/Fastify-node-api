export const INJECTABLE_KEY = Symbol('injectable');

// Decorator function to mark a class as injectable
export function Injectable(): ClassDecorator {
    return (target) => {
        Reflect.defineMetadata(INJECTABLE_KEY, true, target);
    };
}