import * as userService from "../services/user.service.js";

export async function getCurrentUser(req, res) {
  try {
    // Получаем данные из Firebase decoded token
    const { uid, email, name, displayName } = req.user;
    
    // Используем name или displayName (в зависимости от того, что есть в токене)
    const userName = name || displayName || null;
    
    // Upsert: получаем пользователя или создаём если его нет
    const user = await userService.getCurrentUser(uid, email, userName);
    
    res.json(user);
  } catch (err) {
    res.status(err.status || 500).json({ error: err.message });
  }
}

export async function createUser(req, res) {
  try {
    const result = await userService.createUserIfNotExists(req.body);

    if (result.alreadyExists) {
      return res.status(200).json({ message: "User already exists" });
    }

    res.status(201).json({ message: "User created" });
  } catch (err) {
    res.status(err.status || 500).json({ error: err.message });
  }
}
