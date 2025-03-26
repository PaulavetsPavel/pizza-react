import styles from './Categories.module.scss';

const Categories = ({ value, onChangeCategory }) => {
  const categories = ['Все', 'Мясные', 'Вегетарианскиу', 'Гриль', 'Острые', 'Закрытые'];

  return (
    <div className={styles.categories}>
      <ul>
        {categories.map((category, index) => {
          return (
            <li
              key={index}
              className={value === index ? `${styles.active}` : ''}
              onClick={() => {
                onChangeCategory(index);
              }}>
              {category}
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Categories;
