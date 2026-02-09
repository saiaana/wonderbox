import * as userRepo from "../repositories/user.repository.js";

export async function getCurrentUser(firebaseUid, email, name) {
  // Ищем пользователя в БД
  let user = await userRepo.findByFirebaseUid(firebaseUid);

  // Если пользователя нет - создаём его
  if (!user) {
    // Разбиваем name на firstName и lastName
    const nameParts = (name || "").trim().split(" ");
    const firstName = nameParts[0] || null;
    const lastName = nameParts.slice(1).join(" ") || null;

    // Создаём пользователя
    user = await userRepo.createUser(firebaseUid, email, firstName, lastName);
  }

  return user;
}

export async function createUserIfNotExists({
  uid,
  email,
  firstName,
  lastName,
}) {
  if (!uid || !email) {
    throw { status: 400, message: "Invalid user data" };
  }

  const exists = await userRepo.userExists(uid);
  if (exists) {
    return { alreadyExists: true };
  }

  const user = await userRepo.createUser(uid, email, firstName, lastName);

  return { created: true, user };
}
