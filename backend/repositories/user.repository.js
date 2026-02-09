import db from "../db.js";

export async function findByFirebaseUid(firebaseUid, client = db) {
  const res = await client.query(
    `SELECT id, first_name, last_name, email, role FROM users WHERE firebase_uid = $1`,
    [firebaseUid],
  );

  return res.rows[0] || null;
}

export async function updateUserProfile(
  client,
  userId,
  firstName,
  lastName,
  email,
) {
  await client.query(
    `
    UPDATE users
    SET first_name = $1,
        last_name = $2,
        email = $3
    WHERE id = $4
    `,
    [firstName, lastName, email, userId],
  );
}

export async function createUser(firebaseUid, email, firstName, lastName) {
  try {
    const res = await db.query(
      `
      INSERT INTO users (firebase_uid, email, first_name, last_name, role)
      VALUES ($1, $2, $3, $4, 'user')
      RETURNING id, first_name, last_name, email, role
      `,
      [firebaseUid, email, firstName || null, lastName || null],
    );
    
    if (!res.rows || res.rows.length === 0) {
      throw new Error("Failed to create user: no rows returned");
    }
    
    return res.rows[0];
  } catch (error) {
    // Если пользователь уже существует (race condition), пытаемся получить его
    if (error.code === '23505' || error.message.includes('duplicate') || error.message.includes('unique')) {
      const existingUser = await findByFirebaseUid(firebaseUid);
      if (existingUser) {
        return existingUser;
      }
    }
    throw error;
  }
}

export async function userExists(firebaseUid) {
  const res = await db.query(
    `
    SELECT id
    FROM users
    WHERE firebase_uid = $1
    `,
    [firebaseUid],
  );

  return res.rowCount > 0;
}
