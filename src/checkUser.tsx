import { Auth } from "aws-amplify";
import { CognitoUser } from "@aws-amplify/auth";
import { CognitoUserSession, CognitoIdToken } from "amazon-cognito-identity-js";

type TUpdateUser = (user: CognitoUser) => void;

async function checkUser(updateUser: TUpdateUser) {
  const userData = await Auth.currentSession().catch(e => console.log(e));
  if (!userData) {
    console.log(`User data : ${userData}`);
    updateUser({} as CognitoUser);
    return;
  }

  type TPayload = {
    [key: string]: any;
  };

  {
    /* const { idToken }: { idToken: CognitoIdToken } = userData as CognitoUserSession; */
  }

  {
    /* const { */
  }
  {
    /*   idToken: { payload } */
  }
  {
    /* }: CognitoUserSession = userData; */
  }
  const isAuthorised =
    payload["cognito:groups"] && payload["cognito:groups"].includes("Admin");
  console.log(isAuthorised);
  updateUser({
    username: payload["cognito:username"],
    isAuthorised
  });
}

export default checkUser;
