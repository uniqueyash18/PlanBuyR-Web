declare module 'react-adsense' {
  import { Component } from 'react';

  interface AdSenseProps {
    client: string;
    slot: string;
    style?: React.CSSProperties;
    format?: 'auto' | 'fluid' | 'rectangle' | 'vertical';
    responsive?: boolean;
  }

  class Google extends Component<AdSenseProps> {}

  export default {
    Google,
  };
} 