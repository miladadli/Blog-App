import * as admin from 'firebase-admin';
import * as dotenv from 'dotenv';
import { Role } from '../common/enums/role.enum';

dotenv.config();

import * as serviceAccount from '../config/serviceAccountKey.json';

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount as admin.ServiceAccount),
});

const createUserWithRoles = async (
  email: string,
  password: string,
  roles: Role[],
) => {
  try {
    const user = await admin.auth().createUser({
      email,
      password,
    });
    await admin.auth().setCustomUserClaims(user.uid, { roles });
    console.log(`User created with UID: ${user.uid} and roles: ${roles}`);
  } catch (error) {
    console.error('Error creating user:', error);
  }
};

const seedSuperAdmin = async () => {
  const email = process.env.SUPER_ADMIN_EMAIL;
  const password = process.env.SUPER_ADMIN_PASSWORD;

  if (!email || !password) {
    console.error(
      'SUPER_ADMIN_EMAIL or SUPER_ADMIN_PASSWORD is not set in the environment variables',
    );
    return;
  }

  await createUserWithRoles(email, password, [Role.Admin]);
};

const runSeeder = async () => {
  await seedSuperAdmin();
};

runSeeder()
  .then(() => {
    console.log('Seeding completed successfully');
  })
  .catch((error) => {
    console.error('Seeding failed', error);
  });
