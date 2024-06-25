import React, { useEffect, useState } from 'react';

// CSS-in-JS styles
const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column' as 'column',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    backgroundColor: '#f0f0f0',
    textAlign: 'center' as 'center',
    padding: '10px',
  },
  content: {
    backgroundColor: '#fff',
    padding: '20px',
    borderRadius: '8px',
    boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
    maxWidth: '600px',
    width: '100%',
    transition: 'transform 0.5s, background-color 0.5s',
    marginBottom: '20px',
  },
  event: {
    marginBottom: '20px',
  },
  image: {
    maxWidth: '100%',
    height: 'auto',
    borderRadius: '8px',
    cursor: 'pointer',
  },
  navigation: {
    display: 'flex',
    justifyContent: 'space-between',
    marginTop: '20px',
  },
  button: {
    padding: '10px 20px',
    borderRadius: '5px',
    border: 'none',
    color: '#fff',
    cursor: 'pointer',
  },
  tagsContainer: {
    display: 'flex',
    flexWrap: 'wrap' as 'wrap',
    gap: '10px',
    marginBottom: '20px',
    maxWidth: '600px',
    overflowY: 'auto' as 'auto',
    maxHeight: '100px', // Limits the height to avoid excessive scrolling
    border: '1px solid #ccc',
    borderRadius: '8px',
    padding: '10px',
    backgroundColor: '#fff',
    boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
  },
  tagButton: {
    padding: '5px 10px',
    borderRadius: '5px',
    border: '1px solid #ccc',
    backgroundColor: '#e0e0e0',
    cursor: 'pointer',
    transition: 'background-color 0.3s',
    whiteSpace: 'nowrap' as 'nowrap', // Prevents text wrapping within the button
  },
  allTagsButton: {
    padding: '5px 10px',
    borderRadius: '5px',
    border: '1px solid #ccc',
    backgroundColor: '#ccc',
    cursor: 'pointer',
    transition: 'background-color 0.3s',
  },
};

const EventSwipe: React.FC = () => {
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [animationClass, setAnimationClass] = useState<string>('');
  const [selectedTag, setSelectedTag] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);

      try {
        const token = localStorage.getItem('token');
        const response = await fetch('https://x2025unbored786979363000.francecentral.cloudapp.azure.com/events/paris', {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) {
          throw new Error(`Error: ${response.status} ${response.statusText}`);
        }

        const result = await response.json();
        console.log('Fetched data:', result);
        setData(result.events.results || []);
      } catch (error: any) {
        console.error('Error fetching data:', error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'ArrowRight') {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % filteredData.length);
      } else if (event.key === 'ArrowLeft') {
        setCurrentIndex((prevIndex) => (prevIndex - 1 + filteredData.length) % filteredData.length);
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [data.length]);

  // Collect unique tags from all activities
  const allTags = Array.from(new Set(data.flatMap(event => event.tags || [])));

  // Filter data based on the selected tag
  const filteredData = selectedTag ? data.filter(event => event.tags?.includes(selectedTag)) : data;

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;
  if (filteredData.length === 0) return <p>No events available</p>;

  const currentEvent = filteredData[currentIndex];

  const addToCalendar = async (eventId: string) => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('https://x2025unbored786979363000.francecentral.cloudapp.azure.com/event/add', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({events : [eventId]}), // assuming the endpoint expects an array of events
      });
      
      if (response.ok) {
        console.log('Event added to the calendar successfully!');
        // Optionally, you can provide feedback to the user
      } else {
        console.error('Failed to add the event to the calendar. Status:', response.status);
      }
    } catch (error) {
      console.error('Error while adding the event to the calendar', error);
    }
  };

  const handleNext = () => {
    setAnimationClass('');
    setCurrentIndex((prevIndex) => (prevIndex + 1) % filteredData.length);
  };

  const handleLike = () => {
    console.log(`Liked event: ${currentEvent.title}`);
    setAnimationClass('like');
    //addToCalendar(currentEvent.id); // Call addToCalendar with event ID
    setTimeout(handleNext, 500);
  };

  const handleDislike = () => {
    console.log(`Disliked event: ${currentEvent.title}`);
    setAnimationClass('dislike');
    setTimeout(handleNext, 500);
  };

  const handleTagClick = (tag: string | null) => {
    setSelectedTag(tag === selectedTag ? null : tag); // Toggle the selected tag
    setCurrentIndex(0); // Reset the current index when changing the filter
  };

  return (
    <div style={styles.container}>
      {/* Display all tags */}
      <div style={styles.tagsContainer}>
        <button
          style={{
            ...styles.allTagsButton,
            backgroundColor: selectedTag === null ? '#a3a3ff' : '#ccc',
          }}
          onClick={() => handleTagClick(null)}
        >
          *
        </button>
        {allTags.map((tag) => (
          <button
            key={tag}
            style={{
              ...styles.tagButton,
              backgroundColor: selectedTag === tag ? '#a3a3ff' : '#e0e0e0',
            }}
            onClick={() => handleTagClick(tag)}
          >
            {tag}
          </button>
        ))}
      </div>

      {/* Display the current event */}
      <div
        style={{
          ...styles.content,
          backgroundColor: animationClass === 'like' ? '#DFF2BF' : animationClass === 'dislike' ? '#FFBABA' : '#fff',
          transform: animationClass ? 'scale(1.1)' : 'scale(1)',
        }}
        className={animationClass}
      >
        <div style={styles.event}>
          <h2>{currentEvent.title}</h2>
          {currentEvent.cover_url && (
            <a href={currentEvent.url} target="_blank" rel="noopener noreferrer">
              <img src={currentEvent.cover_url} alt={currentEvent.title} style={styles.image} />
            </a>
          )}
        </div>
        <div style={styles.navigation}>
          <button onClick={handleDislike} style={{ ...styles.button, backgroundColor: '#E14D35' }}>Dislike</button>
          <button onClick={handleLike} style={{ ...styles.button, backgroundColor: '#28A745' }}>Like</button>
        </div>
      </div>
    </div>
  );
};

export default EventSwipe;
