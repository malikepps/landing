import AvatarAnimation from './components/AvatarAnimation';

export default function App() {
  return (
    <div style={{ 
      width: '100vw', 
      height: '100vh', 
      margin: 0, 
      padding: 0,
      overflow: 'hidden'
    }}>
      {/* Hero Section with Avatar Animation */}
      <section style={{
        position: 'relative',
        width: '100%',
        height: '100%',
        backgroundColor: '#0f766e', // Teal background
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        overflow: 'hidden'
      }}>
        {/* Hero Title - Centered */}
        <div style={{
          position: 'relative',
          zIndex: 20,
          textAlign: 'center',
          padding: '2rem',
          pointerEvents: 'none'
        }}>
          <h1 style={{
            fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen", "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue", sans-serif',
            fontSize: 'clamp(3rem, 8vw, 6rem)',
            fontWeight: 300,
            lineHeight: '1.1',
            letterSpacing: '-0.03em',
            color: 'white',
            margin: 0,
            marginBottom: '1rem',
            textShadow: '0 2px 20px rgba(0, 0, 0, 0.3)'
          }}>
            Build Your Community
          </h1>
          <p style={{
            fontSize: 'clamp(1rem, 2.5vw, 1.5rem)',
            opacity: 0.9,
            maxWidth: '700px',
            margin: '0 auto',
            lineHeight: '1.6',
            color: 'white',
            textShadow: '0 1px 10px rgba(0, 0, 0, 0.3)'
          }}>
            Create meaningful connections and give back to your supporters
          </p>
        </div>

        {/* Avatar Animation Overlay */}
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          pointerEvents: 'none'
        }}>
          <AvatarAnimation />
        </div>
      </section>
    </div>
  );
}
