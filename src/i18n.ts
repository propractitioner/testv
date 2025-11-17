import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

const resources = {
  ko: {
    translation: {
      appTitle: '홋카이도 유빙 정보',
      tabs: {
        driftIce: '유빙 정보',
        tourism: '관광 정보',
        restaurants: '맛집 정보'
      },
      driftIce: {
        title: '오호츠크해 유빙 현황',
        subtitle: '홋카이도 동부 해안의 유빙 관측 및 예보',
        season: '유빙 시즌: 1월 ~ 3월',
        dataSource: '데이터 출처',
        jcg: '일본 해상보안청 해빙정보센터',
        jma: '일본 기상청',
        dailyView: '일별 현황',
        weeklyView: '주별 현황',
        regions: {
          title: '주요 관측 지역',
          abashiri: '아바시리',
          monbetsu: '몬베츠',
          utoro: '우토로',
          rausu: '라우스',
          shari: '샤리'
        },
        status: {
          observed: '유빙 관측됨',
          notObserved: '유빙 없음',
          approaching: '접근 중',
          peak: '절정기',
          ending: '유빙 시즌 종료'
        },
        forecast: {
          title: '유빙 예보',
          description: '향후 7일간의 유빙 출현 예상 지역',
          updateTime: '업데이트 시간'
        },
        info: {
          title: '유빙에 대하여',
          description: '홋카이도 오호츠크해 연안에는 매년 1-2월경 러시아 아무르강에서 흘러나온 민물이 얼어 형성된 유빙이 찾아옵니다. 이 유빙은 세계 최남단에서 관측되는 유빙으로, 2월 중순~하순이 가장 많이 볼 수 있는 시기입니다.',
          bestTime: '최적 관람 시기: 2월 중순 ~ 하순',
          activities: '추천 활동: 유빙 크루즈, 유빙 워킹'
        }
      },
      tourism: {
        title: '관광 정보',
        subtitle: '유빙 시즌 추천 관광지',
        comingSoon: '곧 업데이트 예정',
        description: '유빙을 볼 수 있는 지역의 관광 프로그램, 체험 활동 등의 정보가 추가될 예정입니다.',
        categories: {
          cruise: '유빙 크루즈',
          walking: '유빙 워킹',
          observatory: '전망대',
          museum: '박물관/과학관',
          onsen: '온천'
        }
      },
      restaurants: {
        title: '맛집 정보',
        subtitle: '현지 추천 맛집',
        comingSoon: '곧 업데이트 예정',
        description: '홋카이도 동부 지역의 현지 맛집과 특산물 정보가 추가될 예정입니다.',
        categories: {
          seafood: '해산물 요리',
          ramen: '라멘',
          izakaya: '이자카야',
          cafe: '카페/디저트',
          local: '향토 요리'
        }
      },
      language: {
        korean: '한국어',
        english: 'English'
      }
    }
  },
  en: {
    translation: {
      appTitle: 'Hokkaido Drift Ice Information',
      tabs: {
        driftIce: 'Drift Ice',
        tourism: 'Tourism',
        restaurants: 'Restaurants'
      },
      driftIce: {
        title: 'Okhotsk Sea Drift Ice Status',
        subtitle: 'Drift Ice Observation and Forecast for Eastern Hokkaido Coast',
        season: 'Drift Ice Season: January ~ March',
        dataSource: 'Data Sources',
        jcg: 'Japan Coast Guard Sea Ice Information Center',
        jma: 'Japan Meteorological Agency',
        dailyView: 'Daily View',
        weeklyView: 'Weekly View',
        regions: {
          title: 'Main Observation Areas',
          abashiri: 'Abashiri',
          monbetsu: 'Monbetsu',
          utoro: 'Utoro',
          rausu: 'Rausu',
          shari: 'Shari'
        },
        status: {
          observed: 'Drift Ice Observed',
          notObserved: 'No Drift Ice',
          approaching: 'Approaching',
          peak: 'Peak Season',
          ending: 'Season Ending'
        },
        forecast: {
          title: 'Drift Ice Forecast',
          description: 'Expected drift ice locations for the next 7 days',
          updateTime: 'Last Updated'
        },
        info: {
          title: 'About Drift Ice',
          description: 'Every year around January-February, drift ice formed from freshwater flowing from Russia\'s Amur River reaches the Okhotsk Sea coast of Hokkaido. This is the southernmost drift ice observed in the world, with the best viewing period typically in mid to late February.',
          bestTime: 'Best Viewing: Mid to Late February',
          activities: 'Recommended Activities: Ice Cruise, Ice Walking'
        }
      },
      tourism: {
        title: 'Tourism Information',
        subtitle: 'Recommended Tourist Attractions During Drift Ice Season',
        comingSoon: 'Coming Soon',
        description: 'Information about tourism programs and activities in drift ice viewing areas will be added soon.',
        categories: {
          cruise: 'Ice Cruise',
          walking: 'Ice Walking',
          observatory: 'Observatory',
          museum: 'Museum/Science Center',
          onsen: 'Hot Springs'
        }
      },
      restaurants: {
        title: 'Restaurant Information',
        subtitle: 'Local Recommended Restaurants',
        comingSoon: 'Coming Soon',
        description: 'Information about local restaurants and specialties in eastern Hokkaido will be added soon.',
        categories: {
          seafood: 'Seafood',
          ramen: 'Ramen',
          izakaya: 'Izakaya',
          cafe: 'Cafe/Dessert',
          local: 'Local Cuisine'
        }
      },
      language: {
        korean: '한국어',
        english: 'English'
      }
    }
  }
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'ko',
    interpolation: {
      escapeValue: false
    },
    detection: {
      order: ['localStorage', 'navigator'],
      caches: ['localStorage']
    }
  });

export default i18n;
