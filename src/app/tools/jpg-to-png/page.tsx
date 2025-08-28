import ImageConverter from '../image-converter/converter';
import RelatedTools from '../shared/RelatedTools';
import AdUnit from '@/components/AdUnit';

export default function JpgToPngConverter() {
  return (
    <div>
      {/* Header Ad */}
      <AdUnit 
        adSlot="8285940620" 
        adFormat="auto"
        className="header-ad"
      />
      
      <ImageConverter variant="jpg-to-png" />
      
      {/* Middle Ad */}
      <AdUnit 
        adSlot="8285940620" 
        adFormat="auto"
        className="content-ad"
      />
      
      <RelatedTools 
        currentTool="/tools/jpg-to-png" 
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