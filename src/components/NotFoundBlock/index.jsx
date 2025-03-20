import styles from './NotFoundBlock.module.scss';

const NotFoundBlock = () => {
  return (
    <h1 className={styles.main}>
      <span className={styles.smile}>&#128533;</span>
      <br />
      Ничего не найдено
    </h1>
  );
};

export default NotFoundBlock;
