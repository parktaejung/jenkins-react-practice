// custom.d.ts 또는 react-app-env.d.ts 파일에 추가

// SVG 파일을 모듈로 인식하여 불러올 수 있도록 타입을 선언합니다.
declare module '*.svg' {
  import React = require('react');
  export const ReactComponent: React.FC<React.SVGProps<SVGSVGElement>>;
  const src: string;
  export default src;
}