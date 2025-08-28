import ImageConverter from '../image-converter/converter';
import RelatedTools from '../shared/RelatedTools';
import AdUnit from '@/components/AdUnit';

export default function WebpToJpgConverter() {
  return (
    <div>
      <AdUnit className="header-ad" adSlot="8285940620" adFormat="auto" />
      <ImageConverter variant="webp-to-jpg" />
      <AdUnit className="content-ad" adSlot="8285940620" adFormat="auto" />
      <RelatedTools 
        currentTool="/tools/webp-to-jpg" 
        category="Image Tools" 
        maxSuggestions={6} 
      />
      <AdUnit className="footer-ad" adSlot="8285940620" adFormat="auto" />
    </div>
  );
}