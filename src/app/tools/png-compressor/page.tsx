import SpecificCompressor from '../image-compressor/SpecificCompressor';
import RelatedTools from '../shared/RelatedTools';

export default function PngCompressor() {
  return (
    <div>
      <SpecificCompressor variant="png-compressor" />
      <RelatedTools 
        currentTool="/tools/png-compressor" 
        category="Image Tools" 
        maxSuggestions={6} 
      />
    </div>
  );
}
