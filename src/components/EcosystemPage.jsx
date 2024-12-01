import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getAuth, signOut } from 'firebase/auth';
import Nav from './Nav';
import Footer from './Footer';
import "../styles.css";
import Alexa from '/images/alexa.jpg'; // with import
import HK from '/images/homekit.jpg'; // with import
import HAS from '/images/has.jpg'; // with import

/**
 * EcosystemPage Component
 * 
 * Provides detailed information about different smart home ecosystems.
 * Features comparative analysis of major platforms (Alexa, HomeKit, etc.)
 * Includes interactive image gallery with modal view functionality.
 */

const EcosystemPage = () => {
  const navigate = useNavigate();
  const auth = getAuth();
  
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (!user) {
        navigate('/login');
      }
    });

    return () => unsubscribe();
  }, [navigate]);

  const [modalContent, setModalContent] = useState({ isVisible: false, src: "", alt: "" });

  const openModal = (src, alt) => {
    setModalContent({ isVisible: true, src, alt });
  };

  const closeModal = () => {
    setModalContent({ isVisible: false, src: "", alt: "" });
  };

  const handleLogout = () => {
    signOut(auth).then(() => {
      navigate('/login');
    }).catch((error) => {
      console.error('Error signing out:', error);
    });
  };

  /**
   * Gallery configuration for ecosystem UI examples
   * Contains image source and alt text for each ecosystem interface
   */
  const galleryItems = [
    { src: Alexa, alt: "UI Example for Alexa" },
    { src: HK, alt: "UI Example for HomeKit" },
    { src: HAS, alt: "UI Example for Home Assistant" },
  ];

  return (
    <div className="page-container">
      <div className="content-wrap">
        <header>
          <h1>Smart Home Ecosystems</h1>
        </header>

        <Nav />

        {/* Main content */}
        <main className="content">
          <section className="intro">
            <h2>Understanding Smart Home Ecosystems</h2>
            <p>
              Some devices only work with certain ecosystems, and sometimes devices will work better with different
              ecosystems. This is why we start building a smart home with the choice of ecosystem. From here, we
              find devices that work specifically with our ecosystem of choice, and we make sure they work the way
              we want them to.
            </p>
            <p>
              Amazon Alexa is an easy choice, but it comes with some trade-offs in certain areas. Think of the Alexa
              ecosystem as the beginner system. It is great for simple automations like turning on lights at a certain
              hour or when you arrive home, but it lacks key aspects in my opinion.
            </p>
            <p>
              HomeKit is the all-in-one package, but has fewer options, which means everything that works with
              HomeKit is generally more expensive. If you are used to an iPhone and are willing to pay the increased
              prices, HomeKit is the best option for starting a smart home.
            </p>
            <p>
              Google also has an option for an ecosystem. But Google lacks compatibility with smart devices
              compared to Alexa, so most people would rather go with Alexa as they are seemingly similar.
            </p>
            <p>
              Now there are other options, although they get much more complex, and some even require the knowledge
              to write your own automations and scripts. Although there is a heavy learning curve for some, this is by
              far the best option for compatibility.
            </p>
          </section>

          {/* UI Examples */}
          <section className="ui-examples">
            <h2>UI Examples</h2>
            <div className="image-gallery">
              {galleryItems.map((item, index) => (
                <div className="image-item" key={index}>
                  <img
                    src={item.src}
                    alt={item.alt}
                    onClick={() => openModal(item.src, item.alt)}
                  />
                  <p>{item.alt}</p>
                </div>
              ))}
            </div>
          </section>
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

export default EcosystemPage;
