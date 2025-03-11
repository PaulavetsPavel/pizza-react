import Categories from './components/Categories';
import Header from './components/Header';
import PizzaBlock from './components/PizzaBlock';
import Sort from './components/Sort';
import './scss/app.scss';

const App = () => {
  return (
    <>
      <div className="wrapper">
        <Header />
        <div className="content">
          <div className="container">
            <div className="content__top">
              <Categories />
              <Sort />
            </div>
            <h2 className="content__title">Все пиццы</h2>
            <div className="content__items">
              <PizzaBlock title="Карбонара" price={500} />
              <PizzaBlock title="Пицца-бургер" price={450} />
              <PizzaBlock title="Маргарита" price={395} />
              <PizzaBlock title="Пеперони" price={490} />
              <PizzaBlock title="Чикен-карри" price={380} />
              <PizzaBlock title="Четыре сыра" price={500} />
              <PizzaBlock title="Гавайская" price={500} />
              <PizzaBlock title="Деревенская" price={500} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default App;
