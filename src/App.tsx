import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import LanguageSwitcher from './components/LanguageSwitcher';
import DriftIceInfo from './components/DriftIceInfo';
import TourismInfo from './components/TourismInfo';
import RestaurantInfo from './components/RestaurantInfo';
import './App.css';

type Tab = 'driftIce' | 'tourism' | 'restaurants';

function App() {
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState<Tab>('driftIce');

  return (
    <div className="app">
      <LanguageSwitcher />

      <header className="app-header">
        <h1 className="app-title">{t('appTitle')}</h1>
      </header>

      <nav className="tab-navigation">
        <button
          className={`tab-button ${activeTab === 'driftIce' ? 'active' : ''}`}
          onClick={() => setActiveTab('driftIce')}
        >
          ❄️ {t('tabs.driftIce')}
        </button>
        <button
          className={`tab-button ${activeTab === 'tourism' ? 'active' : ''}`}
          onClick={() => setActiveTab('tourism')}
        >
          🏔️ {t('tabs.tourism')}
        </button>
        <button
          className={`tab-button ${activeTab === 'restaurants' ? 'active' : ''}`}
          onClick={() => setActiveTab('restaurants')}
        >
          🍽️ {t('tabs.restaurants')}
        </button>
      </nav>

      <main className="app-content">
        {activeTab === 'driftIce' && <DriftIceInfo />}
        {activeTab === 'tourism' && <TourismInfo />}
        {activeTab === 'restaurants' && <RestaurantInfo />}
      </main>

      <footer className="app-footer">
        <p>© 2025 Hokkaido Drift Ice Information | 홋카이도 유빙 정보</p>
      </footer>
    </div>
  );
}

export default App;
