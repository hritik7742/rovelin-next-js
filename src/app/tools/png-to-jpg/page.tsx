import ImageConverter from '../image-converter/converter';
import RelatedTools from '../shared/RelatedTools';
import AdUnit from '@/components/AdUnit';

export default function PngToJpgConverter() {
  return (
    <div>
      {/* Header Ad */}
      <AdUnit 
        adSlot="8285940620" 
        adFormat="auto"
        className="header-ad"
      />
      
      <ImageConverter variant="png-to-jpg" />
      
      {/* Middle Ad */}
      <AdUnit 
        adSlot="8285940620" 
        adFormat="auto"
        className="content-ad"
      />
      
      <RelatedTools 
        currentTool="/tools/png-to-jpg" 
        category="Image Tools" 
        maxSuggestions={6} 
      />
      
      {/* Footer Ad */}
      <AdUnit 
        adSlot="8285940620" 
        adFormat="auto"
        className="footer-ad"
      />
    </div>
  );
}