import { hash } from 'bcrypt';
import { v4 as uuidV4 } from 'uuid';

import createConnection from '../index';

async function create() {
  const connection = await createConnection('localhost');

  const id = uuidV4();
  const password = await hash('admin', 8);

  await connection.query(
    `INSERT INTO USERS(id, name, email, password, admin, driver_license)
      values('${id}', 'admin', 'admin@admin.com', '${password}', true, 'XXXXXXX')
    `
  );

  await connection.close();
}

create().then(() => console.log('User admin created!'));
