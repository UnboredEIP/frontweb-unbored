import React, { useEffect, useState } from 'react';
import { useLocation, useParams, Link, useNavigate } from 'react-router-dom';

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
    maxHeight: '100px',
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
    whiteSpace: 'nowrap' as 'nowrap',
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
  const navigate = useNavigate(); // Initialize the hook here

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await fetch(
          'https://opendata.paris.fr/api/explore/v2.1/catalog/datasets/que-faire-a-paris-/records?limit=10'
        );

        if (!response.ok) {
          throw new Error(`Error: ${response.status} ${response.statusText}`);
        }

        const result = await response.json();
        //console.log('API Response:', result); // Log the API response

        // Extract the `results` array from the API response
        if (result && Array.isArray(result.results)) {
          setData(result.results); // Set data to the `results` array
        } else {
          console.error('Expected results to be an array but got:', result);
          setData([]); // Set to an empty array if the structure is not as expected
        }
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

  const allTags = Array.from(new Set(data.flatMap((event) => event.tags || [])));

  const filteredData = selectedTag ? data.filter((event) => event.tags?.includes(selectedTag)) : data;

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;
  if (filteredData.length === 0) return <p>No events available</p>;

  const currentEvent = filteredData[currentIndex];

  const createEvent = async (currentIndex: number) => {
    const currentEvent = filteredData[currentIndex];

    const formattedStartDate = new Date(currentEvent.date_start); // Convert to Date object
    let formattedEndDate = new Date(currentEvent.date_end); // Convert to Date object

    // Calculate the difference in milliseconds
    const duration = formattedEndDate.getTime() - formattedStartDate.getTime();

    // Check if the duration exceeds 24 hours (in milliseconds)
    const maxDuration = 24 * 60 * 60 * 1000; // 24 hours in milliseconds

    // If duration is more than 24 hours, adjust the end date to be 24 hours from the start
    if (duration > maxDuration) {
      formattedEndDate = new Date(formattedStartDate.getTime() + maxDuration);
    }

    // Function to format date to YYYY-MM-DDTHH:mm:ss+00:00
    function formatToISO(date: Date) {
      // Get the components
      const year = date.getUTCFullYear();
      const month = String(date.getUTCMonth() + 1).padStart(2, '0'); // Months are zero-indexed
      const day = String(date.getUTCDate()).padStart(2, '0');
      const hours = String(date.getUTCHours()).padStart(2, '0');
      const minutes = String(date.getUTCMinutes()).padStart(2, '0');
      const seconds = String(date.getUTCSeconds()).padStart(2, '0');
      const offset = '+00:00'; // UTC offset

      // Return the formatted string
      return `${year}-${month}-${day}T${hours}:${minutes}:${seconds}${offset}`;
    }

    // Convert both dates to the desired format
    const formattedStartDateString = formatToISO(formattedStartDate);
    const formattedEndDateString = formatToISO(formattedEndDate);

    const activityName = currentEvent.title;
    const address = `${currentEvent.address_street || ''} ${currentEvent.address_city || ''}`.trim();
    const firstSentence = currentEvent.description.split('.')[0];

    // Navigate to the private activity creation page with the event details
    //navigate('/create-private-activity', { state: { event: currentEvent } });
  };

  const handleNext = () => {
    setAnimationClass('');
    setCurrentIndex((prevIndex) => (prevIndex + 1) % filteredData.length);
  };

  const handleLike = () => {
    setAnimationClass('like');
    createEvent(currentIndex);
    setTimeout(handleNext, 500);
  };

  const handleDislike = () => {
    //console.log(`Disliked event: ${currentEvent.title}`);
    setAnimationClass('dislike');
    setTimeout(handleNext, 500);
  };

  const handleTagClick = (tag: string | null) => {
    setSelectedTag(tag === selectedTag ? null : tag);
    setCurrentIndex(0);
  };

  return (
    <div style={styles.container}>
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

      <div
        style={{
          ...styles.content,
          backgroundColor: animationClass === 'like' ? '#DFF2BF' : animationClass === 'dislike' ? '#FFBABA' : '#fff',
          transform: animationClass ? 'scale(0.9)' : 'scale(1)',
        }}
      >
        <div style={styles.event}>
          <h3>{currentEvent.title}</h3>
        </div>

        <img
          style={styles.image}
          src={currentEvent.cover_url}
          alt={currentEvent.title}
          onClick={handleLike}
        />
      </div>

      <div style={styles.navigation}>
        <button
          style={{ ...styles.button, backgroundColor: '#ff6b6b' }}
          onClick={handleDislike}
        >
          Dislike
        </button>
        <button
          style={{ ...styles.button, backgroundColor: '#4CAF50' }}
          onClick={handleLike}
        >
          Like
        </button>
      </div>
    </div>
  );
};

export default EventSwipe;
