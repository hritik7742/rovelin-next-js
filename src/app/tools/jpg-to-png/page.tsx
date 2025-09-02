import ImageConverter from '../image-converter/converter';
import RelatedTools from '../shared/RelatedTools';

export default function JpgToPngConverter() {
  return (
    <div>

      <ImageConverter variant="jpg-to-png" />

      {/* Middle Ad */}

      <RelatedTools 
        currentTool="/tools/jpg-to-png" 
        category="Image Tools" 
        maxSuggestions={6} 
      />
    </div>
  );
}