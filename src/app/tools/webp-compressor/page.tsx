import SpecificCompressor from '../image-compressor/SpecificCompressor';
import RelatedTools from '../shared/RelatedTools';

export default function WebpCompressor() {
  return (
    <div>
      <SpecificCompressor variant="webp-compressor" />
      <RelatedTools 
        currentTool="/tools/webp-compressor" 
        category="Image Tools" 
        maxSuggestions={6} 
      />
    </div>
  );
}
