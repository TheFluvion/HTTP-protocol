import { FormEvent, useState } from 'react';
import SelectOptions from '../SelectOptions';
import { Item } from '../SelectOptions/SelectOptions';
import styles from './HTTPSteps.module.css';
import { InputEvent } from '@/services/Types';
import Button from '../Button';
import Img from '../Img';
import file from '@/public/assets/icon-file.svg';
import virus from '@/public/assets/icon-virus.svg';
import Input from '../Input';
import InputSwitch from '../InputSwitch';
import cn from '@/utils/classNames';

interface Props { }

interface RequestClient {
  method: string;
  host: string;
  contentType: string;
  accept: string;
  body: string;
  authorizedHeader: boolean;
};

interface RequestServer {
  method: string;
  host: string;
  contentType: string;
  accept: string;
  bodyRequired: boolean;
  authorizedRequired: boolean;
};

const Method: Item[] = [
  { id: 'GET', name: 'GET' },
  { id: 'POST', name: 'POST' },
  { id: 'PUT', name: 'PUT' },
  { id: 'DELETE', name: 'DELETE' },
  /* { id: 'PATCH', name: 'PATCH' },
  { id: 'OPTIONS', name: 'OPTIONS' },
  { id: 'HEAD', name: 'HEAD' },
  { id: 'TRACE', name: 'TRACE' },
  { id: 'CONNECT', name: 'CONNECT' }, */
];

const contentType: Item[] = [
  { id: 'application/json', name: 'application/json' },
  { id: 'text/html', name: 'text/html' },
  { id: 'text/plain', name: 'text/plain' },
  { id: 'text/xml', name: 'text/xml' },
  { id: 'application/xml', name: 'application/xml' },
  { id: 'application/octet-stream', name: 'application/octet-stream' },
  { id: 'image/jpeg', name: 'image/jpeg' },
  { id: 'video/mp4', name: 'video/mp4' },
];

const accept: Item[] = [
  { id: 'application/json', name: 'application/json' },
  { id: 'text/html', name: 'text/html' },
  { id: 'text/plain', name: 'text/plain' },
  { id: 'text/xml', name: 'text/xml' },
  { id: 'application/xml', name: 'application/xml' },
  { id: 'application/octet-stream', name: 'application/octet-stream' },
  { id: 'image/jpeg', name: 'image/jpeg' },
  { id: 'video/mp4', name: 'video/mp4' },
];

const body: Item[] = [
  { id: 'none', name: 'none' },
  { id: 'object', name: 'object' },
  { id: 'array', name: 'array' },
  { id: 'string', name: 'string' },
  { id: 'number', name: 'number' },
]

interface Loading {
  server: boolean;
  client: boolean;
}

interface Text {
  server: boolean;
  client: boolean;
  handshake: boolean;
  final: boolean;
}

const HTTPSteps = ({ }: Props) => {
  const [requestClient, setRequestClient] = useState<RequestClient>({
    method: String(Method[0].id,),
    host: '',
    contentType: String(contentType[0].id),
    accept: String(accept[0].id),
    body: String(body[0].id),
    authorizedHeader: false,
  });
  const [requestServer, setRequestServer] = useState<RequestServer>({
    method: String(Method[0].id,),
    host: '',
    contentType: String(contentType[0].id),
    accept: String(accept[0].id),
    bodyRequired: false,
    authorizedRequired: false,
  });
  const [loading, setLoading] = useState<Loading>({
    server: false,
    client: false,
  });
  const [showText, setShowText] = useState<Text>({
    server: false,
    client: false,
    handshake: false,
    final: false,
  });
  const [error, setError] = useState<string>('');

  const handleRequestClient = (e: InputEvent | FormEvent<HTMLInputElement>, _index?: number) => {
    const { value, name } = e.currentTarget;
    if (name === 'authorizedHeader') {
      setRequestClient({
        ...requestClient,
        [name]: !requestClient.authorizedHeader,
      });
      return;
    }
    setRequestClient({
      ...requestClient,
      [name]: value,
    });
  }

  const handleRequestServer = (e: InputEvent | FormEvent<HTMLInputElement>, _index?: number) => {
    const { value, name } = e.currentTarget;
    if (name === 'bodyRequired') {
      setRequestServer({
        ...requestServer,
        [name]: !requestServer.bodyRequired,
      });
      return;
    }
    if (name === 'authorizedRequired') {
      setRequestServer({
        ...requestServer,
        [name]: !requestServer.authorizedRequired,
      });
      return;
    }
    setRequestServer({
      ...requestServer,
      [name]: value,
    });
  }

  const handleVerifyInitialClientRequest = () => {
    setShowText({ client: true, server: false, handshake: false, final: false });
    setTimeout(() => {
      if (requestClient.host !== requestServer.host) {
        setError('404 Not Found');
        return;
      }
      setError('');
    }, 2000);
  }

  const handleVerifyServerResponse = () => {
    if (requestClient.method !== requestServer.method) {
      setError('502 Bad Gateway');
      return;
    }
    if (!requestClient.authorizedHeader && requestServer.authorizedRequired) {
      setError('401 Unauthorized');
      return;
    }
    if (requestClient.body === 'none' && requestServer.bodyRequired) {
      setError('400 Bad Request');
      return;
    }
    if (requestClient.contentType !== requestServer.accept) {
      setError('415 Unsupported Media Type');
      return;
    }
  }

  const handleContinue = () => {
    if (error) return;
    if (showText.client && !showText.server && !showText.handshake) {
      setShowText({ client: true, server: false, handshake: true, final: false });
      setTimeout(() => {
        setShowText({ client: true, server: true, handshake: true, final: false });
      }, 2000);
      setLoading({ server: false, client: true });
    }

    if (showText.client && showText.server && showText.handshake) {
      handleVerifyServerResponse();
      setShowText({ client: true, server: true, handshake: false, final: true });
      setLoading({ server: true, client: false });
    }
  }

  const handleResetAll = () => {
    setRequestClient({
      method: String(Method[0].id),
      host: '',
      contentType: String(contentType[0].id),
      accept: String(accept[0].id),
      body: String(body[0].id),
      authorizedHeader: false,
    });
    setRequestServer({
      method: String(Method[0].id),
      host: '',
      contentType: String(contentType[0].id),
      accept: String(accept[0].id),
      bodyRequired: false,
      authorizedRequired: false,
    });
    setLoading({ server: false, client: false });
    setShowText({ client: false, server: false, handshake: false, final: false });
    setError('');
  }

  return (
    <main className={styles.container}>
      <div className={styles.optionsContainer}>
        <div className={styles.selectOptions}>
          <h2>Request Client</h2>
          <SelectOptions
            label='Method'
            options={Method}
            handleSelect={handleRequestClient}
            value={requestClient.method}
            name='method'
            childrenPosition='bottom'
          />
          <Input
            handleChange={handleRequestClient}
            value={requestClient.host}
            name='host'
            label='Host'
          />
          <SelectOptions
            label='Content Type'
            options={contentType}
            handleSelect={handleRequestClient}
            value={requestClient.contentType}
            name='contentType'
            childrenPosition='bottom'
          />
          <SelectOptions
            label='Accept'
            options={accept}
            handleSelect={handleRequestClient}
            value={requestClient.accept}
            name='accept'
            childrenPosition='bottom'
          />
          <SelectOptions
            label='Body'
            options={body}
            handleSelect={handleRequestClient}
            value={requestClient.body}
            name='body'
            childrenPosition='bottom'
          />
          <div className={styles.switch}>
            <span style={{ marginRight: '1rem' }}>
              Set authorized header
            </span>
            <InputSwitch
              handleToggle={handleRequestClient}
              name='authorizedHeader'
              value={requestClient.authorizedHeader}
            />
          </div>
          <Button
            handleClick={showText.client ? handleResetAll : handleVerifyInitialClientRequest}
            sizeComponent='medium'
            typeLoading='text'
            className={styles.button}
          >
            {showText.client ? 'Reset' : 'Send Request'}
          </Button>
        </div>
        <div className={styles.selectOptions}>
          <h2>Server</h2>
          <SelectOptions
            label='Method'
            options={Method}
            handleSelect={handleRequestServer}
            value={requestServer.method}
            name='method'
            childrenPosition='bottom'
          />
          <Input
            handleChange={handleRequestServer}
            value={requestServer.host}
            name='host'
            label='Host'
          />
          <SelectOptions
            label='Content Type'
            options={contentType}
            handleSelect={handleRequestServer}
            value={requestServer.contentType}
            name='contentType'
            childrenPosition='bottom'
          />
          <SelectOptions
            label='Accept'
            options={accept}
            handleSelect={handleRequestServer}
            value={requestServer.accept}
            name='accept'
            childrenPosition='bottom'
          />
          <div className={styles.switch}>
            <span style={{ marginRight: '1rem' }}>
              Body required
            </span>
            <InputSwitch
              handleToggle={handleRequestServer}
              name='bodyrequired'
              value={requestServer.bodyRequired}
            />
          </div>
          <div className={styles.switch}>
            <span style={{ marginRight: '1rem' }}>
              Authorized required
            </span>
            <InputSwitch
              handleToggle={handleRequestServer}
              name='authorizedRequired'
              value={requestServer.authorizedRequired}
            />
          </div>
        </div>
      </div>
      <div className={styles.transitionContainer}>
        <div className={styles.transitionText}>
          <h2 style={{ marginBottom: '2rem' }}>
            Client
          </h2>
          <ol>
            {
              ['Inicio de la solicitud', 'Resolución de la dirección IP', 'Conexion TCP', 'Envio de la solicitud'].map((item, index) => {
                if (item === 'Envio de la solicitud' && error === '404 Not Found') return
                return <li key={index} className={showText.client ? styles.textList : ''} style={{ animationDelay: `${index * 1}s` }}>
                  {item}
                </li>
              }
              )
            }
            <li className={showText.final ? styles.textList : ''}>
              Procesamiento de la respuesta HTTP
            </li>
          </ol>
        </div>
        <div className={styles.dashedLine}>
          <Img
            src={file}
            alt='file'
            className={
              cn(
                styles.file,
                loading.client ? styles.fileToServer : '',
                loading.server ? styles.fileToClient : '',
              )
            }
            width={20}
            height={20}
          />
          {
            showText.client
            && <Button
              handleClick={handleContinue}
              sizeComponent='medium'
              typeLoading='text'
              className={styles.continueButton}
            >
              Continue
            </Button>
          }
          {
            showText.handshake
            && <h2 className={styles.handshake}>
              {showText.handshake && 'Handshake SSL/TSL'}
            </h2>
          }
          {
            showText.final
            && <h2 className={styles.close}>
              {showText.final && 'Cierre de la conexión TCP'}
            </h2>
          }
          {
            error
            && <h2 className={styles.error}>
              {error}
            </h2>
          }
        </div>
        <div className={styles.transitionText} >
          <h2 style={{ marginBottom: '2rem' }}>
            Server
          </h2>
          <ol >
            {
              ['Procesamiento de la solicitud', 'Generacion de la respuesta', 'Envio de la respuesta'].map((item, index) => (
                <li key={index} className={showText.server ? styles.textList : ''} style={{ animationDelay: `${index * 1}s` }}>
                  {item}
                </li>
              ))
            }
          </ol>
        </div>
      </div>
    </main>
  );
};

export default HTTPSteps;

/* 

Chapa: Te voy a explicar porque estas aqui. Estas porque sabes algo, aunque lo que sabes no puedes explicarlo, pero lo percibes. Ha sido asi durante toda tu vida.
Algo no funciona en el mundo, no sabes lo que es, pero ahi esta como una astilla clavada en tu mente y te esta enloqueciendo. Esa sensacion te ha traido hasta aqui.
¿Sabes de lo que estoy hablando?
Juanma: ¿De Matrix?
Chapa: ¿Te gustaria realmente saber lo que es?
Chapa: Matrix nos rodea. Esta por todas partes, incluso en esta habitacion.
La puedes ver si miras por la ventana, o al encender la televisionPuedes sentirla cuando vas a trabajar, cuando vas a la iglesia, cuando pagas tus impuestos.
Es el mundo que ha sido puesto ante tus ojos para ocultarte la verdad.
Juanma: ¿Que verdad?
Chapa: Que eres un esclavo, Neo. Al igual que los demas, naciste en cautiverio, naciste en una prision que no  puedes ni saborear, ni oler, ni tocar. Una prision para tu mente. (Se echa hacia atras) 
Chapa: Has de verla con tus propios ojos,(Se acerca a el) esta es tu uultima oportunidad, despues de esto no podras echarte atras,si tomas la pastilla azul fin de la historia, despertaras en tu cama y creeras lo que quieras creer,pero si tomar la roja despertaras en el pais de las maravillas,yo te enseñare hasta donde llegan las madrigueras de conejo (mientras les eseña las pastillas). Recuerda,lo unico que te ofrezco es la verdad,nada mas.

*/