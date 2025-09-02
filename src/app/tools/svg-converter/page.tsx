import ImageConverter from '../image-converter/converter';
import RelatedTools from '../shared/RelatedTools';

export default function SvgConverter() {
  return (
    <div>
      <ImageConverter variant="svg-converter" />
      <RelatedTools 
        currentTool="/tools/svg-converter" 
        category="Image Tools" 
        maxSuggestions={6} 
      />
    </div>
  );
}
