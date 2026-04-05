import { ImageResponse } from 'next/og'

export const runtime = 'edge'
export const alt = 'WallOfLove — Collect & Display Testimonials That Convert'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '1200px',
          height: '630px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          background: '#0a0a0f',
          position: 'relative',
          overflow: 'hidden',
          fontFamily: 'system-ui, -apple-system, sans-serif',
        }}
      >
        {/* Background gradient blobs */}
        <div
          style={{
            position: 'absolute',
            top: '-100px',
            left: '-100px',
            width: '500px',
            height: '500px',
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(99,102,241,0.35) 0%, transparent 70%)',
          }}
        />
        <div
          style={{
            position: 'absolute',
            bottom: '-120px',
            right: '-80px',
            width: '550px',
            height: '550px',
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(168,85,247,0.3) 0%, transparent 70%)',
          }}
        />

        {/* Star icons row */}
        <div
          style={{
            display: 'flex',
            gap: '8px',
            marginBottom: '32px',
          }}
        >
          {[0, 1, 2, 3, 4].map((i) => (
            <div
              key={i}
              style={{
                width: '32px',
                height: '32px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#f59e0b',
                fontSize: '28px',
              }}
            >
              ★
            </div>
          ))}
        </div>

        {/* Product name */}
        <div
          style={{
            fontSize: '80px',
            fontWeight: '800',
            letterSpacing: '-2px',
            background: 'linear-gradient(135deg, #818cf8 0%, #c084fc 100%)',
            backgroundClip: 'text',
            color: 'transparent',
            marginBottom: '20px',
            lineHeight: '1',
          }}
        >
          WallOfLove
        </div>

        {/* Tagline */}
        <div
          style={{
            fontSize: '28px',
            fontWeight: '400',
            color: 'rgba(255,255,255,0.7)',
            letterSpacing: '-0.3px',
            marginBottom: '40px',
          }}
        >
          Collect &amp; Display Testimonials That Convert
        </div>

        {/* Divider line */}
        <div
          style={{
            width: '80px',
            height: '3px',
            borderRadius: '2px',
            background: 'linear-gradient(90deg, #818cf8, #c084fc)',
            marginBottom: '40px',
          }}
        />

        {/* Brand pill */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            padding: '8px 20px',
            borderRadius: '100px',
            border: '1px solid rgba(255,255,255,0.12)',
            background: 'rgba(255,255,255,0.05)',
          }}
        >
          <div
            style={{
              width: '8px',
              height: '8px',
              borderRadius: '50%',
              background: 'linear-gradient(135deg, #818cf8, #c084fc)',
            }}
          />
          <span style={{ color: 'rgba(255,255,255,0.5)', fontSize: '16px' }}>
            by EazyWebNC
          </span>
        </div>
      </div>
    ),
    { ...size }
  )
}
