import ImageConverter from '../image-converter/converter';
import RelatedTools from '../shared/RelatedTools';

export default function WebpToJpgConverter() {
  return (
    <div>
      <ImageConverter variant="webp-to-jpg" />
      <RelatedTools 
        currentTool="/tools/webp-to-jpg" 
        category="Image Tools" 
        maxSuggestions={6} 
      />
    </div>
  );
}