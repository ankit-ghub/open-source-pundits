const { IncomingWebhook } = require('@slack/webhook');
const url = process.env.SLACK_WEBHOOK_URL;

const webhook = new IncomingWebhook(url);

// subscribeSlack is the main function called by Cloud Functions.
module.exports.publishMessageToSlack = (pubSubEvent, context) => {
  const build = eventToBuild(pubSubEvent.data);
  //console.log(pubSubEvent.data);
  // Skip if the current status is not in the status list.
  // Add additional statuses to list if you'd like:
  // QUEUED, WORKING, SUCCESS, FAILURE,
  // INTERNAL_ERROR, TIMEOUT, CANCELLED
  //  const status = ['SUCCESS', 'FAILURE', 'INTERNAL_ERROR', 'TIMEOUT'];
  //  console.log("Build Status");
  //  console.log(build.status);
  //  if (status.indexOf(build.status) === -1) {
  //    console.log("Message not sent");
  //    return;
  //  }

  // Send message to Slack.
  //console.log(build);
  const message = createSlackMessage(pubSubEvent.data);
  // console.log("Message Before Sending")
  // console.log(message);
  webhook.send(message);
};

// eventToBuild transforms pubsub event message to a build object.
const eventToBuild = (data) => {
  //console.log(Buffer.from(data, 'base64').toString());
  return JSON.parse(Buffer.from(data, 'base64').toString());
}

// createSlackMessage creates a message from a build object.
const createSlackMessage = (build) => {
  //console.log(build.data);
  const message = {
    text: 'Alert Bot! You have a New Message in PubSub!',
    mrkdwn: true,
    attachments: [
      {
        color: '#00FF00',
        title: 'A New message Popped Up in webportal-frontend-topic',
        fields: [{
          title: `${Buffer.from(build, 'base64').toString()}`
        }]
      }
    ]
  };
  // console.log("Message from FORMAT")
  // console.log(message);
  return message;
}
