import SpecificCompressor from '../image-compressor/SpecificCompressor';
import RelatedTools from '../shared/RelatedTools';
import AdUnit from '@/components/AdUnit';

export default function JpegCompressor() {
  return (
    <div>
      <AdUnit className="header-ad" adSlot="8285940620" adFormat="auto" />
      <SpecificCompressor variant="jpeg-compressor" />
      <AdUnit className="content-ad" adSlot="8285940620" adFormat="auto" />
      <RelatedTools 
        currentTool="/tools/jpeg-compressor" 
        category="Image Tools" 
        maxSuggestions={6} 
      />
      <AdUnit className="footer-ad" adSlot="8285940620" adFormat="auto" />
    </div>
  );
}