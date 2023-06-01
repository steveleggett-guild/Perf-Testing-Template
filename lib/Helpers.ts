import {
  GetSecretValueCommand,
  SecretsManagerClient,
} from "@aws-sdk/client-secrets-manager";

export async function retrieveSecret() {
  const secretsManagerClient = new SecretsManagerClient({
    region: "us-west-2",
  });

  const params = {
    SecretId: "" //"credemtials path in aws secret manager",
  };

  const command = new GetSecretValueCommand(params);

  let response;

  try {
    response = await secretsManagerClient.send(command);
    return response.SecretString;
  } catch (error) {
    console.log("Error received in retrieveSecret(): ", error);
    throw error;
  } finally {
    console.log("retrieveSecret() is done");
  }
}
