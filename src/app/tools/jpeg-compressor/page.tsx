import SpecificCompressor from '../image-compressor/SpecificCompressor';
import RelatedTools from '../shared/RelatedTools';

export default function JpegCompressor() {
  return (
    <div>
      <SpecificCompressor variant="jpeg-compressor" />
      <RelatedTools 
        currentTool="/tools/jpeg-compressor" 
        category="Image Tools" 
        maxSuggestions={6} 
      />
    </div>
  );
}
