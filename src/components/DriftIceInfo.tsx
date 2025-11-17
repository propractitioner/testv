import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import './DriftIceInfo.css';

interface RegionStatus {
  name: string;
  status: 'observed' | 'notObserved' | 'approaching' | 'peak' | 'ending';
  date: string;
}

const DriftIceInfo = () => {
  const { t } = useTranslation();
  const [view, setView] = useState<'daily' | 'weekly'>('daily');

  // 샘플 데이터 - 실제로는 API에서 가져올 데이터
  const currentSeasonData: RegionStatus[] = [
    { name: 'abashiri', status: 'peak', date: '2025-02-15' },
    { name: 'monbetsu', status: 'observed', date: '2025-02-15' },
    { name: 'utoro', status: 'approaching', date: '2025-02-15' },
    { name: 'rausu', status: 'observed', date: '2025-02-15' },
    { name: 'shari', status: 'peak', date: '2025-02-15' }
  ];

  const weeklyForecast = [
    { date: '2025-02-16', regions: ['abashiri', 'monbetsu', 'shari'] },
    { date: '2025-02-17', regions: ['abashiri', 'monbetsu', 'utoro', 'shari'] },
    { date: '2025-02-18', regions: ['abashiri', 'monbetsu', 'utoro', 'rausu', 'shari'] },
    { date: '2025-02-19', regions: ['abashiri', 'monbetsu', 'utoro', 'rausu', 'shari'] },
    { date: '2025-02-20', regions: ['abashiri', 'monbetsu', 'shari'] },
    { date: '2025-02-21', regions: ['abashiri', 'monbetsu'] },
    { date: '2025-02-22', regions: ['abashiri'] }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'observed':
        return '#4a90e2';
      case 'peak':
        return '#00a8e8';
      case 'approaching':
        return '#ffa726';
      case 'ending':
        return '#ff7043';
      default:
        return '#bdbdbd';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'observed':
      case 'peak':
        return '❄️';
      case 'approaching':
        return '🌊';
      case 'ending':
        return '💧';
      default:
        return '⚪';
    }
  };

  return (
    <div className="drift-ice-info">
      <div className="header">
        <div>
          <h1>{t('driftIce.title')}</h1>
          <p className="subtitle">{t('driftIce.subtitle')}</p>
          <p className="season-info">{t('driftIce.season')}</p>
        </div>
      </div>

      <div className="view-switcher">
        <button
          className={view === 'daily' ? 'active' : ''}
          onClick={() => setView('daily')}
        >
          {t('driftIce.dailyView')}
        </button>
        <button
          className={view === 'weekly' ? 'active' : ''}
          onClick={() => setView('weekly')}
        >
          {t('driftIce.weeklyView')}
        </button>
      </div>

      {view === 'daily' ? (
        <div className="daily-view">
          <div className="info-card">
            <h2>{t('driftIce.info.title')}</h2>
            <p>{t('driftIce.info.description')}</p>
            <div className="info-highlights">
              <div className="highlight">
                <strong>⏰ {t('driftIce.info.bestTime')}</strong>
              </div>
              <div className="highlight">
                <strong>🚢 {t('driftIce.info.activities')}</strong>
              </div>
            </div>
          </div>

          <h2>{t('driftIce.regions.title')}</h2>
          <div className="regions-grid">
            {currentSeasonData.map((region) => (
              <div
                key={region.name}
                className="region-card"
                style={{ borderLeftColor: getStatusColor(region.status) }}
              >
                <div className="region-header">
                  <span className="region-icon">{getStatusIcon(region.status)}</span>
                  <h3>{t(`driftIce.regions.${region.name}`)}</h3>
                </div>
                <div className="region-status">
                  <span
                    className="status-badge"
                    style={{ backgroundColor: getStatusColor(region.status) }}
                  >
                    {t(`driftIce.status.${region.status}`)}
                  </span>
                </div>
                <div className="region-date">
                  {new Date(region.date).toLocaleDateString()}
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="weekly-view">
          <h2>{t('driftIce.forecast.title')}</h2>
          <p className="forecast-description">{t('driftIce.forecast.description')}</p>

          <div className="weekly-forecast">
            {weeklyForecast.map((day, index) => (
              <div key={day.date} className="forecast-day">
                <div className="day-header">
                  <span className="day-label">
                    {index === 0 ? '📍 ' : ''}
                    {new Date(day.date).toLocaleDateString(undefined, {
                      month: 'short',
                      day: 'numeric'
                    })}
                  </span>
                  <span className="region-count">{day.regions.length} 지역</span>
                </div>
                <div className="day-regions">
                  {day.regions.map((region) => (
                    <span key={region} className="region-tag">
                      ❄️ {t(`driftIce.regions.${region}`)}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="data-sources">
        <h3>{t('driftIce.dataSource')}</h3>
        <ul>
          <li>
            <a
              href="https://www1.kaiho.mlit.go.jp/KAN1/1center.html"
              target="_blank"
              rel="noopener noreferrer"
            >
              🔗 {t('driftIce.jcg')}
            </a>
          </li>
          <li>
            <a
              href="https://www.data.jma.go.jp/kaikyou/seaice/tile/jp/index_fct.html"
              target="_blank"
              rel="noopener noreferrer"
            >
              🔗 {t('driftIce.jma')}
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default DriftIceInfo;
