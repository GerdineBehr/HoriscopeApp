const accountdao = reqiure("../dao/accountDao");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { logger } = require("../utils/logger");
const { secret } = require("../utils/config");

async function getAccountById(account_id) {
  const account = await accountdao.getAccountById(account_id);
  return account;
}

async function loginAccount(username, password) {
  if (!username || !password) {
    return false;
  }
  try {
    const account = await accountdao.getAccountByUsername(username);

    if (!account) {
      return false;
    }
  } catch {
    console.error(err);
  }
}
async function createAccount(account) {
  const newAccount = await accountdao.createAccount(account);
  return newAccount;
}

async function deleteAccountById(account_id) {
  const deletedAccount = await accountdao.deleteAccountById(account_id);
  return deletedAccount;
}

module.exports = {
  getAccountById,
  loginAccount,
  createAccount,
  deleteAccountById,
};
