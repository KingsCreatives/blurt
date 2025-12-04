import http, { IncomingMessage, ServerResponse } from 'http';

const server = http.createServer(
  (req: IncomingMessage, res: ServerResponse) => {
    if (req.method === 'POST' && req.url === '/user') {
      // 1. We know chunks are Buffers, so let's type the array correctly
      let body: Buffer[] = [];

      req.on('data', (chunk) => {
        // chunk is ALREADY a buffer, no need for Buffer.from()
        body.push(chunk);
      });

      req.on('end', () => {
        try {
          // 2. Combine chunks
          const bodyBuffer = Buffer.concat(body);

          // 3. Buffer -> String
          const bodyString = bodyBuffer.toString();

          // 4. String -> Object
          const parsedData = JSON.parse(bodyString);

          // 5. Create a response object
          const responseData = {
            message: 'User created successfully',
            receivedData: parsedData,
          };

          // 6. Send it back (Must be a string!)
          res.writeHead(200, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify(responseData));
        } catch (error) {
          // 7. Handle bad JSON
          res.writeHead(400, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({ error: 'Invalid JSON format' }));
        }
      });
    } else {
      res.writeHead(404);
      res.end('Not Found');
    }
  }
);

server.listen(3000, () => {
  console.log('Raw Server running on 3000');
});
