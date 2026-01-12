const DefaultPage = () => {
  return (
    <div className="app">
      <header className="header">
        <h1 className="display-heading">Добро пожаловать в наше приложение</h1>
        <p className="text-subtitle">
          Это демонстрация адаптированной дизайн-системы
        </p>
      </header>

      <main className="main-content">
        {/* Демонстрация заголовков */}
        <section className="section">
          <h2 className="text-title">Типографика</h2>

          <div className="typography-demo">
            <h1>Заголовок H1 - 60px/Bold</h1>
            <h2>Заголовок H2 - 24px/Bold</h2>
            <h3>Заголовок H3 - 20px/Medium</h3>
            <h4>Заголовок H4 - 16px/Semibold</h4>

            <p className="text-body">
              Основной текст - 16px/Regular. Это пример обычного текста в
              приложении.
            </p>
            <p className="text-caption">
              Подпись - 14px/Regular. Используется для дополнительной
              информации.
            </p>
            <p className="text-small">
              Мелкий текст - 12px/Regular. Для самых маленьких подписей.
            </p>
          </div>
        </section>

        {/* Демонстрация цветов текста */}
        <section className="section">
          <h2 className="text-title">Цвета текста</h2>

          <div className="colors-demo">
            <p className="text-primary">Основной цвет (Primary) - #D33C44</p>
            <p className="text-accent">Акцентный цвет (Accent) - #A5D6FF</p>
            <p className="text-light-blue">Светло-голубой - rgb(175,213,251)</p>
            <p style={{ color: 'var(--color-primary-light)' }}>
              Светлый основной - #E96C72
            </p>
            <p style={{ color: 'var(--color-primary-dark)' }}>
              Темный основной - #C34849
            </p>
          </div>
        </section>

        {/* Демонстрация начертаний шрифта */}
        <section className="section">
          <h2 className="text-title">Начертания шрифта</h2>

          <div className="weights-demo">
            <p className="font-thin">Thin (100) - Легкое начертание</p>
            <p className="font-light">Light (300) - Светлое начертание</p>
            <p className="font-normal">Normal (400) - Обычное начертание</p>
            <p className="font-medium">Medium (500) - Среднее начертание</p>
            <p className="font-semibold">
              Semibold (600) - Полужирное начертание
            </p>
            <p className="font-bold">Bold (700) - Жирное начертание</p>
          </div>
        </section>

        {/* Демонстрация ссылок и интерактивных элементов */}
        <section className="section">
          <h2 className="text-title">Ссылки и кнопки</h2>

          <div className="interactive-demo">
            <div className="links-group">
              <h3>Ссылки:</h3>
              <a href="#" className="link-primary">
                Обычная ссылка
              </a>
              <a href="#" className="link-accent">
                Акцентная ссылка
              </a>
              <a href="#">Ссылка без класса (наследует стили)</a>
            </div>

            <div className="buttons-group">
              <h3>Кнопки:</h3>
              <button className="btn btn-primary">Основная кнопка</button>
              <button className="btn btn-accent">Акцентная кнопка</button>
              <button className="btn btn-secondary">Вторичная кнопка</button>
              <button className="btn" disabled>
                Неактивная кнопка
              </button>
            </div>
          </div>
        </section>

        {/* Демонстрация форм */}
        <section className="section">
          <h2 className="text-title">Формы</h2>

          <div className="forms-demo">
            <div className="form-group">
              <label className="text-caption">Имя пользователя</label>
              <input
                type="text"
                placeholder="Введите ваше имя"
                className="form-input"
              />
            </div>

            <div className="form-group">
              <label className="text-caption">Email</label>
              <input
                type="email"
                placeholder="example@mail.com"
                className="form-input"
              />
            </div>

            <div className="form-group">
              <label className="text-caption">Сообщение</label>
              <textarea
                placeholder="Введите ваше сообщение..."
                className="form-textarea"
              ></textarea>
            </div>
          </div>
        </section>

        {/* Демонстрация специальных классов из дизайн-системы */}
        <section className="section">
          <h2 className="text-title">Специальные стили</h2>

          <div className="special-styles">
            <div className="special-item">
              <p className="text-display">Display текст</p>
              <span className="text-caption">
                3.75rem, 700, line-height 1.2
              </span>
            </div>

            <div className="special-item">
              <p
                style={{
                  fontSize: '24px',
                  fontWeight: 500,
                  lineHeight: '100%',
                  color: 'var(--color-primary)',
                }}
              >
                Специальный заголовок
              </p>
              <span className="text-caption">24px, 500, line-height 100%</span>
            </div>

            <div className="special-item">
              <p
                style={{
                  fontSize: '1rem',
                  lineHeight: '1.5',
                  color: 'var(--color-primary)',
                  fontFamily: 'var(--font-main)',
                  fontWeight: 600,
                }}
              >
                Текст с полужирным начертанием
              </p>
              <span className="text-caption">16px, 600, line-height 1.5</span>
            </div>
          </div>
        </section>
      </main>

      <footer className="footer">
        <p className="text-small">
          © 2024 Наше приложение. Все права защищены.
        </p>
        <p className="text-caption">
          Создано с использованием React и адаптированной дизайн-системы
        </p>
      </footer>
    </div>
  );
};

export default DefaultPage;
