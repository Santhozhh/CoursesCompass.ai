import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaGraduationCap, FaCode, FaChartLine, FaRobot, FaMobile, FaNetworkWired, FaGamepad, FaDatabase, FaShieldAlt, FaCloud } from 'react-icons/fa';
import CompassIcon from './CompassIcon';
import './Dashboard.css';

const DOMAINS = [
  {
    id: 'web-dev',
    name: 'Web Development',
    icon: FaCode,
    description: 'Build modern websites and web applications',
    courses: ['HTML/CSS', 'JavaScript', 'React', 'Node.js', 'Full Stack Development'],
    color: '#3B82F6'
  },
  {
    id: 'data-science',
    name: 'Data Science',
    icon: FaChartLine,
    description: 'Analyze data and extract meaningful insights',
    courses: ['Python', 'Statistics', 'Machine Learning', 'Data Visualization', 'SQL'],
    color: '#10B981'
  },
  {
    id: 'ai-ml',
    name: 'AI & Machine Learning',
    icon: FaRobot,
    description: 'Master artificial intelligence and machine learning',
    courses: ['Deep Learning', 'Neural Networks', 'TensorFlow', 'PyTorch', 'NLP'],
    color: '#8B5CF6'
  },
  {
    id: 'mobile-dev',
    name: 'Mobile Development',
    icon: FaMobile,
    description: 'Create iOS and Android applications',
    courses: ['React Native', 'Flutter', 'Swift', 'Kotlin', 'Mobile UI/UX'],
    color: '#F59E0B'
  },
  {
    id: 'cybersecurity',
    name: 'Cybersecurity',
    icon: FaShieldAlt,
    description: 'Protect systems and data from threats',
    courses: ['Ethical Hacking', 'Network Security', 'Cryptography', 'Penetration Testing'],
    color: '#EF4444'
  },
  {
    id: 'cloud-computing',
    name: 'Cloud Computing',
    icon: FaCloud,
    description: 'Deploy and manage cloud infrastructure',
    courses: ['AWS', 'Azure', 'Docker', 'Kubernetes', 'DevOps'],
    color: '#06B6D4'
  },
  {
    id: 'game-dev',
    name: 'Game Development',
    icon: FaGamepad,
    description: 'Design and develop interactive games',
    courses: ['Unity', 'Unreal Engine', 'C#', 'Game Design', '3D Modeling'],
    color: '#EC4899'
  },
  {
    id: 'networking',
    name: 'Networking',
    icon: FaNetworkWired,
    description: 'Build and maintain network infrastructure',
    courses: ['CCNA', 'Network Protocols', 'System Administration', 'Linux'],
    color: '#6366F1'
  },
  {
    id: 'database',
    name: 'Database Management',
    icon: FaDatabase,
    description: 'Design and optimize database systems',
    courses: ['SQL', 'NoSQL', 'MongoDB', 'PostgreSQL', 'Database Design'],
    color: '#14B8A6'
  }
];

function Dashboard() {
  const [view, setView] = useState('quick'); // 'quick' or 'academic'
  const [userEmail, setUserEmail] = useState('');
  const [academicData, setAcademicData] = useState({
    education: '',
    field: '',
    year: '',
    interests: [],
    skills: '',
    careerGoal: ''
  });
  const [recommendations, setRecommendations] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Get user email from localStorage
    const email = localStorage.getItem('userEmail');
    if (email) {
      setUserEmail(email);
      // Load existing academic data if available
      fetchAcademicData(email);
    } else {
      // If no email, redirect to login
      navigate('/login');
    }
  }, [navigate]);

  const fetchAcademicData = async (email) => {
    try {
      const response = await fetch(`http://localhost:5000/academic/${email}`);
      if (response.ok) {
        const data = await response.json();
        setAcademicData({
          education: data.education || '',
          field: data.field || '',
          year: data.year || '',
          interests: data.interests || [],
          skills: data.skills || '',
          careerGoal: data.careerGoal || ''
        });
      }
    } catch (err) {
      console.error('Error fetching academic data:', err);
    }
  };

  const handleAcademicChange = (e) => {
    const { name, value } = e.target;
    setAcademicData({
      ...academicData,
      [name]: value
    });
  };

  const handleInterestToggle = (interest) => {
    setAcademicData({
      ...academicData,
      interests: academicData.interests.includes(interest)
        ? academicData.interests.filter(i => i !== interest)
        : [...academicData.interests, interest]
    });
  };

  const getRecommendations = () => {
    const { education, field, interests, skills, careerGoal } = academicData;
    let scoredDomains = DOMAINS.map(domain => {
      let score = 0;

      // Score based on interests
      if (interests.some(interest => 
        domain.name.toLowerCase().includes(interest.toLowerCase()) ||
        domain.description.toLowerCase().includes(interest.toLowerCase())
      )) {
        score += 30;
      }

      // Score based on field of study
      if (field) {
        const fieldLower = field.toLowerCase();
        if (fieldLower.includes('computer') || fieldLower.includes('software') || fieldLower.includes('it')) {
          if (domain.id === 'web-dev' || domain.id === 'ai-ml' || domain.id === 'mobile-dev') score += 25;
        }
        if (fieldLower.includes('math') || fieldLower.includes('statistics')) {
          if (domain.id === 'data-science' || domain.id === 'ai-ml') score += 25;
        }
        if (fieldLower.includes('business') || fieldLower.includes('management')) {
          if (domain.id === 'data-science' || domain.id === 'cloud-computing') score += 20;
        }
      }

      // Score based on skills mentioned
      if (skills) {
        const skillsLower = skills.toLowerCase();
        domain.courses.forEach(course => {
          if (skillsLower.includes(course.toLowerCase())) {
            score += 10;
          }
        });
      }

      // Score based on career goal
      if (careerGoal) {
        const goalLower = careerGoal.toLowerCase();
        if (goalLower.includes('web') || goalLower.includes('website')) {
          if (domain.id === 'web-dev') score += 20;
        }
        if (goalLower.includes('data') || goalLower.includes('analyst')) {
          if (domain.id === 'data-science') score += 20;
        }
        if (goalLower.includes('ai') || goalLower.includes('machine learning')) {
          if (domain.id === 'ai-ml') score += 20;
        }
        if (goalLower.includes('mobile') || goalLower.includes('app')) {
          if (domain.id === 'mobile-dev') score += 20;
        }
      }

      // Base score for all domains
      score += 10;

      return { ...domain, score };
    });

    // Sort by score and return top 4
    scoredDomains.sort((a, b) => b.score - a.score);
    return scoredDomains.slice(0, 4);
  };

  const handleAcademicSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Save academic data to backend with email
      const response = await fetch('http://localhost:5000/academic', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...academicData,
          email: userEmail
        })
      });

      if (response.ok) {
        const recs = getRecommendations();
        setRecommendations(recs);
        setView('recommendations');
      }
    } catch (err) {
      console.error('Error saving academic data:', err);
      // Still show recommendations even if save fails
      const recs = getRecommendations();
      setRecommendations(recs);
      setView('recommendations');
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('userEmail');
    navigate('/login');
  };

  return (
    <div className="dashboard-container">
      <header className="dashboard-header">
        <div className="header-content">
          <div className="logo-container">
            <CompassIcon />
            <span className="logo-text">CoursesCompass.ai</span>
          </div>
          <button onClick={handleLogout} className="logout-btn">Logout</button>
        </div>
      </header>

      <div className="dashboard-content">
        {view === 'quick' && (
          <div className="quick-view">
            <h1 className="dashboard-title">Explore Top Learning Domains</h1>
            <p className="dashboard-subtitle">Choose a domain to start your learning journey</p>
            
            <div className="domains-grid">
              {DOMAINS.map(domain => {
                const Icon = domain.icon;
                return (
                  <div key={domain.id} className="domain-card" style={{ borderTopColor: domain.color }}>
                    <div className="domain-icon" style={{ color: domain.color }}>
                      <Icon />
                    </div>
                    <h3 className="domain-name">{domain.name}</h3>
                    <p className="domain-description">{domain.description}</p>
                    <div className="domain-courses">
                      <strong>Key Skills:</strong>
                      <div className="course-tags">
                        {domain.courses.slice(0, 3).map((course, idx) => (
                          <span key={idx} className="course-tag">{course}</span>
                        ))}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="view-toggle">
              <p>Want personalized recommendations?</p>
              <button onClick={() => setView('academic')} className="toggle-btn">
                <FaGraduationCap /> Get Academic-Based Suggestions
              </button>
            </div>
          </div>
        )}

        {view === 'academic' && (
          <div className="academic-view">
            <h1 className="dashboard-title">Academic-Based Recommendations</h1>
            <p className="dashboard-subtitle">Tell us about your background for personalized suggestions</p>

            <form onSubmit={handleAcademicSubmit} className="academic-form">
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="education">Education Level</label>
                  <select
                    id="education"
                    name="education"
                    value={academicData.education}
                    onChange={handleAcademicChange}
                    required
                  >
                    <option value="">Select education level</option>
                    <option value="high-school">High School</option>
                    <option value="undergraduate">Undergraduate</option>
                    <option value="graduate">Graduate</option>
                    <option value="post-graduate">Post Graduate</option>
                    <option value="professional">Professional</option>
                  </select>
                </div>

                <div className="form-group">
                  <label htmlFor="field">Field of Study</label>
                  <input
                    type="text"
                    id="field"
                    name="field"
                    placeholder="e.g., Computer Science, Mathematics, Business"
                    value={academicData.field}
                    onChange={handleAcademicChange}
                    required
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="year">Current Year / Experience</label>
                  <input
                    type="text"
                    id="year"
                    name="year"
                    placeholder="e.g., 2nd Year, 3 years experience"
                    value={academicData.year}
                    onChange={handleAcademicChange}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="careerGoal">Career Goal</label>
                  <input
                    type="text"
                    id="careerGoal"
                    name="careerGoal"
                    placeholder="e.g., Become a Full Stack Developer"
                    value={academicData.careerGoal}
                    onChange={handleAcademicChange}
                  />
                </div>
              </div>

              <div className="form-group">
                <label>Interests (Select all that apply)</label>
                <div className="interests-grid">
                  {['Web Development', 'Data Science', 'AI/ML', 'Mobile Apps', 'Cybersecurity', 'Cloud Computing', 'Game Development', 'Networking'].map(interest => (
                    <button
                      key={interest}
                      type="button"
                      className={`interest-btn ${academicData.interests.includes(interest) ? 'active' : ''}`}
                      onClick={() => handleInterestToggle(interest)}
                    >
                      {interest}
                    </button>
                  ))}
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="skills">Current Skills (comma separated)</label>
                <input
                  type="text"
                  id="skills"
                  name="skills"
                  placeholder="e.g., Python, JavaScript, HTML, CSS"
                  value={academicData.skills}
                  onChange={handleAcademicChange}
                />
              </div>

              <div className="form-actions">
                <button type="button" onClick={() => setView('quick')} className="secondary-btn">
                  Back to Quick View
                </button>
                <button type="submit" className="primary-btn" disabled={loading}>
                  {loading ? 'Analyzing...' : 'Get Recommendations'}
                </button>
              </div>
            </form>
          </div>
        )}

        {view === 'recommendations' && (
          <div className="recommendations-view">
            <h1 className="dashboard-title">Your Personalized Recommendations</h1>
            <p className="dashboard-subtitle">Based on your academic background and interests</p>

            <div className="recommendations-grid">
              {recommendations.map((domain, index) => {
                const Icon = domain.icon;
                return (
                  <div key={domain.id} className="recommendation-card" style={{ borderTopColor: domain.color }}>
                    <div className="recommendation-badge">#{index + 1} Match</div>
                    <div className="domain-icon" style={{ color: domain.color }}>
                      <Icon />
                    </div>
                    <h3 className="domain-name">{domain.name}</h3>
                    <p className="domain-description">{domain.description}</p>
                    <div className="domain-courses">
                      <strong>Recommended Courses:</strong>
                      <ul className="course-list">
                        {domain.courses.map((course, idx) => (
                          <li key={idx}>{course}</li>
                        ))}
                      </ul>
                    </div>
                    <button className="explore-btn" style={{ backgroundColor: domain.color }}>
                      Explore {domain.name}
                    </button>
                  </div>
                );
              })}
            </div>

            <div className="recommendations-actions">
              <button onClick={() => setView('academic')} className="secondary-btn">
                Update My Profile
              </button>
              <button onClick={() => setView('quick')} className="primary-btn">
                Browse All Domains
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Dashboard;
