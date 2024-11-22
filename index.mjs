import AWS from 'aws-sdk';

// Configure AWS SDK
AWS.config.update({ region: 'us-east-1' });

// Create an SES instance
const ses = new AWS.SES();

/**
 * Lambda function handler to send an email.
 * @param {Object} event - The event object containing email details.
 * @returns {Object} - The response object.
 */
export const handler = async (event) => {
  const { toEmail, subject, body } = event;

  const params = {
    Destination: {
      ToAddresses: [toEmail],
    },
    Message: {
      Body: {
        Text: { Data: body },
      },
      Subject: { Data: subject },
    },
    Source: 'ryan.ye@ontariotechu.net', // Replace with your verified SES email
  };

  try {
    const result = await ses.sendEmail(params).promise();
    console.log('Email sent successfully:', result);
    return {
      statusCode: 200,
      body: JSON.stringify({ message: 'Email sent successfully' }),
    };
  } catch (error) {
    console.error('Error sending email:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ message: 'Failed to send email', error: error.message }),
    };
  }
};
