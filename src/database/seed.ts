import { extractError } from '~/utils';
import { db } from './connection';
import { schema } from './schema';

export async function seedDatabase(): Promise<void> {
    try {
        await db.insert(schema.role).values([
            { id: 1, name: 'Super Admin', description: 'Role with super admin privileges' },
            { id: 2, name: 'Admin', description: 'Role with admin privileges' },
            { id: 3, name: 'Moderator', description: 'Role with moderator privileges' },
            { id: 4, name: 'Editor', description: 'Role with editor privileges' },
        ]);

        await db.insert(schema.status).values([
            { id: 1, name: 'Active', description: 'Active status' },
            { id: -1, name: 'Inactive', description: 'Inactive status' },
        ]);

        await db.insert(schema.user).values([
            {
                name: 'Developer',
                email: 'developer@worthreads.in',
                password: '$2b$10$l5sLRGUmg0uFYghyc2O7fu2ZrkXZ.aA3PVoKFutLr3GTDLjKy9/Mi', // password: 123456
                roleId: 1,
                statusId: 1,
                phone: '1234567890',
                deviceId: 'device123',
                location: { latitude: 123.456, longitude: 456.789 },
                deviceOS: 'Android',
                deviceType: 'Phone',
                gender: 'Male',
                ageGroup: '26-40'
            },
            {
                name: 'Admin',
                email: 'admin@worthreads.in',
                password: '$2b$10$l5sLRGUmg0uFYghyc2O7fu2ZrkXZ.aA3PVoKFutLr3GTDLjKy9/Mi', // password: 123456
                roleId: 2,
                statusId: 1,
                phone: '9876543210',
                deviceId: 'device456',
                location: { latitude: 12.345, longitude: 45.678 },
                deviceOS: 'iOS',
                deviceType: 'iPad',
                gender: 'Female',
                ageGroup: '18-25'
            },
            {
                name: 'Moderator',
                email: 'moderator@worthreads.in',
                password: '$2b$10$l5sLRGUmg0uFYghyc2O7fu2ZrkXZ.aA3PVoKFutLr3GTDLjKy9/Mi', // password: 123456
                roleId: 3,
                statusId: 1,
                phone: '1231231234',
                deviceId: 'device789',
                location: { latitude: 98.765, longitude: 67.890 },
                deviceOS: 'Windows',
                deviceType: 'Desktop',
                gender: 'Other',
                ageGroup: '41-60'
            },
            {
                name: 'Editor',
                email: 'editor@worthreads.in',
                password: '$2b$10$l5sLRGUmg0uFYghyc2O7fu2ZrkXZ.aA3PVoKFutLr3GTDLjKy9/Mi', // password: 123456
                roleId: 4,
                statusId: 1,
                phone: '9879879876',
                deviceId: 'deviceabc',
                location: { latitude: 67.890, longitude: 89.012 },
                deviceOS: 'macOS',
                deviceType: 'Tablet',
                gender: 'Male',
                ageGroup: 'Over 60'
            },
        ]);


        console.log('Database seeded successfully.');
        process.exit(1);
    } catch (error) {
        console.error('Error seeding database:', extractError(error));
        process.exit(1);
    }
}

seedDatabase();