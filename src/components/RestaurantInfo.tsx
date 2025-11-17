import { useTranslation } from 'react-i18next';
import './RestaurantInfo.css';

const RestaurantInfo = () => {
  const { t } = useTranslation();

  const categories = [
    { key: 'seafood', icon: '🦀' },
    { key: 'ramen', icon: '🍜' },
    { key: 'izakaya', icon: '🍶' },
    { key: 'cafe', icon: '☕' },
    { key: 'local', icon: '🍱' }
  ];

  return (
    <div className="restaurant-info">
      <div className="header">
        <h1>{t('restaurants.title')}</h1>
        <p className="subtitle">{t('restaurants.subtitle')}</p>
      </div>

      <div className="coming-soon-banner">
        <div className="banner-icon">🍽️</div>
        <h2>{t('restaurants.comingSoon')}</h2>
        <p>{t('restaurants.description')}</p>
      </div>

      <div className="categories-preview">
        <h3>예정된 카테고리 / Upcoming Categories</h3>
        <div className="categories-grid">
          {categories.map((category) => (
            <div key={category.key} className="category-card">
              <div className="category-icon">{category.icon}</div>
              <div className="category-name">
                {t(`restaurants.categories.${category.key}`)}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="placeholder-content">
        <div className="placeholder-card highlight">
          <h3>🦀 해산물 요리 (Seafood)</h3>
          <p>오호츠크해의 신선한 해산물을 맛볼 수 있는 맛집 정보가 곧 추가됩니다.</p>
          <p>Information about restaurants serving fresh seafood from the Okhotsk Sea will be added soon.</p>
          <div className="specialty-tags">
            <span className="tag">게 요리</span>
            <span className="tag">성게</span>
            <span className="tag">연어</span>
            <span className="tag">가리비</span>
          </div>
        </div>

        <div className="placeholder-card">
          <h3>🍜 아바시리 라멘</h3>
          <p>현지 특산 라멘집과 추천 메뉴 정보가 곧 추가됩니다.</p>
          <p>Information about local ramen shops and recommended dishes will be added soon.</p>
        </div>

        <div className="placeholder-card">
          <h3>🍱 향토 요리 (Local Cuisine)</h3>
          <p>홋카이도 동부 지역의 전통 향토 요리를 맛볼 수 있는 식당 정보가 곧 추가됩니다.</p>
          <p>Information about restaurants serving traditional local cuisine from eastern Hokkaido will be added soon.</p>
        </div>
      </div>
    </div>
  );
};

export default RestaurantInfo;
