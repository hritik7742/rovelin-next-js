'use client';

import Link from 'next/link';
import { useEffect } from 'react';
import Image from 'next/image';
import './not-found.css';

export default function NotFound() {
  useEffect(() => {
    // Add animation class after component mounts
    const astronaut = document.querySelector('.astronaut');
    if (astronaut) {
      astronaut.classList.add('float');
    }
  }, []);

  return (
    <div className="not-found-container">
      <div className="stars"></div>
      <div className="central-body">
        <div className="error-content">
          <h1 className="error-title">404</h1>
          <div className="astronaut">
            <Image 
              src="/images/astronaut.svg" 
              alt="Floating Astronaut"
              width={140}
              height={140}
            />
          </div>
          <h2>{"Page Not Found"}</h2>
          <p>{"Oops! Looks like you've ventured into unknown space."}</p>
          <Link href="/" className="go-home">
            {"Return to Earth"}
          </Link>
        </div>
      </div>
    </div>
  );
} 