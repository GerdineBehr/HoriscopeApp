const AWS = require("aws-sdk");
const client = new AWS.DynamoDB.DocumentClient();
const documentClient = DynamoDBDocumentClient.from(client);
const { DynamoDBClient } = require("@aws-sdk/client-dynamodb");
const {
  DynamoDBDocumentClient,
  GetCommand,
  PutCommand,
  UpdateCommand,
  DeleteCommand,
  ScanCommand,
  QueryCommand,
} = require("@aws-sdk/lib-dynamodb");

const { logger } = require("../utils/logger");

const TableName = "horiscope_accounts";

//Functions for account table

//Function to create an Account

async function createAccount(Item) {
  const command = new PutCommand({
    TableName,
    Item,
  });

  try {
    const data = await documentClient.send(command);
    return data;
  } catch (err) {
    logger.error(err);
  }
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

//Function to update an account 
async function updateAccountById(account_id, UpdateExpression, ExpressionAttributeValues) {
  const command = new UpdateCommand({
    TableName,
    Key: {
      account_id,
    },
    UpdateExpression,
    ExpressionAttributeValues,
    ReturnValues: "ALL_NEW",
  });

  try {
    const data = await documentClient.send(command);
    return data;
  } catch (err) {
    logger.error(err);
  }
}


//Function to delete an account
async function deleteAccountById(account_id) {
  const commnad = new DeleteCommand({
    TableName,
    Key: {
      account_id,
    },
  });

  try {
    const data = await documentClient.send(command);
    return data;
  } catch (err) {
    logger.error(err);
  }
}

module.exports = {
  createAccount,
  getAccountById,
  getAccountByUsername,
  createAccount,
  updateAccountById,
  deleteAccountById,
};
