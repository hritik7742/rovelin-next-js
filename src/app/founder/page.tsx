"use client";

import Image from 'next/image';
import './founder.css';
import founder from './founder.jpeg';

export default function FounderPage() {
  return (
    <div className="founder-container">
      <div className="founder-hero">
        <h1>Our Founder</h1>
        <p className="subtitle">The Story Behind Rovelin Studio</p>
      </div>

      <div className="founder-content">
        <div className="founder-image-block">
          <div className="founder-image-container">
            <Image
              src={founder}
              alt="Hritik Choudhary - Founder of Rovelin Studio"
              width={400}
              height={500}
              className="founder-image"
            />
          </div>
          <div className="founder-social-card">
            <h3>Connect with Hritik</h3>
            <div className="founder-social-links">
              <a 
                href="https://x.com/Hritik7742" 
                target="_blank" 
                rel="noopener noreferrer"
                className="founder-social-link founder-twitter"
              >
                <svg className="founder-social-icon" viewBox="0 0 24 24" fill="currentColor" width="24" height="24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                </svg>
                <span>@Hritik7742</span>
              </a>
              <a 
                href="https://www.instagram.com/hritik_choudhary00" 
                target="_blank" 
                rel="noopener noreferrer"
                className="founder-social-link founder-instagram"
              >
                <svg className="founder-social-icon" viewBox="0 0 24 24" fill="currentColor" width="24" height="24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
                <span>@hritik_choudhary00</span>
              </a>
            </div>
          </div>
        </div>

        <div className="founder-story">
          <h2>The Journey of a Dreamer – Hritik Choudhary</h2>
          
          <div className="story-block">
          <p>
  From the moment I wrote my first line of code at 15, something inside me shifted. I didn’t just find a skill—I found a purpose. Coding wasn’t just about logic or syntax; it became my way of building, expressing, and solving real-world problems.
</p>

<p>
  As a computer science student, I wasn’t just studying to pass exams—I was waking up early and staying up late to bring ideas to life. There were moments of frustration, endless bugs, and doubts that crept in during quiet nights. But every failure taught me something, and every tiny win reminded me why I started.
</p>

<p>
  That relentless passion led to the birth of Rovelin Studio—not from a polished plan, but from countless hours of learning, failing, and creating. It wasn’t about launching a business; it was about turning my journey into something that could help others. A real solution born from real struggles.
</p>

<p>
  Rovelin Studio is more than a brand to me—its my voice, my vision, and a reflection of everything I believe in. Every browser extension and digital tool we build is designed with empathy. We don’t guess what users need; we’ve lived those needs ourselves.
</p>

<p>
  Watching our tools reach thousands of users is deeply personal. It means the late nights, the lonely grinds, and the moments I almost gave up—all of it was worth it. We are not just improving workflows—we are empowering people to work smarter, focus better, and unlock more possibilities.
</p>

<p>
  And this is just the beginning. Every new day brings new challenges, and I welcome them with the same fire that started it all. At Rovelin Studio, our mission remains clear: to build meaningful tools that make life easier, more productive, and a little more inspired.
</p>

<p>
  To everyone who’s been a part of this journey—thank you. Your support, feedback, and belief in what we’re doing mean the world. This isn’t just my story anymore—it’s ours.
</p>


            <div className="founder-signature">
              <p>With gratitude and excitement for the future,</p>
              <h3>Hritik Choudhary</h3>
              <p className="title">Founder & CEO, Rovelin Studio</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 