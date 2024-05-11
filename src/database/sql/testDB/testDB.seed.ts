import { extractError, log } from '../../../helpers';
import { testSchema } from './testDB.schema';
import { testDB } from '..';

export async function seedDatabase(): Promise<void> {
    try {
        await testDB.insert(testSchema.role).values([
            { id: 1, name: 'Super Admin', description: 'Role with super admin privileges' },
            { id: 2, name: 'Admin', description: 'Role with admin privileges' },
            { id: 3, name: 'Standard user', description: 'Role with standard user privileges' },
        ]);

        await testDB.insert(testSchema.status).values([
            { id: 1, name: 'Active', description: 'Active status' },
            { id: -1, name: 'Inactive', description: 'Inactive status' },
        ]);

        await testDB.insert(testSchema.user).values([
            {
                name: 'Developer',
                email: 'developer@example.in',
                password: '$2b$10$l5sLRGUmg0uFYghyc2O7fu2ZrkXZ.aA3PVoKFutLr3GTDLjKy9/Mi', // password: 123456
                roleId: 1,
                statusId: 1,
                phone: '1234567890',
            },
            {
                name: 'Admin',
                email: 'admin@example.in',
                password: '$2b$10$l5sLRGUmg0uFYghyc2O7fu2ZrkXZ.aA3PVoKFutLr3GTDLjKy9/Mi', // password: 123456
                roleId: 2,
                statusId: 1,
                phone: '9876543210',
            },
            {
                name: 'John',
                email: 'john@example.in',
                password: '$2b$10$l5sLRGUmg0uFYghyc2O7fu2ZrkXZ.aA3PVoKFutLr3GTDLjKy9/Mi', // password: 123456
                roleId: 3,
                statusId: 1,
                phone: '1231231234',
            }
        ]);

        log('Database seeded successfully.');
        process.exit(1);
    } catch (error) {
        console.error('Error seeding database:', extractError(error));
        process.exit(1);
    }
}

seedDatabase();