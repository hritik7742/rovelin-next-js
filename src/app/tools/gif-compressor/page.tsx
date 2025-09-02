import SpecificCompressor from '../image-compressor/SpecificCompressor';
import RelatedTools from '../shared/RelatedTools';

export default function GifCompressor() {
  return (
    <div>
      <SpecificCompressor variant="gif-compressor" />
      <RelatedTools 
        currentTool="/tools/gif-compressor" 
        category="Image Tools" 
        maxSuggestions={6} 
      />
    </div>
  );
}
