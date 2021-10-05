import { format } from 'date-fns';
export default async function handler(req, res) {
  if (req.method === 'POST') {
    const phoneNumber = req.body.phone;
    const shortCode = process.env.BUSSINESS_SHORTCODE;
    const timestamp = format(new Date(), 'yyyyMMddHHmmss');
    const password = Buffer.from(
      shortCode +
        'bfb279f9aa9bdbcf158e97dd71a467cd2e0c893059b10f78e6b72ada1ed2c919' +
        timestamp
    ).toString('base64');
    const payload = {
      BusinessShortCode: +shortCode,
      Password: password,
      Timestamp: timestamp,
      TransactionType: 'CustomerPayBillOnline',
      Amount: 1,
      PartyA: phoneNumber,
      PartyB: +shortCode,
      PhoneNumber: phoneNumber,
      CallBackURL: process.env.CALLBACK_URL,
      AccountReference: 'MarcosTest',
      TransactionDesc: 'Payment of Cleaning Event',
    };

    const authUrl = 'https://sandbox.safaricom.co.ke/oauth/v1/generate';

    const accessAuthHeader = Buffer.from(
      process.env.CONSUMER_KEY + process.env.CONSUMER_SECRET
    ).toString('base64');
    try {
      const basicAuthCredentials = Buffer.from(
        'Azs2KejU1ARvIL5JdJsARbV2gDrWmpOB:hipGvFJbOxri330c'
      ).toString('base64');
      fetch(
        authUrl +
          `?grant_type=client_credentials&authorization=${accessAuthHeader}`,
        {
          headers: new Headers({
            Authorization: `Basic ${basicAuthCredentials}`,
          }),
        }
      )
        .then((response) => response.text())
        .then((result) => {
          const jsonResult = JSON.parse(result);

          let headers = new Headers();
          headers.append('Content-Type', 'application/json');
          headers.append('Authorization', `Bearer ${jsonResult.access_token}`);

          fetch(process.env.LNM_API_URL, {
            method: 'POST',
            headers: headers,
            body: JSON.stringify(payload),
          })
            .then((response) => response.text())
            .then((result) => {
              res.status(200).json(result);
            });
        });

      //   res.status(200).json(response);
    } catch (error) {
      res.status(500).json({ status: false, message: error });
    }
  }
}
