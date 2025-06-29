import { ImageResponse } from 'next/og'

export const runtime = 'edge'

export const alt = 'ポーカーディーラー.jp'
export const size = {
  width: 1200,
  height: 630,
}

export const contentType = 'image/png'

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          fontSize: 128,
          background: 'linear-gradient(135deg, #DC143C 0%, #8B0000 50%, #1a1a1a 100%)',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          color: '#FFD700',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', marginBottom: 20 }}>
          <span style={{ color: '#FFD700', marginRight: 20 }}>♠</span>
          <span style={{ color: '#DC143C', marginRight: 20 }}>♥</span>
          <span style={{ color: '#DC143C', marginRight: 20 }}>♦</span>
          <span style={{ color: '#FFD700' }}>♣</span>
        </div>
        <div style={{ fontSize: 64, fontWeight: 'bold', color: '#FAFAFA' }}>
          ポーカーディーラー.jp
        </div>
        <div style={{ fontSize: 32, color: '#C0C0C0', marginTop: 20 }}>
          日本最大級のポーカーディーラー専門求人サイト
        </div>
      </div>
    ),
    {
      ...size,
    }
  )
}