import { useState } from 'react';

const Categories = () => {
  const categories = ['Все', 'Мясные', 'Вегетарианскиу', 'Гриль', 'Острые', 'Закрытые'];
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <div className="categories">
      <ul>
        {categories.map((category, index) => {
          return (
            <li
              className={activeIndex === index ? 'active' : ''}
              onClick={() => {
                setActiveIndex(index);
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
