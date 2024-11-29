import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getAuth, signOut } from 'firebase/auth';
import Nav from './Nav';
import Footer from './Footer';
import "../styles.css";

const SecurityPage = () => {
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

  const handleLogout = () => {
    signOut(auth).then(() => {
      navigate('/login');
    }).catch((error) => {
      console.error('Error signing out:', error);
    });
  };

  const sections = [
    {
      title: "Enhance Your Security with Smart Devices",
      content: [
        "One of the main reasons people start a smart home is for a better sense of security. This comes from things like cameras, smart locks, door sensors, motion sensors, and alarm systems. When starting a smart home, it is best to determine which ecosystem you're planning on committing to before you start building, because some devices do not work the same or at all depending on which ecosystem they are a part of.",
        "Cameras are the best way to catch someone, as you can't really argue with video evidence. With companies like Ring, Nest, and Eufy all having competitive options for cameras, your decision is really going to come down to which settings matter the most to you. However, generally, the important settings are standard these days. With features like motion and person event notifications, it is easy to see who is coming around, and you even have the option to record clips and take screenshots.",
        "Smart locks are the next step in the build process. I like smart locks for peace of mind and the ease of letting someone inside when you're not home. No more double-checking if doors are locked when you leave the house, and with auto-locking features that make sure it stays locked during the day, these are key reasons to invest in a nice smart lock. There are even smart lock options made for renters or people who do not want it to look like they have a smart lock.",
        "When I say alarm systems, I am thinking about a panel on the wall that makes a loud noise when the alarm is tripped. Ring, ADT, Vivint, and Eufy all have options for a system like this, and they can be programmed to track your mobile phone to automatically set and disarm the alarm for you. For the most part, things like motion sensors and door sensors (a way to tell if a door is open or closed) come in package deals with alarm systems or can be added for an additional cost. All we want from an alarm panel is something that will wake us up at night or notify us via mobile app when a door is opened.",
      ],
    },
  ];

  return (
    <div className="page-container">
      <div className="content-wrap">
        <header>
          <h1>Smart Homes for Security</h1>
        </header>

        <Nav />

        <main className="content">
          {sections.map((section, index) => (
            <section className="intro" key={index}>
              <h2>{section.title}</h2>
              {section.content.map((paragraph, idx) => (
                <p key={idx}>{paragraph}</p>
              ))}
            </section>
          ))}
        </main>
      </div>
      <Footer />
    </div>
  );
};

export default SecurityPage;
