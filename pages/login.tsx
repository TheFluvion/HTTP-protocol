import styles from '@/styles/Login.module.css';
import Input from '@/components/Input';
import useLoginForm from '@/hooks/useLoginForm';
import Button from '@/components/Button';

function Login() {
  const { form, inputHandler, loading, handleSubmit } = useLoginForm();

  return (
    <main className={styles.container}>
      <form className={styles.login} onSubmit={handleSubmit}>
        <h1 className={styles.title}>Inicia sesión</h1>
        <div className={styles.inputsContainer}>
          <div className={styles.inputContainer}>
            <span className={styles.span}>Ingresá tu mail</span>
            <Input
              className={styles.input}
              name="username"
              handleChange={inputHandler}
              value={form.username}
            />
          </div>
          <div className={styles.inputContainer}>
            <span className={styles.span}>Usuario</span>
            <Input
              className={styles.input}
              name="user"
              handleChange={inputHandler}
              type="password"
              value={form.user}
            />
          </div>
          <div className={styles.inputContainer}>
            <span className={styles.span}>Documento</span>
            <Input
              className={styles.input}
              name="document"
              handleChange={inputHandler}
              value={form.document}
            />
          </div>
          <div className={styles.inputContainer}>
            <span className={styles.span}>Id de cliente</span>
            <Input
              className={styles.input}
              name="client_id"
              handleChange={inputHandler}
              value={form.client_id}
            />
          </div>
          <div className={styles.inputContainer}>
            <span className={styles.span}>Ingresar contraseña</span>
            <Input
              className={styles.input}
              name="password"
              handleChange={inputHandler}
              type="password"
              value={form.password}
            />
          </div>
        </div>
        <Button
          typeLoading="text"
          isLoading={loading}
          handleClick={handleSubmit}
          sizeComponent="large"
          className={styles.button}
        >
          Iniciar sesión
        </Button>
      </form>
    </main>
  );
}

export default Login;
