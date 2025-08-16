import ImageConverter from '../image-converter/converter';
import RelatedTools from '../shared/RelatedTools';

export default function PngToJpgConverter() {
  return (
    <div>
      <ImageConverter variant="png-to-jpg" />
      <RelatedTools 
        currentTool="/tools/png-to-jpg" 
        category="Image Tools" 
        maxSuggestions={6} 
      />
    </div>
  );
}