/**
 * HomePage Component
 * 
 * Serves as the main landing page for the smart home application.
 * Features navigation to different sections, an interactive image modal,
 * and authentication protection.
 */

import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getAuth } from 'firebase/auth';
import Nav from './Nav';
import Footer from './Footer';
import "../styles.css";

import Batcomputer from '/images/batcomputer.jpg';

const HomePage = () => {
  const navigate = useNavigate();
  const auth = getAuth();
  const [modalContent, setModalContent] = useState({ isVisible: false, src: "", alt: "" });

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (!user) {
        navigate('/login');
      }
    });

    return () => unsubscribe();
  }, [navigate]);

  const openModal = (src, alt) => {
    setModalContent({ isVisible: true, src, alt });
  };

  const closeModal = () => {
    setModalContent({ isVisible: false, src: "", alt: "" });
  };

  /**
   * Navigation sections configuration
   * Each section contains:
   * - title: Display name for the section
   * - description: Brief overview of section contents
   * - link: Router path to the section
   */
  const sections = [
    {
      title: "Devices",
      description: "A page dedicated to the devices found in a smart home, and why they are used.",
      link: "/devices",
    },
    {
      title: "Ecosystems",
      description: "A page dedicated to the different ecosystems available, with pros and cons.",
      link: "/ecosystems",
    },
    {
      title: "Security",
      description: "A page dedicated to the most important and widely used implementations for a smart home.",
      link: "/security",
    },
    {
      title: "Catalog",
      description: "Make informed decisions with a catalog of devices and options to learn more.",
      link: "/catalog",
    },
  ];

  return (
    <div className="page-container">
      <div className="content-wrap">
        <header>
          <h1>Enhance Your Living With Technology</h1>
        </header>

        <Nav />

        {/* Image and modal functionality */}
        <div style={{ textAlign: "center", paddingTop: "40px" }}>
          <img
            src={Batcomputer} // Use the preloaded image
            alt="Bat Computer"
            style={{
              width: "100%",
              maxWidth: "560px",
              height: "auto",
              border: "2px solid #ccc",
              boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
              marginBottom: "10px",
            }}
            onClick={() => openModal(Batcomputer, "Bat Computer")} // Pass the preloaded image
          />
        </div>

        {/* Main content */}
        <main className="content">
          <div className="intro">
            <h2>Welcome to Smart Homes</h2>
            <p>
              Think of all the great helpers in pop culture recently. The Batcomputer (Batman), JARVIS (Ironman),
              Collinsworth (Fallout) all of which are some sort of futuristic butler used to help everyday life. Would
              it not be cool to start investing now, I mean look at how much fun Batman and Robin have when the
              computer does all the work.
            </p>
            <p>
              To start a smart home, you will want to select an ecosystem first, as some devices do not work with
              certain ecosystems. However, it is nice to view your options in devices; finding what matters to you is
              the best way to pick an ecosystem that works for you.
            </p>
          </div>

          {/* Dynamic sections */}
          <div className="sections">
            {sections.map((section, index) => (
              <div 
                className="section" 
                key={index} 
                onClick={() => navigate(section.link)}
                style={{ cursor: 'pointer' }}
              >
                <h2>{section.title}</h2>
                <p>{section.description}</p>
              </div>
            ))}
          </div>
        </main>
      </div>
      <Footer />

      {/* Modal */}
      {modalContent.isVisible && (
        <div className="modal" onClick={closeModal}>
          <span className="modal__close" onClick={closeModal}>
            &times;
          </span>
          <div className="modal__content">
            <img src={modalContent.src} alt={modalContent.alt} />
          </div>
        </div>
      )}
    </div>
  );
};

export default HomePage;
