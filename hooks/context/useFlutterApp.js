import { useState, useEffect } from 'react';

/** Inits connection with Flutter app.
 *
 * @warn only call this hook once in the context provider,
 * because a new connection is created each time you call this hook.
 */
const useFlutterApp = () => {
  const [messagePort, setMessagePort] = useState(null);

  useEffect(() => {
    window.addEventListener(
      'message',
      function (event) {
        let port, eventData;
        try {
          eventData = JSON.parse(event.data);
        } catch {
          return; // If parsing fails, the message isn't from Flutter.
        }

        if (eventData?.type === 'capturePort') {
          // capture port2 coming from the Dart side
          if (event.ports[0] !== null) {
            // the port is ready for communication,
            // so you can use port.postMessage(message); wherever you want
            port = event.ports[0];
            // To listen to messages coming from the Dart side, set the onmessage event listener
            port.onmessage = async function (_event) {
              // Add Dart messages listener code here if needed.
            };
            setMessagePort(port);
            port.postMessage(JSON.stringify({ type: 'ACK', payload: null }));
          }
        }
      },
      false
    );
  }, []);

  const postMessageToApp = (message) => {
    if (messagePort) messagePort.postMessage(JSON.stringify(message));
    // eslint-disable-next-line no-console
    else console.log('Send message to app: ', message);
  };

  return { postMessageToApp };
};

export default useFlutterApp;
