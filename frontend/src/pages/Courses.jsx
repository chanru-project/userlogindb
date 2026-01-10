import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar.jsx';
import Footer from '../components/Footer.jsx';

function Courses() {
  const [expandedId, setExpandedId] = useState(null);
  const [completedVideos, setCompletedVideos] = useState({});
  const [videoDuration, setVideoDuration] = useState({});
  const videoRefs = useRef({});
  const videoPlayersRef = useRef({});
  const navigate = useNavigate();

  // Initialize YouTube IFrame API
  useEffect(() => {
    // Load YouTube API
    if (!window.YT) {
      const tag = document.createElement('script');
      tag.src = 'https://www.youtube.com/iframe_api';
      const firstScriptTag = document.getElementsByTagName('script')[0];
      firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
    }

    // Store reference to window.onYouTubeIframeAPIReady
    window.onYouTubeIframeAPIReady = initializeYouTubePlayers;

    return () => {
      delete window.onYouTubeIframeAPIReady;
    };
  }, []);

  const initializeYouTubePlayers = () => {
    courses.forEach(course => {
      if (videoRefs.current[course.id]) {
        try {
          const player = new window.YT.Player(videoRefs.current[course.id], {
            events: {
              onReady: (event) => handleVideoReady(event, course.id),
              onStateChange: (event) => handleVideoStateChange(event, course.id)
            }
          });
          videoPlayersRef.current[course.id] = player;
        } catch (e) {
          console.log('YouTube API not ready yet');
        }
      }
    });
  };

  const handleVideoReady = (event, courseId) => {
    const duration = event.target.getDuration();
    setVideoDuration(prev => ({
      ...prev,
      [courseId]: duration
    }));
  };

  const handleVideoStateChange = (event, courseId) => {
    // Video is playing
    if (event.data === window.YT.PlayerState.PLAYING) {
      const checkProgress = setInterval(() => {
        const player = videoPlayersRef.current[courseId];
        if (!player) {
          clearInterval(checkProgress);
          return;
        }

        const currentTime = player.getCurrentTime();
        const duration = player.getDuration();
        const progress = currentTime / duration;

        // Mark as completed when 95% or more is watched
        if (progress >= 0.95 && !completedVideos[courseId]) {
          setCompletedVideos(prev => ({
            ...prev,
            [courseId]: true
          }));
          clearInterval(checkProgress);
        }

        // Stop checking after 5 minutes of play to save resources
        if (currentTime > 300) {
          clearInterval(checkProgress);
        }
      }, 2000); // Check every 2 seconds

      // Clear interval when video stops
      const intervalId = setTimeout(() => clearInterval(checkProgress), 3600000); // 1 hour max
    }
  };

  const courses = [
    {
      id: 1,
      title: 'Computer Science',
      duration: '4 Years',
      level: 'Undergraduate',
      icon: '💻',
      topics: ['Data Structures', 'Algorithms', 'Web Dev', 'AI/ML', 'Databases'],
      outcomes: ['Build full-stack apps', 'Develop AI models', 'Manage large-scale systems'],
      projects: ['E-commerce platform', 'Chat app', 'ML recommendation engine'],
      videoUrl: 'https://www.youtube.com/embed/K5KVEU3aaeQ',
      videoDuration: 3600 // 1 hour in seconds
    },
    {
      id: 2,
      title: 'Business Administration',
      duration: '4 Years',
      level: 'Undergraduate',
      icon: '📊',
      topics: ['Management', 'Finance', 'Marketing', 'Entrepreneurship', 'Analytics'],
      outcomes: ['Lead teams', 'Strategic planning', 'Financial analysis'],
      projects: ['Business plan', 'Marketing strategy', 'Startup pitch'],
      videoUrl: 'https://www.youtube.com/embed/fpK25UY_0iA',
      videoDuration: 3600
    },
    {
      id: 3,
      title: ' AI Engineering',
      duration: '4 Years',
      level: 'Undergraduate',
      icon: '⚙️',
      topics: ['Mechanics', 'Circuits', 'CAD Design', 'Thermodynamics', 'Materials'],
      outcomes: ['Design structures', 'Solve complex problems', 'Prototype solutions'],
      projects: ['Bridge design', 'Circuit board', 'Mechanical device'],
      videoUrl: 'https://www.youtube.com/embed/9tbaiFIm0HU',
      videoDuration: 3600
    },
    {
      id: 4,
      title: 'Data Science',
      duration: '2 Years',
      level: 'Postgraduate',
      icon: '📈',
      topics: ['Machine Learning', 'Statistics', 'Big Data', 'Python/R', 'Visualization'],
      outcomes: ['Extract insights', 'Predict trends', 'Optimize decisions'],
      projects: ['Predictive model', 'Data dashboard', 'Classification system'],
      videoUrl: 'https://www.youtube.com/embed/ua-CiDNNj30',
      videoDuration: 3600
    },
    {
      id: 5,
      title: 'Digital Marketing',
      duration: '6 Months',
      level: 'Certificate',
      icon: '📱',
      topics: ['SEO', 'Social Media', 'Content Strategy', 'Analytics', 'Paid Ads'],
      outcomes: ['Boost brand presence', 'Drive conversions', 'Analyze campaigns'],
      projects: ['Social campaign', 'Marketing plan', 'Analytics report'],
      videoUrl: 'https://www.youtube.com/embed/kunkYTKFNtI',
      videoDuration: 3600
    },
    {
      id: 6,
      title: 'Web Development',
      duration: '6 Months',
      level: 'Certificate',
      icon: '🌐',
      topics: ['HTML/CSS', 'JavaScript', 'React', 'Node.js', 'Databases'],
      outcomes: ['Build responsive sites', 'Create interactive apps', 'Deploy live'],
      projects: ['Portfolio site', 'Todo app', 'Full-stack project'],
      videoUrl: 'https://www.youtube.com/embed/7dSJubxFWv0',
      videoDuration: 3600
    }
  ];

  const toggleExpand = (id) => {
    setExpandedId(expandedId === id ? null : id);
  };

  const handleCertificate = (course) => {
    navigate('/certificate', { state: { course, videoCompleted: completedVideos[course.id] } });
  };

  return (
    <div className="page-container">
      <Navbar />
      <main className="main-content">
        <section className="page-header" style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <h1 style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>🎓 Our Courses</h1>
          <p style={{ fontSize: '1.1rem', color: '#666' }}>Pick your path—tap any course to explore</p>
        </section>

        <section className="content-section">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '1rem', maxWidth: '1200px', margin: '0 auto' }}>
            {courses.map((course) => (
              <div
                key={course.id}
                onClick={() => toggleExpand(course.id)}
                style={{
                  padding: '1.5rem',
                  border: expandedId === course.id ? '2px solid #007bff' : '1px solid #e0e0e0',
                  borderRadius: '12px',
                  backgroundColor: expandedId === course.id ? '#f0f8ff' : '#fff',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  boxShadow: expandedId === course.id ? '0 4px 12px rgba(0,123,255,0.2)' : '0 2px 4px rgba(0,0,0,0.1)',
                }}
              >
                {/* Header */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '0.75rem' }}>
                  <div style={{ cursor: 'pointer' }} onClick={(e) => { e.stopPropagation(); toggleExpand(course.id); }}>
                    <span style={{ fontSize: '2rem', cursor: 'pointer', transition: 'transform 0.2s' }} onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.1)'} onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}>
                      {course.icon}
                    </span>
                    <h3 style={{ margin: '0.5rem 0 0 0', fontSize: '1.3rem' }}>{course.title}</h3>
                  </div>
                  <span style={{
                    fontSize: '0.8rem',
                    backgroundColor: course.level === 'Undergraduate' ? '#28a745' : course.level === 'Postgraduate' ? '#007bff' : '#6f42c1',
                    color: '#fff',
                    padding: '0.4rem 0.8rem',
                    borderRadius: '20px',
                    whiteSpace: 'nowrap'
                  }}>
                    {course.level}
                  </span>
                </div>

                {/* Duration */}
                <div style={{ fontSize: '0.9rem', color: '#ff6b6b', fontWeight: 'bold', marginBottom: '1rem' }}>
                  ⏱️ {course.duration}
                </div>

                {/* Topics (always visible) */}
                <div style={{ marginBottom: expandedId === course.id ? '1rem' : '0' }}>
                  <p style={{ margin: '0.5rem 0', fontSize: '0.85rem', fontWeight: '600', color: '#333' }}>📚 Topics:</p>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                    {course.topics.slice(0, expandedId === course.id ? course.topics.length : 3).map((topic, i) => (
                      <span key={i} style={{
                        fontSize: '0.8rem',
                        backgroundColor: '#e8f4f8',
                        padding: '0.3rem 0.6rem',
                        borderRadius: '4px',
                        color: '#0066cc'
                      }}>
                        {topic}
                      </span>
                    ))}
                    {!expandedId || expandedId !== course.id ? (
                      course.topics.length > 3 && <span style={{ fontSize: '0.8rem', color: '#999' }}>+{course.topics.length - 3} more</span>
                    ) : null}
                  </div>
                </div>

                {/* Expanded Content */}
                {expandedId === course.id && (
                  <div style={{ marginTop: '1rem', paddingTop: '1rem', borderTop: '1px solid #e0e0e0' }}>
                    {/* Course Video Section */}
                    <div style={{ marginBottom: '1.5rem', padding: '1rem', backgroundColor: '#f8f9fa', borderRadius: '8px' }}>
                      <h4 style={{ margin: '0 0 0.75rem 0', fontSize: '1rem', color: '#007bff', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        🎥 Course Video Lesson (1 Hour)
                      </h4>
                      <div style={{ position: 'relative', paddingBottom: '56.25%', height: '0', overflow: 'hidden', borderRadius: '8px', marginBottom: '0.75rem', backgroundColor: '#000' }}>
                        <iframe
                          id={`video-player-${course.id}`}
                          ref={(el) => { videoRefs.current[course.id] = el; }}
                          style={{
                            position: 'absolute',
                            top: '0',
                            left: '0',
                            width: '100%',
                            height: '100%',
                            border: 'none',
                            borderRadius: '8px'
                          }}
                          src={course.videoUrl + '?enablejsapi=1&modestbranding=1&rel=0'}
                          title={`${course.title} Course Video`}
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                          allowFullScreen
                        />
                      </div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.9rem' }}>
                        <span style={{ color: '#666' }}>📺 Watch the full video to unlock certificate</span>
                        {completedVideos[course.id] && (
                          <span style={{ color: '#28a745', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                            ✅ Video Completed
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Outcomes */}
                    <div style={{ marginBottom: '1rem' }}>
                      <p style={{ margin: '0 0 0.5rem 0', fontSize: '0.85rem', fontWeight: '600', color: '#28a745' }}>✅ You'll Learn To:</p>
                      <ul style={{ margin: '0', paddingLeft: '1.2rem', fontSize: '0.9rem' }}>
                        {course.outcomes.map((outcome, i) => (
                          <li key={i} style={{ marginBottom: '0.3rem' }}>{outcome}</li>
                        ))}
                      </ul>
                    </div>

                    {/* Projects */}
                    <div>
                      <p style={{ margin: '0 0 0.5rem 0', fontSize: '0.85rem', fontWeight: '600', color: '#ff6b6b' }}>🚀 Real Projects:</p>
                      <ul style={{ margin: '0', paddingLeft: '1.2rem', fontSize: '0.9rem' }}>
                        {course.projects.map((project, i) => (
                          <li key={i} style={{ marginBottom: '0.3rem' }}>{project}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                )}

                {/* CTA Button */}
                <button
                  style={{
                    marginTop: '1rem',
                    width: '100%',
                    padding: '0.75rem',
                    backgroundColor: expandedId === course.id ? '#007bff' : '#f0f0f0',
                    color: expandedId === course.id ? '#fff' : '#333',
                    border: 'none',
                    borderRadius: '6px',
                    fontSize: '0.95rem',
                    fontWeight: '600',
                    cursor: 'pointer',
                    transition: 'all 0.2s'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = expandedId === course.id ? '#0056b3' : '#e0e0e0';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = expandedId === course.id ? '#007bff' : '#f0f0f0';
                  }}
                >
                  {expandedId === course.id ? '👆 Collapse' : '👉 Tap to Explore'}
                </button>

                {/* Get Certificate Button */}
                <button
                  onClick={(e) => { e.stopPropagation(); handleCertificate(course); }}
                  disabled={!completedVideos[course.id]}
                  style={{
                    marginTop: '0.5rem',
                    width: '100%',
                    padding: '0.75rem',
                    backgroundColor: completedVideos[course.id] ? '#28a745' : '#cccccc',
                    color: '#fff',
                    border: 'none',
                    borderRadius: '6px',
                    fontSize: '0.95rem',
                    fontWeight: '600',
                    cursor: completedVideos[course.id] ? 'pointer' : 'not-allowed',
                    opacity: completedVideos[course.id] ? 1 : 0.7,
                    transition: 'all 0.2s'
                  }}
                  onMouseEnter={(e) => {
                    if (completedVideos[course.id]) {
                      e.currentTarget.style.backgroundColor = '#218838';
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (completedVideos[course.id]) {
                      e.currentTarget.style.backgroundColor = '#28a745';
                    }
                  }}
                >
                  {completedVideos[course.id] ? '🎓 Get Certificate' : '🔒 Watch Video to Unlock'}
                </button>
              </div>
            ))}
          </div>
        </section>

        {/* CTA Section */}
        <section style={{ marginTop: '3rem', textAlign: 'center', padding: '2rem', backgroundColor: '#f8f9fa', borderRadius: '12px', maxWidth: '900px', margin: '3rem auto' }}>
          <h2 style={{ marginBottom: '0.5rem' }}>🤔 Still Undecided?</h2>
          <p style={{ color: '#666', marginBottom: '1.5rem' }}>Get personalized guidance from our advisors</p>
          <a href="/consultation" style={{
            display: 'inline-block',
            padding: '0.75rem 2rem',
            backgroundColor: '#007bff',
            color: '#fff',
            textDecoration: 'none',
            borderRadius: '6px',
            fontWeight: '600',
            transition: 'background 0.2s'
          }} onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#0056b3'} onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#007bff'}>
            📞 Book Free Consultation
          </a>
        </section>
      </main>
      <Footer />
    </div>
  );
}

export default Courses;
