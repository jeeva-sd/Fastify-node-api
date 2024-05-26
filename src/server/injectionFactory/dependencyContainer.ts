import { combinedControllers } from '~/controllers';
import { combinedCore } from '~/core';
import { combinedRepo } from '~/database';
import { INJECTABLE_KEY } from './injectable';

const combineModule = [
    ...combinedRepo,
    ...combinedCore,
    ...combinedControllers,
];

// Dependency container class for managing instances of injectable classes
class DependencyContainer {
    private static instance: DependencyContainer;
    private instances: Map<string, any>;

    private constructor() {
        this.instances = new Map();
        this.registerDependencies();
    }

    // Implementing Singleton pattern
    public static getInstance(): DependencyContainer {
        if (!DependencyContainer.instance) {
            DependencyContainer.instance = new DependencyContainer();
        }
        return DependencyContainer.instance;
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

        stack.push(className); // Push class name onto the stack
        return this.instances.get(className);
    }

    // Get an instance of an injectable class by name
    public get<T>(key: string, stack: any[] = []): T {
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

// Exporting a singleton instance of the dependency container
const container = DependencyContainer.getInstance();
export default container;
