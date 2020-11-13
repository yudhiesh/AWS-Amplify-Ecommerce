/* eslint-disable-line */ const aws = require("aws-sdk");

exports.handler = async (event, context, callback) => {
  const cognitoProvider = new aws.CognitoIdentityServiceProvider({
    apiVersion: "2016-04-18"
  });

  let isAdmin = false;

  const adminEmails = ["yudhiesh1997@gmail.com"];

  if (adminEmails.indexOf(event.request.userAttributes.email) !== -1) {
    isAdmin = true;
  }

  if (isAdmin) {
    const groupParams = {
      UserPoolId: event.UserPoolId,
      GroupName: "Admin"
    };
    const userParams = {
      UserPoolId: event.userPoolId,
      Username: event.userName,
      GroupName: "Admin"
    };
    // First check if the group exists, and if not create the group
    try {
      await cognitoProvider.getGroup(groupParams).promise();
    } catch (e) {
      await cognitoProvider.createGroup(groupParams).promise();
    }
    try {
      await cognitoProvider.adminAddUserToGroup(userParams).promise();
      callback(null, event);
    } catch (e) {
      callback(e);
    }
  } else {
    // if the user is in neither group, proceed with no action
    callback(null, event);
  }
};
