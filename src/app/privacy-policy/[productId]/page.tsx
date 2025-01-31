"use client";

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';

interface Product {
  id: string;
  name: string;
  policy: string;
}

const products: Product[] = [
    { id: 'leadspry', name: 'Leadspry', policy: `
  Effective Date: 20-09-2024
  Leadspry  is committed to protecting your privacy. This privacy policy explains how our Chrome extension operates and what information we do or do not collect.
  
  1. Information We Collect
  Leadspry does not collect, store, or share any personal data or user information. The extension is designed to facilitate searches for publicly available leads and contact information on various platforms. All search inputs and results are processed locally within your browser and are not transmitted to any external servers.
  
  2. Use of Permissions
  Leadspry requests certain browser permissions, including:
  * activeTab: This permission allows the extension to access the current active webpage, enabling users to initiate searches and scrape publicly available contact details.
  * tabs: This permission is used to manage browser tabs during the lead generation process.
  * scripting: This permission allows the extension to extract data from the web pages being searched.
  These permissions are necessary for the functionality of Leadspry and do not involve data collection or storage.
  
  3. Third-Party Websites
  Leadspry allows users to extract publicly available data from websites and social media platforms. We encourage users to respect the privacy policies and terms of service of the websites they visit. Leadspry is designed to help you discover publicly available information and does not retain any collected information.
  
  4. Cookies
  Leadspry does not use cookies to track users or collect information.
  
  5. Changes to This Privacy Policy
  We may update this privacy policy from time to time. If there are significant changes, we will notify users by updating the effective date at the top of this page. Users are encouraged to review this policy periodically for any updates.
  
  6. Contact Us
  If you have any questions or concerns about our privacy practices, please contact us at hritikchoudharykota@gmail.com. ADD THIS , THIS IS OUR EXTENSION PRODUCT PRIVACY PAGE`
      
       },
       {id: 'WA-Group-Finder', name: 'WA Group Finder', policy: `
  Last Updated: 25/09/2024
  
  # 1. Introduction
  
  Welcome to the WhatsApp Group Finder ("the Extension", "we," "our," or "us"). We are committed to protecting your privacy and ensuring you have a positive experience when using our browser extension. This policy outlines our practices concerning the collection, use, and disclosure of your information.
  
  The WhatsApp Group Finder is a browser extension designed to help users discover WhatsApp groups based on their interests and preferences. We understand the importance of your privacy and have designed our extension with data minimization and user control in mind.
  
  # 2. Information We Collect
  
  Our extension operates on a principle of minimal data collection. We do not collect, store, or transmit any personal information to our servers. All operations occur locally within your browser. However, it's important to understand what information is used during the extension's operation:
  
  a) User Inputs:
     - Website selection (including custom website input)
     - Keywords for group search
     - Desired number of groups to find
  
  b) Search Results:
     - Group names
     - WhatsApp group invite links
  
  These inputs and results are processed and displayed locally in your browser and are not stored persistently by our extension.
  
  # 3. How We Use Information
  
  The information you provide is used solely for the purpose of enhancing your experience with the WhatsApp Group Finder extension. Specifically:
  
  a) Search Query Generation: Your selected website (or "All websites" option) and keywords are used to construct search queries. These queries are sent to Google's search engine to find relevant WhatsApp groups.
  
  b) Results Processing: The extension processes the search results to extract WhatsApp group information, including group names and invite links.
  
  c) Display of Results: The processed information is displayed within the extension's user interface for your convenience.
  
  d) Join and Copy Functionality: The extension provides buttons to directly join groups or copy invite links, utilizing the information from the search results.
  
  We do not use your information for any other purposes, such as profiling, advertising, or analytics.
  
  # 4. Data Sharing and Disclosure
  
  We are committed to maintaining your privacy and do not engage in selling, renting, or trading any information. The extension's operations are confined to your local browser environment, with the following exceptions:
  
  a) Search Queries: When you initiate a search, a query is sent to Google's search engine. This query includes your selected website (if applicable) and keywords. Please note that this interaction is subject to Google's privacy policy.
  
  b) WhatsApp Interactions: When you choose to join a group, you will be redirected to WhatsApp's website or app. Any subsequent interactions, including joining the group, are governed by WhatsApp's privacy policy and terms of service.
  
  We do not have access to or control over these third-party interactions.
  
  # 5. Data Security
  
  As we do not collect or store personal data on our servers, the risk of a data breach on our end is minimized. However, we have implemented the following measures to ensure the security of your interaction with our extension:
  
  a) Local Processing: All data processing occurs locally in your browser, reducing the risk of unauthorized access.
  
  b) Minimal Data Usage: We only use the information necessary for the extension's core functionality.
  
  c) No Persistent Storage: The extension does not maintain any persistent storage of your searches or results.
  
  While we take these precautions, please be aware that no method of internet transmission or electronic storage is 100% secure. We encourage users to be cautious when joining WhatsApp groups, as these are operated by third parties and may have their own privacy practices.
  
  # 6. Your Choices and Rights
  
  We believe in providing you with control over your data and interaction with our extension:
  
  a) Input Control: You have full control over the information you input into the extension, including which websites to search and what keywords to use.
  
  b) Result Interaction: You can choose which groups to join or which links to copy, if any.
  
  c) Browser Controls: You can use your browser's built-in controls to clear local storage and cookies, which will remove any temporary data stored by the extension.
  
  d) Extension Removal: You can choose to disable or remove the extension at any time through your browser's extension management interface.
  
  # 7. Children's Privacy
  
  Our extension is not intended for use by children under the age of 13. We do not knowingly collect or solicit personal information from children under 13. If you are under 13, please do not use the Extension or provide any information to us. If we learn we have collected or received personal information from a child under 13 without verification of parental consent, we will delete that information. If you believe we might have any information from or about a child under 13, please contact us at the email address provided in the Contact Us section.
  
  # 8. International Data Transfers
  
  The WhatsApp Group Finder extension is designed to work globally. By using our extension, you acknowledge that the searches you perform and the results you receive may cross international borders, even though we do not collect or store this information. The privacy laws in your country may differ from those in the countries where the search results originate.
  
  # 9. Changes to This Privacy Policy
  
  We may update this privacy policy from time to time to reflect changes in our practices or for other operational, legal, or regulatory reasons. We will notify you of any material changes by posting the new privacy policy on this page and updating the "Last Updated" date at the top of this privacy policy. You are advised to review this privacy policy periodically for any changes.
  
  # 10. Contact Us
  
  If you have any questions about this privacy policy, our data practices, or your interactions with the extension, please contact us at:
  
  hritikkumarkota@gmail.com
  
  We will respond to your inquiries as soon as possible.
  
  # 11. Legal Compliance and Data Protection Rights
  
  Depending on your jurisdiction, you may have certain data protection rights. While we do not collect personal data, we respect and aim to honor these rights where applicable:
  
  - The right to access
  - The right to rectification
  - The right to erasure
  - The right to restrict processing
  - The right to object to processing
  - The right to data portability
  
  If you wish to exercise any of these rights, please contact us using the information provided in the Contact Us section.
  
  # 12. Use of Google Services
  
  Our extension utilizes Google's search engine to find WhatsApp groups. This interaction is subject to Google's terms of service and privacy policy. We encourage you to review Google's privacy practices to understand how they handle search queries and results.
  
  # 13. WhatsApp Interaction Disclaimer
  
  While our extension helps you discover WhatsApp groups, we are not affiliated with, endorsed by, or in any way officially connected with WhatsApp or any of its subsidiaries or affiliates. The official WhatsApp website can be found at https://www.whatsapp.com.
  
  When you join a WhatsApp group through our extension:
  
  a) You are leaving our extension's environment and entering WhatsApp's platform.
  b) You become subject to WhatsApp's terms of service and privacy policy.
  c) You may be exposing your WhatsApp profile information to the group's members.
  d) You are responsible for your interactions within these groups.
  
  We strongly encourage you to review the privacy settings in your WhatsApp account and be cautious about sharing personal information in groups.
  
  # 14. Security Practices
  
  While we don't store your data, we've implemented security best practices in our extension's code:
  
  a) Regular code audits to identify and fix potential vulnerabilities.
  b) Use of HTTPS for any external communications (e.g., Google searches).
  c) Minimization of third-party dependencies to reduce potential security risks.
  
  However, please note that no system is entirely secure. If you discover any security vulnerabilities, please report them to us immediately using the contact information provided.
  
  # 15. Cookies and Local Storage
  
  Our extension does not use cookies. It may use your browser's local storage temporarily to improve performance during a search session, but this data is not persisted after you close the extension popup.
  
  # 16. Do Not Track Signals
  
  Some browsers have incorporated "Do Not Track" (DNT) features that can send a signal to the websites you visit indicating you do not wish to be tracked. Because our extension doesn't track users across websites, we do not currently respond to DNT signals. However, you can usually choose to turn off online behavioral advertising yourself by visiting preferences-mgr.truste.com, www.aboutads.info/choices, or youronlinechoices.eu.
  
  # 17. California Privacy Rights
  
  If you are a California resident, you have the right to request information regarding the disclosure of your personal information to third parties for their direct marketing purposes. However, as we do not collect or share personal information, this right does not apply to our extension.
  
  # 18. Conclusion
  
  Your privacy is important to us. We've designed the WhatsApp Group Finder extension to be a useful tool while respecting your privacy and data protection rights. By using our extension, you agree to the practices described in this privacy policy. If you do not agree with this policy, please discontinue use of the extension immediately.
  
  Remember, you are responsible for any information you choose to share when joining or participating in WhatsApp groups. Always exercise caution and good judgment when interacting with unknown parties online.
  
  Thank you for trusting us with your group discovery needs. If you have any questions or concerns, please don't hesitate to contact us.
        `},
  
    {id: 'ImageXtract', name: 'ImageXtract', policy:`
      
  Privacy Policy for ImageXtract
  
  Last updated: 30-09-2024
  
  Thank you for using ImageXtract. This privacy policy explains how we collect, use, and protect your information when you use our Chrome extension that allows you to extract text from images on the web and uploaded images. Your privacy is important to us, and we are committed to ensuring that your personal information is secure.
  
  1. Information We Collect
  Our extension does not collect any personal information. Specifically, the extension operates entirely within your browser and does not transmit or store any data to our servers. However, to ensure transparency, here’s a breakdown of the different types of data involved:
  
  Text Extraction from Webpage Areas: When you select an area on a webpage to extract text, this action is performed locally in your browser. The selected image or text is never sent to our servers or any third-party service.
  
  Uploaded Images: If you upload an image from your device to extract text, the image and the extracted text remain local to your browser. No uploaded image or text is stored, shared, or sent outside your local environment.
  
  Cropped Images: When you crop an uploaded image for partial text extraction, the cropped area and resulting text are handled entirely within your browser and are not transmitted elsewhere.
  
  2. Data Usage
  Since the extension operates fully within your browser and does not send data to any external servers, we do not collect or process any user data. All the operations related to text extraction from images happen locally on your device.
  
  3. Third-Party Services
  ImageXtract does not use any third-party analytics, data collection, or tracking services. The extension is designed to prioritize user privacy by ensuring all actions remain confined to your browser.
  
  4. Data Security
  While we do not store or transmit any user data, we prioritize maintaining a secure and privacy-conscious extension. Your image selections, uploads, and text extractions are never exposed to external networks or servers, ensuring that sensitive or private data from images remains secure on your device.
  
  5. User Control
  As a user of ImageXtract, you maintain full control over the actions taken with the extension:
  
  Select and Crop Images: You can select areas on webpages or upload images and crop them to focus on specific areas for text extraction. No part of this process is visible to or shared with any third party.
  
  Clear Data: Since all data remains local to your browser, once you close or refresh the page, the images and extracted text are discarded and are no longer accessible.
  
  6. Permissions
  The extension requires the following permissions to function:
  
  Access to Webpage Content: This permission is necessary to allow you to select areas on a webpage for text extraction. The extension only accesses the webpage content you manually select and does not monitor or access other parts of your browsing activity.
  
  Upload Local Images: The upload feature allows you to choose images from your device for text extraction. The extension does not access any files without your explicit action to upload an image.
  
  7. Changes to This Privacy Policy
  We may update this privacy policy from time to time. Any changes will be reflected on this page with an updated revision date at the top. We encourage you to review this privacy policy periodically to stay informed about how we are protecting your privacy.
  
  8. Contact Us
  If you have any questions or concerns regarding this privacy policy or how your information is handled, please feel free to contact us at Hritikchoudharykota@gmail.com
  
  This privacy policy emphasizes the fact that your extension does not collect or share any user data, highlighting the privacy-conscious nature of the tool. Feel free to adjust specific details like the extension's name or contact information.
  
      ` },
    {
      id: 'mobileviewtester',
      name: 'Mobile View Tester',
      policy: `Last Updated: 15-12-2024
  
  1. Introduction
  Mobile View Tester ("we," "our," or "us") is committed to protecting your privacy. This Privacy Policy explains our practices regarding the collection, use, and protection of user information.
  
  2. Data Collection
  Our extension does not collect, store, or transmit any personal data. All operations are performed locally within your browser.
  
  3. Local Storage
  - We store only user preferences and settings locally in your browser
  - No personal information is collected or stored
  - All data remains on your device
  
  4. Data Usage
  - Settings and preferences are used solely for extension functionality
  - No data is shared with third parties
  - No analytics or tracking mechanisms are implemented
  
  5. Permissions
  Our extension requires certain permissions to function:
  - activeTab: For device simulation
  - scripting: For viewport modification
  - tabs: For simulator management
  - sidePanel: For device selection interface
  - contextMenus: For right-click access
  - storage: For saving preferences
  - alarms: For update checks
  
  6. Security
  - All operations are performed locally
  - No external servers are accessed
  - No user data is transmitted
  
  7. Updates
  We may update this privacy policy as needed. Users will be notified of any significant changes.
  
  8. Contact
  For privacy concerns or questions, contact us at:
  hritikkumarkota@gmail.com
  
  9. Compliance
  This extension complies with:
  - Chrome Web Store Developer Program Policies
  - GDPR requirements
  - CCPA requirements`
    },
    {
     id: 'Maintab', name: 'MainTab', policy:`Privacy Policy for MainTab Extension
  
  At MainTab, your privacy is of utmost importance to us. This Privacy Policy outlines how we handle your data when you use our Chrome extension to manage and organize your tabs. By using MainTab, you agree to the collection and use of information as described in this policy.
  
  1. Information We Collect
  MainTab is designed to help you manage and group your tabs efficiently. In doing so, we may collect minimal data related to the functionality of the extension:
  
  Tabs Information: We collect information about your open tabs solely for the purpose of helping you manage them within groups. This information includes the URLs, tab titles, and their group assignments.
  
  Extension Usage Data: We collect anonymous usage data (e.g., how often you use MainTab features, performance statistics) to help us improve the extension.
  
  2. How We Use Your Information
  Tab Management: The information collected about your tabs is used to allow you to group, organize, and manage your open tabs more effectively.
  
  Improvement of Services: Usage data is analyzed to enhance the functionality and user experience of MainTab. This data is not linked to any personally identifiable information and is used purely for development purposes.
  
  3. No Personal Data Collection
  MainTab does not collect, store, or share any personally identifiable information (PII). We do not track, store, or have access to any sensitive data such as usernames, passwords, or browsing history beyond the open tabs you choose to manage within the extension.
  
  4. Data Sharing
  We do not sell, trade, or otherwise transfer any of your information to outside parties. All tab management operations occur locally on your device. We do not transmit or store any tab data on external servers.
  
  5. Third-Party Services
  MainTab does not use any third-party analytics, advertising, or tracking services. The extension operates entirely on your local machine, ensuring your tab information remains private and secure.
  
  6. Your Consent
  By using the MainTab Chrome extension, you consent to this privacy policy.
  
  7. Changes to This Privacy Policy
  We reserve the right to update or modify this privacy policy at any time. Any changes will be reflected on this page, and your continued use of the extension after such changes constitutes your acceptance of the new terms.
  
  8. Contact Us
  If you have any questions or concerns about this Privacy Policy or how your information is handled, please contact us at hritikkumarkota@gmail.com`
    },
    {id: 'filteredyoutube', name: 'FilteredYoutube', policy: `Filtered YouTube Privacy Policy
  
  Last Updated: 10-10-2024
  
  Filtered YouTube (the "Extension") is committed to protecting your privacy. This Privacy Policy outlines how we collect, use, and safeguard your information when using our Chrome extension.
  
  1. Information We Collect
  Filtered YouTube does not collect, store, or share any personal data. The extension operates entirely on your device and only interacts with the YouTube website to hide or display specific elements based on your settings. No browsing data, personal information, or YouTube activities are transmitted to our servers or third-party services.
  
  2. Permissions
  The Extension requires access to specific permissions in your browser, such as:
  
  Read and change your data on youtube.com: This permission allows the extension to modify the YouTube interface to hide shorts, comments, recommendations, and other elements according to your preferences.
  We do not use these permissions to track, monitor, or collect any data about your YouTube activity.
  
  3. Third-Party Services
  Filtered YouTube does not use any third-party services or trackers. The Extension operates locally on your device, ensuring that your data remains private and secure.
  
  4. Data Security
  Since Filtered YouTube does not collect any personal data, there is no risk of data breaches or unauthorized sharing of your information. All modifications made by the Extension are strictly limited to the visual elements of YouTube and are confined to your browsing experience.
  
  5. User Control
  You have full control over how Filtered YouTube interacts with your YouTube browsing. You can enable or disable any features within the Extension's settings at any time. If you wish to stop using the Extension, you can easily uninstall it from your browser without leaving any residual data.
  
  6. Changes to This Policy
  We may update this Privacy Policy from time to time. Any changes will be reflected in the "Last Updated" date at the top of this page. Continued use of the Extension after any changes indicates your acknowledgment and acceptance of the updated policy.
  
  7. Contact Us
  If you have any questions or concerns about this Privacy Policy or the Extension, feel free to contact us at hritikchoudharykota@gmail.com.
  `},
  {id:'cssscanly', name:'CSS Scanly policy' , policy:`
    
  Privacy Policy for CSS Scanly
  
  Effective Date: 15-10-2024
  
  At CSS Scanly, your privacy is important to us. This Privacy Policy outlines the types of information we collect, how we use it, and the measures we take to ensure your data is protected while using our Chrome extension. By using CSS Scanly, you agree to the collection and use of information in accordance with this policy.
  
  1. Information We Collect
  CSS Scanly does not collect or store any personal information. The extension is designed to provide users with the ability to view and edit CSS properties on webpages they visit. We do not collect:
  
  Personal data (such as name, email address, or phone number)
  Browsing history or activities
  Sensitive information
  2. How CSS Scanly Works
  CSS Scanly operates locally within your browser. It interacts with the content of the webpage you are viewing to display the CSS properties of specific HTML tags when you hover over them with your mouse. The extension does not transmit any data to external servers or third parties.
  
  3. Permissions
  In order to function correctly, CSS Scanly requires permission to access the webpages you visit. This access is used solely to allow the extension to read and display the CSS of the elements on the page. We do not track or store any information about your browsing activity.
  
  4. Third-Party Services
  CSS Scanly does not use or integrate with any third-party analytics, tracking tools, or services that could collect your data. The extension is fully self-contained and runs within your browser environment.
  
  5. Data Security
  Since CSS Scanly does not collect or transmit any personal data, there are no additional security risks associated with the use of this extension. However, we recommend always using security best practices when browsing the internet.
  
  6. Changes to This Privacy Policy
  We may update our Privacy Policy from time to time to reflect any changes in the extension's functionality or legal requirements. Any changes will be posted on this page with the updated effective date. We encourage you to review this page periodically for any updates.
  
  7. Contact Us
  If you have any questions or concerns about this Privacy Policy or the use of CSS Scanly, please contact us at hritikkumarkota@gmail.com
  `},
  {
    id: 'seocheckup', name: 'SEO Checkup', policy: `
  
  Here's a privacy policy for your SEO CheckUp extension:
  
  Privacy Policy for SEO CheckUp Chrome Extension
  
  Effective Date:18-10-2024
  
  Introduction
  
  Welcome to SEO CheckUp. We are committed to protecting your privacy and providing transparency about how we handle your data. This Privacy Policy explains our practices regarding the collection, use, and disclosure of information through our Chrome extension.
  
  Information We Collect
  
  2.1 Website Data: When you use SEO CheckUp to analyze a webpage, we collect and process information from that page, including but not limited to:
  
  URL
  
  Page content
  
  HTML structure
  
  Meta tags
  
  Image data
  
  Link information
  
  2.2 Usage Data: We collect anonymous usage statistics to improve our service, including:
  
  Features used
  
  Frequency of use
  
  Error reports
  
  2.3 User Settings: We store your extension preferences locally on your device.
  
  How We Use Your Information
  
  We use the collected information to:
  
  Provide SEO analysis and recommendations
  
  Improve and optimize our extension
  
  Troubleshoot and fix issues
  
  Data Storage and Security
  
  4.1 Local Storage: User preferences and temporary analysis data are stored locally on your device using Chrome's storage API.
  
  4.2 Server-side Processing: Some advanced features may require server-side processing. In such cases, data is transmitted securely and is not stored permanently on our servers.
  
  4.3 Security Measures: We implement appropriate technical and organizational measures to protect your data against unauthorized access or disclosure.
  
  Data Sharing and Disclosure
  
  We do not sell, rent, or share your personal information with third parties. We may share anonymous, aggregated data for analytical purposes.
  
  Your Rights and Choices
  
  You can:
  
  Disable or uninstall the extension at any time
  
  Clear locally stored data through Chrome's settings
  
  Changes to This Policy
  
  We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "Effective Date" at the top.
  
  Contact Us
  
  If you have any questions about this Privacy Policy, please contact us at . hritikchoudharykota@gmail.com
  
  Consent
  
  By using SEO CheckUp, you consent to our Privacy Policy and agree to its terms.
    
  
    `
  },
  {
     id: 'youtube-stats-viewer', name: 'YouTube Stats Viewer', policy: `
     
     # Privacy Policy for YouTube Stats Viewer
  
  Last Updated: November 13, 2024
  
  ## Introduction
  
  Welcome to the Privacy Policy for YouTube Stats Viewer ("we," "our," or "the extension"). This Privacy Policy is designed to help you understand how our browser extension collects, uses, and safeguards information when you use our service.
  
  ## Information Collection and Use
  
  ### What Information We Collect
  
  Our extension collects only the following limited information:
  1. YouTube Video IDs: When you visit YouTube videos or Shorts
  2. Public Video Statistics: Including likes, dislikes, views, and engagement metrics from the Return YouTube Dislike API
  
  ### What Information We DO NOT Collect
  
  We want to be clear that we DO NOT collect:
  - Personal identification information
  - Names or email addresses
  - Login credentials
  - Payment information
  - Browsing history outside of YouTube
  - IP addresses or location data
  - Any user-generated content
  - Cookies or tracking data
  
  ## How We Use Information
  
  The collected information is used solely for:
  1. Displaying video statistics within the YouTube interface
  2. Showing dislike counts on videos and Shorts
  3. Calculating engagement metrics for the current video
  
  All data processing occurs locally in your browser. No information is stored on external servers.
  
  ## Data Sharing and Disclosure
  
  We do not:
  - Sell any user data
  - Share information with third parties
  - Transfer data for advertising purposes
  - Use data for any purpose beyond the extension's core functionality
  
  The only external communication our extension makes is to the Return YouTube Dislike API to fetch public video statistics.
  
  ## Data Security
  
  We implement appropriate technical measures to protect against unauthorized access, alteration, disclosure, or destruction of information. All data processing occurs locally within your browser environment.
  
  ## Third-Party Services
  
  Our extension uses the Return YouTube Dislike API (returnyoutubedislikeapi.com) to fetch video statistics. Please refer to their privacy policy for information about how they handle data.
  
  ## Children's Privacy
  
  Our extension does not knowingly collect any personal information from children under 13. The extension simply displays public video statistics available through YouTube's platform.
  
  ## Changes to This Privacy Policy
  
  We may update our Privacy Policy from time to time. We will notify users of any material changes by posting the new Privacy Policy on this page and updating the "Last Updated" date.
  
  ## Your Rights
  
  You have the right to:
  - Know what data is being collected
  - Access the data being collected
  - Remove the extension at any time
  - Contact us with questions about data handling
  
  ## Browser Permissions
  
  Our extension requires specific permissions to function:
  - "activeTab": To access and modify YouTube page content
  - "tabs": To detect URL changes between videos
  - Access to youtube.com: To display statistics on YouTube pages
  
  These permissions are used solely for the extension's core functionality of displaying video statistics.
  
  ## Contact Information
  
  If you have any questions or concerns about this Privacy Policy, please contact us at:
  hritikkumarkota@gmail.com
  
  ## Compliance
  
  This extension complies with:
  - Chrome Web Store Developer Program Policies
  - General Data Protection Regulation (GDPR)
  - California Consumer Privacy Act (CCPA)
  
  ## Consent
  
  By installing and using our extension, you agree to the terms outlined in this Privacy Policy.
  
  ## Additional Information
  
  - The extension is open-source, and its code can be reviewed on GitHub
  - We maintain transparency about all data handling practices
  - Users can uninstall the extension at any time through their browser settings
  
  This Privacy Policy was last updated on November 13, 2024.
  
     `
  },
  {
    id: 'fullpagescreenshot', name: 'FullPageScreenshot', policy: `
    
  Privacy Policy for FullPageScreenshot Extension
  Last Updated: 20 nov 2024
  
  Introduction
  FullPageScreenshot ("we," "our," or "the extension") is committed to protecting your privacy. This policy explains our data practices and your privacy rights when using our browser extension.
  
  Data Collection
  2.1 Screenshot Content
  
  We capture webpage content only when explicitly requested by the user.
  Screenshots are processed and stored locally on your device.
  No automatic or background capture occurs.
  2.2 Local Storage
  
  Recent screenshots are temporarily stored in browser local storage.
  User preferences and settings are saved locally.
  All stored data remains on your device.
  2.3 Non-Collection Statement
  We DO NOT collect:
  
  Personal identification information.
  Browsing history.
  Authentication data.
  Financial information.
  Communication content.
  Location data.
  Usage analytics.
  Data Usage
  
  3.1 Purpose Limitation
  Screenshots are used solely for user-initiated capture and editing.
  Local storage is used only for maintaining recent screenshots and preferences.
  No data mining or analysis is performed.
  
  3.2 Data Processing
  All processing occurs locally on your device.
  No cloud processing or external servers are used.
  No data is transmitted over the internet.
  Data Storage
  
  4.1 Location
  All data is stored locally in your browser.
  No external or cloud storage is used.
  Data persistence is limited to browser local storage.
  
  4.2 Duration
  Recent screenshots are stored temporarily.
  Users can clear data through browser settings.
  Automatic cleanup of old data occurs periodically.
  User Rights & Control
  
  5.1 Data Access
  All captured screenshots are immediately accessible.
  Local storage can be viewed through browser settings.
  No hidden or inaccessible data storage.
  
  5.2 Data Deletion
  Users can delete screenshots immediately after capture.
  Browser local storage can be cleared at any time.
  No residual data remains on external servers.
  Security
  
  6.1 Data Protection
  Local processing ensures data security.
  No network transmission of screenshot data.
  Standard browser security protects local storage.
  
  6.2 Risk Mitigation
  No external data exposure risk.
  No cloud storage vulnerabilities.
  No network transmission risks.
  Third-Party Access
  No data sharing with third parties.
  No external service integrations.
  No analytics or tracking services.
  
  Warning
  This extension is not intended for copying or misusing content or data from any website. You are solely responsible for any misuse of this extension, and we strongly warn against using it for unlawful or unauthorized activities. Use this tool only for your personal and professional tasks.
  
  Updates to Privacy Policy
  
  Users will be notified of policy changes.
  Updates will be reflected in the Web Store listing.
  Version history will be maintained.
  Contact Information
  [hritikkumarkota@gmail.com](mailto:hritikkumarkota@gmail.com)
  
  Compliance
  This extension complies with:
  
  Chrome Web Store Developer Program Policies.
  General Data Protection Regulation (GDPR).
  California Consumer Privacy Act (CCPA).
    
    `
  },
  {
    id: 'customscreensaver',
    name: 'Custom Screensaver Extension',
    policy: `Last Updated: 11-12-2024
  
  1. Data Collection and Usage
     - We collect minimal data necessary for the extension's core functionality
     - License verification information for pro users
     - User preferences and settings
     - Cached media content for performance optimization
  
  2. Data Storage
     - All user data is stored locally in your browser
     - No personal data is transmitted to external servers except for:
       * License verification through Gumroad's secure API
       * Loading media content from approved sources
  
  3. Data Security
     - All communications use secure, encrypted connections
     - No personal information is shared with third parties
     - License verification uses industry-standard security protocols
  
  4. User Rights
     - Users can clear all stored data through Chrome's extension settings
     - Users can disable or remove the extension at any time
     - No data persists after extension removal
  
  5. Third-Party Services
     - Gumroad: Used solely for license verification
     - Media providers: Used only for content delivery
  
  6. Updates
     - Users will be notified of privacy policy changes
     - Continued use after updates implies acceptance
  
  7. Contact
     For privacy concerns, contact:
     hritikkumarkota@gmail.com
  
  8. Compliance
     This extension complies with:
     - Chrome Web Store Developer Program Policies
     - General Data Protection Regulation (GDPR)
     - California Consumer Privacy Act (CCPA)`
  },
  {
    id: 'web-highlighter-pro',
    name: 'Web Highlighter Pro',
    policy: `
  # Privacy Policy for Web Highlighter Pro
  
  Last Updated: December 24, 2024
  
  ## Introduction
  Web Highlighter Pro ("we", "our", or "the extension") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, and safeguard your information when you use our browser extension.
  
  ## Information We Collect
  
  ### Locally Stored Information
  The following information is stored locally in your browser:
  - Text highlights you create on web pages
  - URLs of pages where highlights are made
  - User-created folders and organizational structures
  - Notes and annotations you create
  - Theme preferences and extension settings
  
  ### License Verification
  We collect minimal information necessary for license verification:
  - License key validation status
  - Purchase verification through Gumroad's API
  
  ## How We Use Your Information
  
  ### Local Data Usage
  All your highlights, notes, and organizational data are:
  - Stored exclusively on your local device
  - Used solely to provide the extension's core functionality
  - Never transmitted to external servers
  - Accessible only to you through your browser
  
  ### License Verification Usage
  License verification data is:
  - Used only to validate your purchase
  - Transmitted securely to Gumroad's API
  - Not stored or used for any other purpose
  
  ## Data Protection
  
  ### Local Storage
  - All data is stored securely in your browser's local storage
  - No cloud storage or synchronization
  - Data remains under your complete control
  - You can delete your data at any time through the extension's interface
  
  ### Third-Party Access
  We do not:
  - Sell or rent your data to third parties
  - Share your information with advertisers
  - Transfer data to external servers (except for license verification)
  - Use your data for marketing purposes
  
  ## User Rights and Control
  
  You have the right to:
  - Delete any or all of your stored data
  - Export your highlights and notes
  - Modify your saved content
  - Control all aspects of data collection through extension settings
  
  ## Data Retention
  - Data remains in your browser's local storage until you choose to delete it
  - Uninstalling the extension will remove all stored data
  - No backups are maintained on external servers
  
  ## Changes to Privacy Policy
  We may update this Privacy Policy from time to time. We will notify you of any changes by:
  - Posting the new Privacy Policy on our Chrome Web Store page
  - Updating the "Last Updated" date at the top of this policy
  
  ## Contact Information
  If you have questions about this Privacy Policy, please contact us at:
  [hritikkumarkota@gmail.com]
  
  ## Compliance
  This extension complies with:
  - Chrome Web Store Developer Program Policies
  - General Data Protection Regulation (GDPR)
  - California Consumer Privacy Act (CCPA)`
  },
  {
    id: 'chatgptpdf',
    name: 'ChatGPT to PDF Export Extension',
    policy: `Last Updated: 1 jan 2025
  
  Introduction
  Welcome to the ChatGPT to PDF Export extension! This privacy policy is designed to inform you about how we collect, use, and protect your data when you use our extension. By using the extension, you agree to the practices described in this privacy policy.
  
  Information We Do Not Collect
  We do not collect any personally identifiable information (PII) from users of the ChatGPT to PDF Export extension. We do not track or store your personal information such as your name, email address, or contact details. The extension does not collect health information, financial details, authentication credentials, personal communications, location data, web history, or any other private data.
  
  Data Usage
  The extension uses local storage solely to store your preferences related to the export formats (PDF, Word, text) and selected themes for PDF exports. This data is only stored for the purpose of providing a customized experience when exporting your conversations.
  
  - Export Preferences: We store your preferences for export formats and PDF themes to make it easier for you to use the extension.
  - Tabs and Host Permissions: The extension requires permission to access your active tabs and pages for ChatGPT and Google Gemini in order to export the content of your conversations. This permission is only used to perform the export functionality and is not used for any other purpose.
  
  No Remote Code
  The extension does not use any remote code. All code is contained within the extension package and executed locally within your browser. We do not fetch or execute any scripts from external sources.
  
  How We Protect Your Data
  We prioritize your privacy and data security. The ChatGPT to PDF Export extension is designed to operate fully within your browser. There are no external servers used, and we do not store any of your data on our servers. This means your data remains private and secure within your device.
  
  - No Data Sharing: We do not share any user data with third parties.
  - No Tracking: We do not track user activities or collect browsing data beyond what is necessary for the functionality of the extension.
  
  Data Retention
  The only data retained by the extension is related to your export preferences (such as format and theme). This data is stored locally in your browser and is deleted when you uninstall the extension. We do not retain any user data once the extension is uninstalled.
  
  Disclosures
  We certify the following disclosures:
  - We do not sell, share, or transfer your data to third parties for any purposes other than those directly related to the functionality of the extension.
  - We do not use or transfer your data to determine creditworthiness or for lending purposes.
  
  Cookies
  The extension does not use cookies to collect user data. However, if you are using our website to access the privacy policy, cookies may be used for website functionality, but this is separate from the extension itself.
  
  Changes to This Privacy Policy
  We may update this privacy policy from time to time. Any changes to this policy will be reflected on this page with an updated effective date. We encourage you to review this page periodically to stay informed about how we are protecting your information.
  
  Contact Us
  If you have any questions about this privacy policy or how we handle your data, please feel free to contact us at:
  [hritikkumarkota@gmail.com]`
  },
  {
    id: 'webpdf',
    name: 'Web2PDF',
    policy: `Privacy Policy for Web2PDF Chrome Extension
  
  Last updated: 2 jan 2025
  
  1. Data Collection
  - Our extension only processes webpage content for conversion purposes
  - We temporarily access the current tab's URL and content during conversion
  - No personal information is collected or stored
  - All processing is done locally in your browser
  
  2. Data Usage
  - Webpage content is only used for conversion to PDF/DOC/TXT/Image formats
  - Converted files are saved directly to your computer
  - No data is transmitted to external servers
  - No analytics or tracking is implemented
  
  3. Data Storage
  - No user data is stored by the extension
  - Converted files are saved only to your local device
  - No cookies or local storage is used
  
  4. Third-Party Access
  - No data is shared with third parties
  - All conversion processes happen locally in your browser
  
  5. User Rights
  - No personal data is collected, stored, or processed
  - The extension can be uninstalled at any time
  
  6. Contact
  hritikkumarkota@gmail.com
  
  7. Updates
  This privacy policy may be updated occasionally. Users will be notified of any significant changes.`
  },
  {
    id: 'omnisearchplus',
    name: 'OmniSearch Plus',
    policy: `# Privacy Policy for OmniSearch Plus
  
  Last Updated: 13-01-2025
  
  ## Introduction
  OmniSearch Plus ("we", "our", or "the extension") is committed to protecting your privacy. This privacy policy explains what information we collect, how we use it, and your rights regarding your data.
  
  ## Information We Collect
  OmniSearch Plus collects and processes the following data:
  
  1. **Search Queries**: When you use our extension to perform searches, we process your search queries to redirect you to your chosen search platform.
  2. **Theme Preferences**: We store your preferred theme setting (light/dark mode) locally in your browser.
  
  ## How We Use Your Information
  - Search queries are only used to redirect you to your chosen search platform (ChatGPT, Claude, YouTube, Bing, Brave, Yahoo, or DuckDuckGo).
  - Theme preferences are stored locally on your device using Chrome's storage API and are only used to maintain your visual preferences.
  
  ## Data Storage
  - All theme preferences are stored locally on your device using Chrome's storage sync API.
  - We do not maintain any external servers or databases.
  - We do not store or retain your search queries after they are processed.
  
  ## Data Sharing
  We do not:
  - Sell or rent your personal data to third parties
  - Share your data with external services
  - Track your browsing history
  - Collect any personally identifiable information
  
  ## Third-Party Services
  When you use our extension to search, you will be redirected to third-party services (ChatGPT, Claude, YouTube, etc.). Please note that these services have their own privacy policies and terms of service that we do not control.
  
  ## Your Rights
  You have the right to:
  - Clear your locally stored preferences at any time
  - Uninstall the extension, which will remove all stored data
  - Contact us with any privacy concerns
  
  ## Changes to This Policy
  We may update this privacy policy from time to time. We will notify you of any changes by posting the new privacy policy on the Chrome Web Store.
  
  ## Contact Us
  If you have any questions about this privacy policy, please contact us at hritikkumarkota@gmail.com`
  },
  {
    id: 'sora',
    name: 'Sora Video Downloader',
    policy: `# Privacy Policy for Sora Video Downloader
  
  Last Updated: January 15, 2025
  
  ## Introduction
  Sora Video Downloader ("we," "our," or "the extension") is committed to protecting your privacy while providing efficient video downloading capabilities from Sora's AI platform. This privacy policy outlines our data practices and your rights.
  
  ## Information Collection and Usage
  
  ### What We Collect:
  1. **Download Information**
     - Video URLs and metadata for download processing
     - Download preferences and settings
     - Temporary data required for batch downloads
  
  2. **Local Storage**
     - Download history (stored locally only)
     - User preferences for the side panel
     - Batch selection data
  
  ### What We DO NOT Collect:
  - Personal identification information
  - Login credentials
  - Payment information
  - Browsing history outside of Sora
  - User analytics or tracking data
  - IP addresses or location data
  
  ## Data Processing and Storage
  
  ### Local Processing
  - All video downloads are processed locally on your device
  - Batch download organization occurs within your browser
  - No data is transmitted to external servers
  - ZIP file creation happens entirely on your local machine
  
  ### Temporary Storage
  - Download data is temporarily stored during batch processing
  - All temporary data is automatically cleared after download completion
  - User preferences persist locally until extension removal
  
  ## Permissions
  
  The extension requires specific permissions to function:
  - Access to Sora's website: For download functionality
  - Downloads API: To save videos to your device
  - Storage: For managing batch downloads and preferences
  - Side Panel: For the video selection interface
  
  ## Data Security
  
  ### Security Measures
  - All operations occur locally within your browser
  - No external data transmission
  - No cloud storage or processing
  - Standard browser security protects local data
  
  ## User Rights and Control
  
  You have the right to:
  - Clear download history at any time
  - Remove stored preferences
  - Disable or uninstall the extension
  - Control all aspects of the download process
  
  ## Third-Party Services
  
  - This extension interacts only with Sora's platform
  - No third-party analytics or tracking services
  - No advertising or marketing integrations
  - All downloads comply with Sora's terms of service
  
  ## Updates and Changes
  
  We may update this privacy policy to reflect:
  - New extension features
  - Chrome Web Store policy changes
  - Security improvements
  - User feedback and concerns
  
  ## Contact Information
  
  For privacy-related questions or concerns, contact us at:
  hritikkumarkota@gmail.com
  
  ## Compliance
  
  This extension adheres to:
  - Chrome Web Store Developer Program Policies
  - General Data Protection Regulation (GDPR)
  - California Consumer Privacy Act (CCPA)
  - Sora's Platform Terms of Service
  
  ## Data Deletion
  
  Upon extension removal:
  - All local data is permanently deleted
  - Download history is cleared
  - User preferences are removed
  - No residual data remains
  
  By using Sora Video Downloader, you agree to the terms outlined in this privacy policy.`
  },
  {
    id: 'Phoneandemail',
    name: 'Email & Phone Extractor',
    policy: `Last Updated: 17 jan 2025
  
  1. Introduction
  
  Welcome to the Email & Phone Extractor Chrome Extension ("we," "our," or "the Extension"). This Privacy Policy explains how we handle information when you use our Extension. We are committed to protecting your privacy and being transparent about our practices.
  
  2. Information Collection
  
  2.1 Contact Information Collection
  The Extension collects the following types of information from web pages you visit:
  - Email addresses
  - Phone numbers
  
  2.2 How Collection Works
  - Information is extracted only from web pages you actively visit
  - Collection occurs only when you click the Extension icon or interact with its features
  - All scanning is done locally in your browser
  - No information is collected from secure or private web pages
  
  
  By using the Extension, you acknowledge that you have read and understood this Privacy Policy and agree to its terms.`
  }
  
  ,{id:'Deepseekpro',name:'Deepseek Pro',policy:`
    
    Privacy Policy for DeepSeek Pro

Last update Date: 31-01-2025

Thank you for using DeepSeek Pro. Your privacy is important to us. This Privacy Policy explains how our Chrome extension handles your data.

1. Data Collection and Usage

DeepSeek Pro does not collect, store, or share any personal data. All data, including chat history, preferences, and settings, are stored locally on your device and are not transmitted to external servers.

2. Permissions Used and Justification

To provide the best user experience, our extension requires certain permissions:

Storage: Used to save user preferences, custom prompts, chat themes, and folder structures locally.

WebNavigation: Detects when the user is on the DeepSeek chat page to enable extension functionality.

Tabs: Manages multiple DeepSeek chat tabs for better organization and access.

Host Permissions:

https://chat.deepseek.com/: Allows modification and enhancement of the chat interface.

https://api.gumroad.com/: Used only to verify premium purchases securely. No payment details are stored or accessed.

3. Data Security

Since all data is stored locally on your device, we do not have access to any user information. The extension does not transmit data to any third-party services, ensuring your privacy and security.

4. Third-Party Services

DeepSeek: This extension interacts with DeepSeek’s chat platform but is not affiliated with or endorsed by DeepSeek.

Gumroad: We use Gumroad’s API solely for verifying premium purchases. We do not collect or process payment information.

5. Changes to This Privacy Policy

We may update this Privacy Policy from time to time. Any changes will be reflected in this document with an updated effective date.

6. Contact Us

If you have any questions about this Privacy Policy, please contact us at:Email: hritikkumarkota@gmail.com

By using DeepSeek Pro, you agree to this Privacy Policy. If you do not agree, please discontinue use of the extension.



    `} 
   
  ];

export default function PrivacyPolicy() {
  const params = useParams();
  const router = useRouter();
  const [selectedProduct, setSelectedProduct] = useState(params.productId as string || 'leadspry');

  useEffect(() => {
    // Ensure URL matches selected product on mount
    if (params.productId !== selectedProduct) {
      setSelectedProduct(params.productId as string);
    }
  }, [params.productId]);

  const handleProductChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const value = event.target.value;
    setSelectedProduct(value);
    // Use Next.js router for navigation
    router.push(`/privacy-policy/${value}`);
  };

  const currentPolicy = products.find(p => p.id === selectedProduct)?.policy || '';

  return (
    <div className="privacy-policy-container">
      <h1 className="privacy-policy-title">Privacy Policy</h1>
      
      <div className="select-container">
        <select 
          value={selectedProduct} 
          onChange={handleProductChange}
          className="product-select"
        >
          {products.map((product) => (
            <option key={product.id} value={product.id}>
              {product.name}
            </option>
          ))}
        </select>
      </div>

      <div className="policy-content">
        <h2 className="policy-product-title">
          {products.find(p => p.id === selectedProduct)?.name} Privacy Policy
        </h2>
        <div className="policy-text whitespace-pre-wrap">
          {currentPolicy}
        </div>
      </div>
    </div>
  );
} 