import {
  CloudWatchLogsClient,
  CreateLogStreamCommand,
  PutLogEventsCommand
} from "@aws-sdk/client-cloudwatch-logs";

export async function sendLog(message, config) {
  const client = new CloudWatchLogsClient({
    region: config.awsRegion?.trim(),
    credentials: {
      accessKeyId: config.awsAccessKeyId,
      secretAccessKey: config.awsSecretAccessKey,
    },
  });

  const logGroupName = "kiinara-app-logs";
  const logStreamName = "app-stream";

  try {
    await client.send(new CreateLogStreamCommand({
      logGroupName,
      logStreamName,
    }));
  } catch (e) {}

  await client.send(new PutLogEventsCommand({
    logGroupName,
    logStreamName,
    logEvents: [
      {
        message: JSON.stringify(message),
        timestamp: Date.now(),
      },
    ],
  }));
}