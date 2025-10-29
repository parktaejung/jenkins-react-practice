// src/reportWebVitals.ts

// 1. [수정]: web-vitals에서 사용하는 ReportHandler 타입을 가져옵니다.
//    이 타입은 onPerfEntry 함수가 어떤 형태의 인수를 받는지 정의합니다.
import { ReportHandler } from 'web-vitals'; 

// 2. [수정]: onPerfEntry 매개변수에 명시적으로 ReportHandler 타입을 지정합니다.
const reportWebVitals = (onPerfEntry?: ReportHandler) => {
  if (onPerfEntry && onPerfEntry instanceof Function) {
    // 3. 'web-vitals' 모듈을 동적으로 import 합니다.
    //    이때 가져오는 모듈의 타입도 TypeScript가 자동으로 추론합니다.
    import('web-vitals').then(({ getCLS, getFID, getFCP, getLCP, getTTFB }) => {
      getCLS(onPerfEntry);
      getFID(onPerfEntry);
      getFCP(onPerfEntry);
      getLCP(onPerfEntry);
      getTTFB(onPerfEntry);
    });
  }
};

export default reportWebVitals;