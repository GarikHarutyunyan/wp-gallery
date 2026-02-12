import React, {useState} from 'react';

interface ICopyableCodeProps {
  text: string;
}

const CopyableCode: React.FC<ICopyableCodeProps> = ({text}) => {
  const [copied, setCopied] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);

  const handleClick = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  return (
    <code
      style={{
        fontSize: 'large',
        cursor: 'pointer',
        padding: '4px 8px',
        borderRadius: '4px',
        backgroundColor: copied ? '#a7c957' : '#f0f0f0',
        transition: 'background-color 0.2s',
        position: 'relative',
      }}
      onClick={handleClick}
      onMouseEnter={() => setShowTooltip(true)}
      onMouseLeave={() => setShowTooltip(false)}
    >
      <strong>{text}</strong>
      {(copied || showTooltip) && (
        <span
          style={{
            position: 'absolute',
            top: '-25px',
            left: '50%',
            transform: 'translateX(-50%)',
            backgroundColor: '#333',
            color: '#fff',
            padding: '4px 8px',
            borderRadius: '4px',
            fontSize: '12px',
            whiteSpace: 'nowrap',
            pointerEvents: 'none',
          }}
        >
          {copied ? 'Copied!' : 'Click to copy'}
        </span>
      )}
    </code>
  );
};

export {CopyableCode};
