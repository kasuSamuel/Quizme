const ProgressBar = ({ current, total }: { current: number; total: number }) => {
  const width = ((current + 1) / total) * 100

  return (
    <div style={{ width: '100%', background: '#ddd', borderRadius: '8px', height: '10px' }}>
      <div
        style={{
          width: `${width}%`,
          height: '100%',
          background: '#4CAF50',
          borderRadius: '8px',
          transition: 'width 0.3s ease'
        }}
      />
    </div>
  )
}

export default ProgressBar
