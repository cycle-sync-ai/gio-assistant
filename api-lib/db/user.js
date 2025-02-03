import bcrypt from 'bcryptjs';
import normalizeEmail from 'validator/lib/normalizeEmail';

export async function findUserWithEmailAndPassword(db, email, password) {
  email = normalizeEmail(email);
  const { data: user, error } = await db
    .from('users')
    .select('*')
    .eq('email', email)
    .single();
  // const user = await db.collection('users').findOne({ email });
  if (error) {
    console.log('findUserWithEmailAndPassword', error.message);
    return null;
  }
  if (user && (await bcrypt.compare(password, user.password))) {
    return { ...user, password: undefined }; // filtered out password
  }
  return null;
}

export async function findUserForAuth(db, userId) {

  const { data: user, error } = await db
    .from('users')
    .select('*')
    .eq('id', userId)
    .single();

  if (error) {
    console.error('Error findUserForAuth:', error.message);
    return null;
  }

  return user;
}

export async function findUserById(db, userId) {
  const { data: user, error } = await db
    .from('users') 
    .select('*')
    .eq('id', userId)
    .single();

  if (error) {
    console.error('Error findUserById:', error.message);
    return null;
  }

  return user;
}

export async function findUserByUsername(db, username) {
  const { data: user, error } = await db
    .from('users')
    .select('*')
    .eq('username', username)
    .single();

  if (error) {
    console.error('Error findUserByUsername:', error.message);
    return null;
  }

  return user;
}

export async function findUserByEmail(db, email) {
  email = normalizeEmail(email);
  const { data: user, error } = await db
    .from('users')
    .select('*')
    .eq('email', email)
    .single();

  if (error) {
    console.error('Error findUserByEmail:', error.message);
    return null;
  }

  return user;
}

export async function updateUserById(db, id, data) {
  console.log(data, "update data", typeof id);
  const { data:user, error } = await db
    .from('users')
    .upsert({id:user.id, phone:"123345"})
    .select()
  console.log("updated data", user);
  if (error) {
    console.error('Error updating user:', error.message);
    return null;
  }

  // return user;
}

export async function insertUser(
  db,
  {id, phone, name }
) {
  const user = {
    id,
    phone,
    name,
  };

  const { data, error } = await db
    .from('users')
    .insert({ ...user });

  if (error) {
    console.error('Error creating user:', error.message);
    return null;
  }

  return data;
}

export async function updateUserPasswordByOldPassword(
  db,
  id,
  oldPassword,
  newPassword
) {

  const { data: user, error } = await db
    .from('users')
    .select('*')
    .eq('id', id)
    .single();

  if (error) {
    console.log('Error updateUserPasswordByOldPassword', error.message)
    return false;
  }

  const matched = await bcrypt.compare(oldPassword, user.password);

  if (!matched) return false;

  const password = await bcrypt.hash(newPassword, 10);
  const { data, error: updateError } = await db
    .from('users')
    .update({ 'password': password })
    .eq('id', id)
    .single();

  if (updateError) {
    return false;
  }
  return true;
}

export async function UNSAFE_updateUserPassword(db, id, newPassword) {
  const password = await bcrypt.hash(newPassword, 10);
  const { data, error } = await db
    .from('users')
    .update({ 'password': password })
    .eq('id', id)
    .single();
  if (error) {
    console.log('Error UNSAFE_updateUserPassword', error.message);
    return false;
  }
  return true;
}