import { useTranslation } from 'react-i18next';
import './TourismInfo.css';

const TourismInfo = () => {
  const { t } = useTranslation();

  const categories = [
    { key: 'cruise', icon: '🚢' },
    { key: 'walking', icon: '🥾' },
    { key: 'observatory', icon: '🏔️' },
    { key: 'museum', icon: '🏛️' },
    { key: 'onsen', icon: '♨️' }
  ];

  return (
    <div className="tourism-info">
      <div className="header">
        <h1>{t('tourism.title')}</h1>
        <p className="subtitle">{t('tourism.subtitle')}</p>
      </div>

      <div className="coming-soon-banner">
        <div className="banner-icon">🚧</div>
        <h2>{t('tourism.comingSoon')}</h2>
        <p>{t('tourism.description')}</p>
      </div>

      <div className="categories-preview">
        <h3>예정된 카테고리 / Upcoming Categories</h3>
        <div className="categories-grid">
          {categories.map((category) => (
            <div key={category.key} className="category-card">
              <div className="category-icon">{category.icon}</div>
              <div className="category-name">
                {t(`tourism.categories.${category.key}`)}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="placeholder-content">
        <div className="placeholder-card">
          <h3>🚢 유빙 크루즈 (Drift Ice Cruise)</h3>
          <p>아바시리와 몬베츠에서 출발하는 유빙 관측선 정보가 곧 추가됩니다.</p>
          <p>Information about ice-breaking cruise ships from Abashiri and Monbetsu will be added soon.</p>
        </div>

        <div className="placeholder-card">
          <h3>🥾 유빙 워킹 (Drift Ice Walking)</h3>
          <p>우토로 지역에서 체험할 수 있는 유빙 위 워킹 투어 정보가 곧 추가됩니다.</p>
          <p>Information about ice walking tours in Utoro area will be added soon.</p>
        </div>

        <div className="placeholder-card">
          <h3>🏛️ 오호츠크 유빙과학센터</h3>
          <p>유빙과 오호츠크해에 대해 배울 수 있는 박물관 정보가 곧 추가됩니다.</p>
          <p>Information about museums to learn about drift ice and the Okhotsk Sea will be added soon.</p>
        </div>
      </div>
    </div>
  );
};

export default TourismInfo;
