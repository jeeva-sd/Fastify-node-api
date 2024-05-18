import { combineModule } from "../DI/combineModule";

export const INJECTABLE_KEY = Symbol('injectable');

export function Injectable(): ClassDecorator {
    return (target) => {
        Reflect.defineMetadata(INJECTABLE_KEY, true, target);
    };
}

// Dependency container class for managing instances of injectable classes
class DependencyContainer {
    private instances: Map<string, any> = new Map();

    constructor() {
        this.registerDependencies();
    }

    // Register injectable classes and their dependencies
    private registerDependencies() {
        combineModule.forEach((module) => {
            if (Reflect.getMetadata(INJECTABLE_KEY, module)) {
                this.registerClass(module);
            }
        });
    }

    // Instantiate and register an injectable class along with its dependencies
    private registerClass(cls: any, stack: any[] = []) {
        const className = cls.name;
        if (stack.includes(className)) {
            throw new Error(`Circular dependency detected: ${stack.join(' -> ')} -> ${className}`);
        }
        if (!this.instances.has(className)) {
            const paramTypes = Reflect.getMetadata('design:paramtypes', cls) || [];
            const dependencies = paramTypes.map((dep: any) => {
                if (!dep) {
                    throw new Error(`Dependency not found: ${className}`);
                }
                return this.get(dep.name, [...stack, className]);
            });
            const instance = new cls(...dependencies);
            this.instances.set(className, instance);
        }
        return this.instances.get(className);
    }

    // Get an instance of an injectable class by name
    get<T>(key: string, stack: any[] = []): T {
        const instance = this.instances.get(key);
        if (!instance) {
            const cls = combineModule.find((module) => module.name === key);
            if (!cls) {
                throw new Error(`Class not found: ${key}`);
            }
            return this.registerClass(cls, stack) as T;
        }
        return instance as T;
    }
}

// Create a singleton instance of the dependency container
const container = new DependencyContainer();
export default container;
