---
description: This rule ensures a consistent approach for loading AdSense scripts.
alwaysApply: false
---

Create an AdSense component that dynamically loads the AdSense script. The script should be created using document.createElement('script'), set to async, and appended to the document.body within a useEffect hook. The component should return null.