const AWS = require("aws-sdk");
const dynamoDb = new AWS.DynamoDB.DocumentClient();
const { PutCommand } = require("@aws-sdk/lib-dynamodb");
const TableName = "horiscope_accounts";

//Functions for account table

//Function to create an Account

async function createAccount(account) {
  const command = new PutCommand({
    TableName,
    Item: account,
  });
}

//Function to get an Account by id

async function getAccountById(id) {
  const command = new GetCommand({
    TableName,
    Key: {
      account_id,
    },
  });
}

async function getAccountByUsername(username) {
  const command = new GetCommand({
    TableName,
    Key: {
      username,
    },
  });
}

async function createAccount(account) {
  const command = new PutCommand({
    TableName,
    Key: {
      account_id,
    },
  });
}
module.exports = {
  createAccount,
  getAccountById,
  getAcccountByUsername,
  createAccount,
};
