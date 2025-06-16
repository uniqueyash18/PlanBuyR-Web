import { useEffect } from 'react';
import AdSense from 'react-adsense';

interface GoogleAdProps {
  slot: string;
  style?: React.CSSProperties;
  format?: 'auto' | 'fluid' | 'rectangle' | 'vertical';
  responsive?: boolean;
}

const GoogleAd: React.FC<GoogleAdProps> = ({
  slot,
  style,
  format = 'auto',
  responsive = true,
}) => {
  useEffect(() => {
    // Load the Google Ads script
    try {
      ((window as any).adsbygoogle = (window as any).adsbygoogle || []).push({});
    } catch (err) {
      console.error('Error loading Google Ads:', err);
    }
  }, []);

  return (
    <div style={style}>
      <AdSense.Google
        client="ca-pub-YOUR_PUBLISHER_ID" // Replace with your actual publisher ID
        slot={slot}
        style={{ display: 'block' }}
        format={format}
        responsive={responsive}
      />
    </div>
  );
};

export default GoogleAd; 