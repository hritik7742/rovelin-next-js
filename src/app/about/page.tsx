import Image from 'next/image';

export const metadata = {
  title: "About Rovelin Studio | Our Story & Mission",
  description: "Learn about Rovelin Studio's journey, our mission to create innovative software solutions, and our commitment to excellence in Chrome extension and web application development.",
};

export default function About() {
  return (
    <div className="about-container">
      <div className="about-hero">
        <h1>About Rovelin Studio</h1>
        <p className="subtitle">Innovating for Tomorrow's Solutions</p>
      </div>

      <div className="about-content">
        <div className="about-section">
          <div className="about-image">
            <Image 
              src="/images/web.jpg" 
              alt="Rovelin Studio Team"
              width={600}
              height={400}
              className="rounded-lg"
            />
          </div>
          <div className="about-text">
            <h2>Our Story</h2>
            <p>At Rovelin Studio, we're passionate about creating innovative solutions that make a difference. Founded with a vision to transform how people interact with technology, we've grown into a team of dedicated professionals committed to excellence.</p>
          </div>
        </div>

        <div className="mission-values">
          <h2>Our Mission & Values</h2>
          <div className="values-grid">
            <div className="value-card">
              <div className="value-icon">🎯</div>
              <h3>Innovation</h3>
              <p>Pushing boundaries to create cutting-edge solutions that solve real-world problems.</p>
            </div>
            <div className="value-card">
              <div className="value-icon">💡</div>
              <h3>Excellence</h3>
              <p>Committed to delivering high-quality products that exceed expectations.</p>
            </div>
            <div className="value-card">
              <div className="value-icon">🤝</div>
              <h3>Integrity</h3>
              <p>Building trust through transparent and ethical business practices.</p>
            </div>
            <div className="value-card">
              <div className="value-icon">🌍</div>
              <h3>Impact</h3>
              <p>Creating meaningful change in how people interact with technology.</p>
            </div>
          </div>
        </div>

        <div className="team-section">
          <h2>Our Expertise</h2>
          <div className="expertise-grid">
            <div className="expertise-card">
              <h3>Chrome Extensions</h3>
              <p>Specialized in developing powerful browser extensions that enhance productivity and user experience.</p>
            </div>
            <div className="expertise-card">
              <h3>Web Applications</h3>
              <p>Creating responsive and intuitive web applications that solve complex business challenges.</p>
            </div>
            <div className="expertise-card">
              <h3>Custom Solutions</h3>
              <p>Developing tailored software solutions to meet specific business needs and requirements.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 