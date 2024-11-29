import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getAuth, signOut } from 'firebase/auth';
import Nav from './Nav';
import Footer from './Footer';
import "../styles.css";
import RobotHAS from '/images/robot_has.jpg'; // with import
import RobotHK from '/images/robot_homekit.jpg'; // with import

const DevicePage = () => {
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

  const galleryItems = [
    { src: RobotHAS, alt: "Robot Vacuum in Home Assistant" },
    { src: RobotHK, alt: "Robot Vacuum in HomeKit" },
  ];

  return (
    <div className="page-container">
      <div className="content-wrap">
        <header>
          <h1>Smart Home Devices</h1>
        </header>

        <Nav />

        {/* Main content */}
        <main className="content">
          <section className="intro">
            <h2>Explore Smart Home Devices</h2>
            <p>
              There are a lot of miscellaneous devices that can be added to your smart home, whether that be for
              lighting, thermostats, cleaning robots, or even smart speakers for whole-home audio. These devices
              will come down to what you want to do with your smart home or even just fun additions to enhance
              your setup.
            </p>
            <p>
              Thermostats are one of the best ways to save money within a smart home. If you're someone who spends
              a lot of time away from home, this could help reduce your electric bill significantly. Turning your AC
              off, or even just increasing the temperature threshold when you're away, means your A/C is not
              constantly cooling or heating when nobody is home.
            </p>
            <p>
              Cleaning robots are arguably a must-have in a smart home. If you are willing to spend enough for a
              robot with an auto-empty system and room mapping features, you'll forget the robot even exists, and
              your floors will always stay clean. Cheap robots will get the job done, but in my opinion, if you're not
              willing to invest in one, you might as well stick to hand vacuuming.
            </p>
            <p>
              Smart lights or smart bulbs are a convenience option, or even a styling choice for most people.
              Especially with table lamps, smart bulbs are an easy option to make it convenient to turn them on and
              off without getting off the couch. With endless options out there, you can choose from a variety of
              colors and brightness options. But remember to check if a bulb will work with your selected ecosystem.
            </p>
            <p>
              There are also lots of miscellaneous items you can add to do just about anything you want. Smart
              plugs, relays, and countless sensors can be used to convert seemingly "dumb" devices into something
              you can control with the click of a button. This part takes creativity to really take advantage of, but
              with the right sensors, anything can be made into a smart device.
            </p>
            <p>
              As mentioned, some devices show up differently depending on which ecosystem they are a part of. Just
              keep this in mind when selecting devices for a specific ecosystem, and make sure they work as you
              intended.
            </p>
          </section>

          {/* Image Gallery */}
          <section className="examples">
            <h2>Examples</h2>
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

export default DevicePage;
