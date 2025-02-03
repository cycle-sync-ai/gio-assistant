import { nanoid } from 'nanoid';
import crypto from 'crypto'

export async function findTokenByIdAndType(db, id, type) {

  const { data, error } = await db
    .from('tokens')
    .select('*')
    .eq('id', id)
    .eq('type', type)
    .single();

  if (error) {
    return null;
  }
  return data
}

export async function findAndDeleteTokenByIdAndType(db, user_id, type, salt) {

  const { data: tokens, selectError } = db
    .from('tokens')
    .select()
    .eq('id', id);

  if (selectError) {
    console.log("findAndDeleteTokenByIdAndType Select Error....", error.message);
    return null;
  }

  let v_token = decrypt(token.data, tokens.id, user_id);
  v_token = JSON.parse(v_token);
  v_token[type] = {};
  v_token = encrpt(JSON.stringify(v_token), tokens.id, user_id);

  const { data, saveError } = await db
    .from('tokens')
    .update('data', v_token)
    .eq('id', tokens.id);
  if (saveError) {
    console.log("findAndDeleteTokenByIdAndType Save Error....", saveError.message);
    return null;
  }

  return data;
}

export async function findAndUpdateTokenByIdAndType(db, tokenData, user_id, type) {
  const { data: tokens, selectError } = await db
    .from('tokens')
    .select()
    .eq('user_id', user_id)
    .single()

  if (selectError || !tokens) {
    console.log("updateTokenByIdAndType Select Error....", selectError);
    return null;
  }

  let v_token = decrypt(tokens.data, tokens.id, user_id);
  v_token = JSON.parse(v_token);
  v_token[type] = tokenData;
  v_token = encrypt(JSON.stringify(v_token), tokens.id, user_id);
  console.log(v_token, "tokenData")

  const { data, saveError } = await db
    .from('tokens')
    .update({ 'data': v_token })
    .eq('id', tokens.id);

  if (saveError) {
    console.log("updateTokenByIdAndType Save Error....", saveError);
    return null;
  }

  return data;
}

export async function createToken(db, user_id) {

  const { data: tokens, insertError } = await db
    .from('tokens')
    .insert({ data: '', user_id: user_id })
    .select()
    .eq('user_id', user_id)
    .single();

  if (insertError) {
    console.log('createToken insert Error', insertError.message);
    return null;
  }

  const { updateError } = await db
    .from('tokens')
    .update({ data: encrypt('{}', tokens.id, user_id) })
    .eq('id', tokens.id)

  if (updateError) {
    console.log('createToken ', insertError.message);
    return null;
  }

  return tokens;
}

function encrypt(text, password, salt) {
  const key = crypto.pbkdf2Sync(password, salt, 100000, 32, 'sha512');
  const iv = crypto.randomBytes(16);
  const cipher = crypto.createCipheriv('aes-256-cbc', key, iv);
  let encrypted = cipher.update(text, 'utf8', 'hex');
  encrypted += cipher.final('hex');
  const encryptedData = JSON.stringify({
    iv: iv.toString('hex'),
    encryptedData: encrypted
  });
  return encryptedData;
}

function decrypt(data, password, salt) {
  const { encryptedData, iv } = JSON.parse(data);
  const key = crypto.pbkdf2Sync(password, salt, 100000, 32, 'sha512');
  const decipher = crypto.createDecipheriv('aes-256-cbc', key, Buffer.from(iv, 'hex'));
  let decrypted = decipher.update(encryptedData, 'hex', 'utf8');
  decrypted += decipher.final('utf8');
  return decrypted;
}