/**
 * @component CatalogPage
 * @description Interactive catalog displaying smart home products and ecosystems
 * 
 * Features:
 * - Dynamic data fetching from Firebase Realtime Database
 * - Hierarchical display of products (categories -> devices -> models)
 * - Expandable/collapsible sections with animations
 * - Price and feature comparisons
 * - Responsive design
 * 
 * Data structure:
 * catalog/
 *   ├── devices/
 *   │   └── [device]/
 *   │       └── models/
 *   │           └── [model]/
 *   │               ├── modelName
 *   │               ├── price
 *   │               ├── features[]
 *   │               └── competitionDiff
 *   ├── ecosystems/
 *   ├── security/
 *   └── additions/
 * 
 * @uses {firebase/database} for real-time data
 * @uses {firebase/auth} for authentication
 */

import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getAuth, signOut } from 'firebase/auth';
import { getDatabase, ref, get } from 'firebase/database';
import "../styles.css";
import Nav from './Nav';
import Footer from './Footer';

const CatalogPage = () => {
  const navigate = useNavigate();
  const auth = getAuth();
  const [catalogData, setCatalogData] = useState({
    devices: [],
    ecosystems: [],
    security: [],
    additions: []
  });
  
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (!user) {
        navigate('/login');
      }
    });

    return () => unsubscribe();
  }, [navigate]);

  // State for toggling visibility
  const [visibleSections, setVisibleSections] = useState({});
  const [expandedDevices, setExpandedDevices] = useState({});
  const [expandedModels, setExpandedModels] = useState({});

  useEffect(() => {
    const fetchCatalogData = async () => {
      const db = getDatabase();
      try {
        const categoriesRef = ref(db, 'catalog');
        const snapshot = await get(categoriesRef);
        if (snapshot.exists()) {
          setCatalogData(snapshot.val());
        }
      } catch (error) {
        console.error("Error fetching catalog data:", error);
      }
    };

    fetchCatalogData();
  }, []);

  // Function to toggle section visibility
  const toggleSection = (section) => {
    setVisibleSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  // Toggle device expansion
  const toggleDevice = (categoryKey, deviceKey) => {
    setExpandedDevices(prev => ({
      ...prev,
      [`${categoryKey}-${deviceKey}`]: !prev[`${categoryKey}-${deviceKey}`]
    }));
  };

  // Add toggle function for individual models
  const toggleModel = (categoryKey, deviceKey, modelKey) => {
    setExpandedModels(prev => ({
      ...prev,
      [`${categoryKey}-${deviceKey}-${modelKey}`]: !prev[`${categoryKey}-${deviceKey}-${modelKey}`]
    }));
  };

  /**
   * Renders individual model information with expandable details
   * @param {string} categoryKey - Category identifier
   * @param {string} deviceKey - Device identifier
   * @param {string} modelKey - Model identifier
   * @param {Object} model - Model data object
   */
  const renderModel = (categoryKey, deviceKey, modelKey, model) => (
    <div key={modelKey} className="model-card">
      <div onClick={() => toggleModel(categoryKey, deviceKey, modelKey)}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h4 style={{ margin: 0 }}>{model.modelName}</h4>
          <span className="price-badge">{model.price}</span>
        </div>
        {expandedModels[`${categoryKey}-${deviceKey}-${modelKey}`] && (
          <div style={{ marginTop: '16px' }}>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
              {model.features.map((feature, idx) => (
                <span key={idx} className="feature-tag">{feature}</span>
              ))}
            </div>
            <p style={{ marginTop: '16px', fontStyle: 'italic', color: '#666' }}>
              {model.competitionDiff}
            </p>
          </div>
        )}
      </div>
    </div>
  );

  const renderModels = (categoryKey, deviceKey, models) => {
    if (!models) return null;
    
    return Object.entries(models).map(([modelKey, model]) => 
      renderModel(categoryKey, deviceKey, modelKey, model)
    );
  };

  const renderDeviceCategory = (deviceKey, deviceData) => (
    <div key={deviceKey} className="device-card">
      <h3 
        onClick={() => toggleDevice("Devices", deviceKey)}
        style={{ margin: 0 }}
      >
        {deviceKey.replace(/_/g, ' ')} {expandedDevices[`Devices-${deviceKey}`] ? '▼' : '▶'}
      </h3>
      {expandedDevices[`Devices-${deviceKey}`] && (
        <div style={{marginTop: '12px'}}>
          {renderModels("Devices", deviceKey, deviceData.models)}
        </div>
      )}
    </div>
  );

  const renderCategoryContent = (categoryData, sectionTitle) => {
    if (!categoryData) return null;
    
    return (
      <ul className="sub-options">
        {Object.entries(categoryData).map(([deviceKey, deviceData]) => 
          renderDeviceCategory(deviceKey, deviceData)
        )}
      </ul>
    );
  };

  // Sections to render
  const sections = [
    { title: "Devices", data: catalogData.devices },
    { title: "Ecosystems", data: catalogData.ecosystems },
    { title: "Security", data: catalogData.security },
    { title: "Cool Additions", data: catalogData.additions },
  ];

  const handleLogout = () => {
    signOut(auth).then(() => {
      navigate('/login');
    }).catch((error) => {
      console.error('Error signing out:', error);
    });
  };

  return (
    <div className="page-container">
      <div className="content-wrap">
        <header>
          <h1>The Smart Home Catalog</h1>
        </header>

        <Nav />

        <main className="content">
          {sections.map((section, index) => (
            <div key={index} className="catalog-section">
              <div 
                className="catalog-section-header" 
                onClick={() => toggleSection(section.title)}
              >
                <h2 style={{margin: 0}}>{section.title}</h2>
                <span>{visibleSections[section.title] ? '▼' : '▶'}</span>
              </div>
              {visibleSections[section.title] && (
                <div className="catalog-section-content">
                  {renderCategoryContent(section.data, section.title)}
                </div>
              )}
            </div>
          ))}
        </main>
      </div>
      <Footer />
    </div>
  );
};

export default CatalogPage;
