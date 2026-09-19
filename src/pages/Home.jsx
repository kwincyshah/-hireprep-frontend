import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Navbar from '../components/Navbar';
import './Home.css';

function Home() {
  const [showCategoryDropdown, setShowCategoryDropdown] = useState(false);
  const location = useLocation();

  useEffect(() => {
    if (location.hash) {
      const sectionId = location.hash.replace('#', '');
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      window.scrollTo(0, 0);
    }
  }, [location]);

  return (
    <div className="home-page" id="home">
      <Navbar
        showCategoryDropdown={showCategoryDropdown}
        setShowCategoryDropdown={setShowCategoryDropdown}
      />

      <section className="hero-section">
        <img src="/images/hero-bg.png" alt="Interview waiting" className="hero-img" />
        <h1 className="hero-title logo-font">HIREPREP</h1>
      </section>

      <section className="about-section" id="about">
        <h2 className="about-heading">About Us</h2>
        <p className="about-tagline">
          Prepare Better. Answer Smarter. Interview with Confidence.
        </p>
        <p className="about-text">
          Our platform is designed to help students, freshers, and professionals become truly interview-ready. From understanding commonly asked interview questions to learning how to structure strong answers, we provide practical guidance to help you perform with confidence.
        </p>
        <p className="about-text">
          Whether you are attending your first interview or preparing for your next career opportunity, our platform helps you understand what to expect, how to respond, and where you need to improve.
        </p>

        <div className="mission-row">
          <div className="mission-text">
            <h3>Our Mission</h3>
            <p>Our mission is simple: to make interview preparation easier, smarter, and more accessible for everyone.</p>
            <p>We want candidates to walk into an interview not wondering "What will they ask me?", but thinking "I'm ready for this."</p>
            <button className="try-now-btn" onClick={() => setShowCategoryDropdown(true)}>
              TRY NOW
            </button>
          </div>
          <div className="mission-image">
            <img src="/images/about-person.png" alt="Professional" />
          </div>
        </div>
      </section>

      <footer className="contact-section" id="contact">
        <h3>Contact</h3>
        <p>+91 26581 68416</p>
        <p>hireprep@gmail.com</p>
      </footer>
    </div>
  );
}

export default Home;