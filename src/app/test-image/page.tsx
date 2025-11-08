export default function TestImagePage() {
  return (
    <div className="min-h-screen py-20" style={{background: 'linear-gradient(135deg, #0f172a, #1e293b)'}}>
      <div className="container mx-auto px-4 max-w-4xl">
        <h1 className="text-4xl font-bold text-white mb-8">Image Test Page</h1>
        
        <div className="bg-white p-8 rounded-lg mb-8">
          <h2 className="text-2xl font-bold mb-4">Direct Image Test</h2>
          <img src="/images/blog/quickvpnproxy.png" alt="QuickVPN Proxy Test" style={{maxWidth: '500px'}} />
        </div>

        <div className="bg-[rgba(15,23,42,0.6)] backdrop-blur-[10px] border border-[rgba(124,58,237,0.1)] rounded-xl p-8">
          <h2 className="text-2xl font-bold text-white mb-4">Blog Content Styled Test</h2>
          <div className="blog-content">
            <figure>
              <img src="/images/blog/quickvpnproxy.png" alt="QuickVPN Proxy Chrome Extension Interface" className="img-full" />
              <figcaption>QuickVPN Proxy - Your gateway to secure and unrestricted browsing</figcaption>
            </figure>
            
            <p>This is a test paragraph with an image above.</p>
            
            <img src="/images/blog/quickvpnproxy.png" alt="QuickVPN Proxy Test 2" className="img-center" />
          </div>
        </div>
      </div>
    </div>
  );
}