import { ImageResponse } from 'next/og'
import fs from 'fs'
import path from 'path'

export const alt = "Ramkrishna Sharma - Portfolio"
export const size = {
  width: 1200,
  height: 630,
}

export const contentType = 'image/png'

export default async function Image() {
  // Read profile image from public directory
  const profileImagePath = path.join(process.cwd(), 'public', 'profile.jpg')
  let profileImageBase64 = null
  
  try {
    const imageBuffer = fs.readFileSync(profileImagePath)
    profileImageBase64 = `data:image/jpeg;base64,${imageBuffer.toString('base64')}`
  } catch (error) {
    console.error('Error reading profile image:', error)
  }

  return new ImageResponse(
    (
      <div
        style={{
          height: '100%',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#000000',
          backgroundImage: 'linear-gradient(to bottom, #000000, #1a1a1a)',
        }}
      >
        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '48px',
            padding: '80px',
          }}
        >
          {/* Profile Picture */}
          {profileImageBase64 && (
            <div
              style={{
                display: 'flex',
                width: '240',
                height: '240',
                borderRadius: '50%',
                border: '4px solid white',
                overflow: 'hidden',
              }}
            >
              <img
                src={profileImageBase64}
                alt="Profile"
                width={240}
                height={240}
                style={{
                  objectFit: 'cover',
                }}
              />
            </div>
          )}

          {/* Text Content */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '16px',
              maxWidth: '600px',
            }}
          >
            <h1
              style={{
                fontSize: '64px',
                fontWeight: 'bold',
                color: 'white',
                margin: 0,
                lineHeight: '1.1',
                letterSpacing: '-0.02em',
                textTransform: 'uppercase',
              }}
            >
              RAMKRISHNA SHARMA
            </h1>
            <p
              style={{
                fontSize: '24px',
                color: 'rgba(255, 255, 255, 0.7)',
                margin: 0,
                lineHeight: '1.4',
              }}
            >
              Computer Science student at UVA • Product Designer at NASA • Policy Analyst at MIT
            </p>
            <p
              style={{
                fontSize: '20px',
                color: 'rgba(255, 255, 255, 0.6)',
                margin: 0,
                lineHeight: '1.5',
                marginTop: '8px',
              }}
            >
              Building AI-driven interfaces and collaborative research tools
            </p>
          </div>
        </div>
      </div>
    ),
    {
      ...size,
    }
  )
}

