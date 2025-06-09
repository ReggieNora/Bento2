import React from 'react';
import './ProfileCard.css';

// Employer card CSS override to remove gradient/transparent text
const employerOverride = `
  .employer-details p,
  .employer-details h2,
  .employer-details h3,
  .employer-details h4 {
    color: #fff !important;
    background: none !important;
    background-image: none !important;
    background-clip: unset !important;
    -webkit-background-clip: unset !important;
    -webkit-text-fill-color: #fff !important;
  }
`;

interface CompanyProfileCardProps {
  onViewProfile?: () => void;
}

const DEFAULT_BEHIND_GRADIENT =
  "radial-gradient(farthest-side circle at var(--pointer-x) var(--pointer-y),hsla(266,100%,90%,var(--card-opacity)) 4%,hsla(266,50%,80%,calc(var(--card-opacity)*0.75)) 10%,hsla(266,25%,70%,calc(var(--card-opacity)*0.5)) 50%,hsla(266,0%,60%,0) 100%),radial-gradient(35% 52% at 55% 20%,#00ffaac4 0%,#073aff00 100%),radial-gradient(100% 100% at 50% 50%,#00c1ffff 1%,#073aff00 76%),conic-gradient(from 124deg at 50% 50%,#c137ffff 0%,#07c6ffff 40%,#07c6ffff 60%,#c137ffff 100%)";
const DEFAULT_INNER_GRADIENT =
  "linear-gradient(145deg,#60496e8c 0%,#71C4FF44 100%)";

const CompanyProfileCard: React.FC<CompanyProfileCardProps> = ({ onViewProfile }) => {
  const companyInfo = {
    name: "Hirly, Inc.",
    logo: "https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=600",
    location: "San Francisco, CA",
    website: "hirly.com",
    size: "50-200 employees",
    founded: "2023",
    industry: "Technology",
    description: "Revolutionizing the hiring process with AI-powered recruitment solutions.",
    specialties: ["AI Recruitment", "Talent Matching", "HR Technology"],
    benefits: ["Remote First", "Health Insurance", "401(k)", "Flexible PTO"],
    awards: ["Best Tech Startup 2023", "Innovation Award 2023"]
  };

  // Style for gradients, like ProfileCard
  const cardStyle = {
    '--icon': 'none',
    '--grain': 'none',
    '--behind-gradient': DEFAULT_BEHIND_GRADIENT,
    '--inner-gradient': DEFAULT_INNER_GRADIENT
  } as React.CSSProperties;

  return (
    <div className="pc-card-wrapper" style={cardStyle}>
      <section className="pc-card">
        <div className="pc-inside">
          <div className="pc-shine" />
          <div className="pc-glare" />
          {/* Faded company logo as background */}
          <div
            className="pc-profile-bg"
            style={{
              backgroundImage: `url(${companyInfo.logo})`,
              position: 'absolute',
              inset: 0,
              zIndex: 1,
              opacity: 0.18,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              filter: 'blur(0.5px) grayscale(10%)',
              pointerEvents: 'none',
              borderRadius: 'inherit',
            }}
          />
          <div className="pc-content" style={{ mixBlendMode: 'normal' }}>
            <div className="pc-details employer-details">
              <div className="flex flex-col items-center mb-6">
                <div className="w-24 h-24 rounded-2xl overflow-hidden mb-4 border-2 border-white/20">
                  <img
                    src={companyInfo.logo}
                    alt={companyInfo.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <h2 style={{ color: '#fff', fontWeight: 700, fontSize: '2rem', textAlign: 'center', margin: 0 }}>
                  {companyInfo.name}
                </h2>
                <p className="text-white/60 mt-1">{companyInfo.industry}</p>
              </div>
              {/* Quick Info */}
              <div className="space-y-2 mb-6">
                <div className="flex items-center space-x-3">
                  <span className="material-icons text-white/60">location_on</span>
                  <span className="text-white/80">{companyInfo.location}</span>
                </div>
                <div className="flex items-center space-x-3">
                  <span className="material-icons text-white/60">groups</span>
                  <span className="text-white/80">{companyInfo.size}</span>
                </div>
                <div className="flex items-center space-x-3">
                  <span className="material-icons text-white/60">public</span>
                  <span className="text-white/80">{companyInfo.website}</span>
                </div>
              </div>
              {/* About Us */}
              <div className="text-left mt-6 mb-6" style={{ minHeight: '100px' }}>
                <h4 style={{ color: '#fff', fontWeight: 800, fontSize: '1.2rem', margin: '0 0 1rem 0' }}>About Us</h4>
                <p style={{ color: '#fff', fontSize: '1rem', lineHeight: 1.6, maxWidth: 420, margin: 0 }}>
                  {companyInfo.description}
                </p>
              </div>
              {/* Specialties */}
              <div className="mb-6">
                <h3 style={{ color: '#fff', fontWeight: 600, fontSize: '1rem', margin: '0 0 0.75rem 0' }}>Specialties</h3>
                <div className="flex flex-wrap gap-2">
                  {companyInfo.specialties.map((specialty, index) => (
                    <span
                      key={index}
                      className="bg-white/10 border border-white/20 px-2 py-1 rounded text-xs text-white"
                    >
                      {specialty}
                    </span>
                  ))}
                </div>
              </div>
              {/* Benefits */}
              <div className="mb-6">
                <h3 style={{ color: '#fff', fontWeight: 600, fontSize: '1rem', margin: '0 0 0.75rem 0' }}>Benefits & Perks</h3>
                <div className="flex flex-wrap gap-2">
                  {companyInfo.benefits.map((benefit, index) => (
                    <span
                      key={index}
                      className="bg-white/10 border border-white/20 px-2 py-1 rounded text-xs text-white"
                    >
                      {benefit}
                    </span>
                  ))}
                </div>
              </div>
              {/* Awards */}
              <div className="mb-6">
                <h3 style={{ color: '#fff', fontWeight: 600, fontSize: '1rem', margin: '0 0 0.75rem 0' }}>Awards & Recognition</h3>
                <div className="flex flex-wrap gap-2">
                  {companyInfo.awards.map((award, index) => (
                    <span
                      key={index}
                      className="bg-white/10 border border-white/20 px-2 py-1 rounded text-xs text-white"
                    >
                      {award}
                    </span>
                  ))}
                </div>
              </div>
              {/* View Profile Button */}
              {onViewProfile && (
                <div className="mt-6 flex justify-center">
                  <button
                    className="pc-back-btn"
                    style={{
                      background: 'rgba(30,32,65,0.32)',
                      color: '#fff',
                      border: 'none',
                      borderRadius: '999px',
                      padding: '0.55em 1.4em',
                      fontWeight: 600,
                      fontSize: '1em',
                      cursor: 'pointer',
                      boxShadow: '0 2px 12px rgba(0,0,0,0.10)',
                      transition: 'background 0.2s',
                      outline: 'none',
                    }}
                    onClick={onViewProfile}
                  >
                    View Full Profile
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

// Remove gradient/transparent text for all headings and paragraphs in this card
const noGradientTextStyle = `
  .no-gradient-text {
    color: #fff !important;
    background: none !important;
    background-image: none !important;
    background-clip: unset !important;
    -webkit-background-clip: unset !important;
    -webkit-text-fill-color: #fff !important;
  }
`;

export default () => <>
  <style>{noGradientTextStyle}</style>
  <CompanyProfileCard />
</>;