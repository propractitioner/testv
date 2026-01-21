import React, { useState, useRef, useEffect } from 'react';
import './PhotoStampAlbum.css';

interface PhotoStamp {
  id: string;
  originalImage: string;
  stampImage: string;
  location: string;
  date: string;
  uploadedAt: number;
}

const PhotoStampAlbum: React.FC = () => {
  const [stamps, setStamps] = useState<PhotoStamp[]>([]);
  const [selectedStamp, setSelectedStamp] = useState<PhotoStamp | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const savedStamps = localStorage.getItem('photoStamps');
    if (savedStamps) {
      setStamps(JSON.parse(savedStamps));
    }
  }, []);

  useEffect(() => {
    if (stamps.length > 0) {
      localStorage.setItem('photoStamps', JSON.stringify(stamps));
    }
  }, [stamps]);

  const createStampEffect = (image: HTMLImageElement): Promise<string> => {
    return new Promise((resolve) => {
      const canvas = canvasRef.current;
      if (!canvas) return;

      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      const stampWidth = 400;
      const stampHeight = 500;
      const perfSize = 8;
      const perfSpacing = 12;

      canvas.width = stampWidth + 40;
      canvas.height = stampHeight + 40;

      ctx.fillStyle = '#ffffff';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      const imgAspect = image.width / image.height;
      const stampAspect = stampWidth / stampHeight;

      let drawWidth, drawHeight, offsetX, offsetY;

      if (imgAspect > stampAspect) {
        drawHeight = stampHeight;
        drawWidth = drawHeight * imgAspect;
        offsetX = (stampWidth - drawWidth) / 2;
        offsetY = 0;
      } else {
        drawWidth = stampWidth;
        drawHeight = drawWidth / imgAspect;
        offsetX = 0;
        offsetY = (stampHeight - drawHeight) / 2;
      }

      ctx.save();
      ctx.beginPath();
      ctx.rect(20, 20, stampWidth, stampHeight);
      ctx.clip();
      ctx.drawImage(image, 20 + offsetX, 20 + offsetY, drawWidth, drawHeight);
      ctx.restore();

      ctx.strokeStyle = '#333';
      ctx.lineWidth = 3;
      ctx.strokeRect(20, 20, stampWidth, stampHeight);

      ctx.fillStyle = '#ffffff';
      for (let x = 20; x < 20 + stampWidth; x += perfSpacing) {
        ctx.beginPath();
        ctx.arc(x, 20, perfSize / 2, 0, Math.PI * 2);
        ctx.fill();
        ctx.beginPath();
        ctx.arc(x, 20 + stampHeight, perfSize / 2, 0, Math.PI * 2);
        ctx.fill();
      }

      for (let y = 20; y < 20 + stampHeight; y += perfSpacing) {
        ctx.beginPath();
        ctx.arc(20, y, perfSize / 2, 0, Math.PI * 2);
        ctx.fill();
        ctx.beginPath();
        ctx.arc(20 + stampWidth, y, perfSize / 2, 0, Math.PI * 2);
        ctx.fill();
      }

      resolve(canvas.toDataURL('image/png'));
    });
  };

  const handleFileSelect = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files || files.length === 0) return;

    setIsProcessing(true);

    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const reader = new FileReader();

      reader.onload = async (e) => {
        const img = new Image();
        img.onload = async () => {
          const stampImage = await createStampEffect(img);

          const newStamp: PhotoStamp = {
            id: `${Date.now()}-${i}`,
            originalImage: e.target?.result as string,
            stampImage,
            location: '',
            date: new Date().toISOString().split('T')[0],
            uploadedAt: Date.now(),
          };

          setStamps(prev => [...prev, newStamp]);
        };
        img.src = e.target?.result as string;
      };

      reader.readAsDataURL(file);
    }

    setIsProcessing(false);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    const files = event.dataTransfer.files;
    if (files.length > 0) {
      const inputElement = fileInputRef.current;
      if (inputElement) {
        inputElement.files = files;
        handleFileSelect({ target: inputElement } as any);
      }
    }
  };

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
  };

  const updateStampMetadata = (id: string, field: 'location' | 'date', value: string) => {
    setStamps(prev => prev.map(stamp =>
      stamp.id === id ? { ...stamp, [field]: value } : stamp
    ));
  };

  const deleteStamp = (id: string) => {
    setStamps(prev => prev.filter(stamp => stamp.id !== id));
    if (selectedStamp?.id === id) {
      setSelectedStamp(null);
    }
  };

  const clearAllStamps = () => {
    if (window.confirm('모든 우표를 삭제하시겠습니까? / Delete all stamps?')) {
      setStamps([]);
      localStorage.removeItem('photoStamps');
      setSelectedStamp(null);
    }
  };

  return (
    <div className="photo-stamp-album">
      <canvas ref={canvasRef} style={{ display: 'none' }} />

      <header className="album-header">
        <h1>📮 여행 우표 앨범 / Travel Stamp Album</h1>
        <p>여행 사진을 우표로 만들어 수집하세요 / Turn your travel photos into collectible stamps</p>
      </header>

      <div
        className="upload-section"
        onDrop={handleDrop}
        onDragOver={handleDragOver}
      >
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          multiple
          onChange={handleFileSelect}
          style={{ display: 'none' }}
        />
        <div className="upload-area" onClick={() => fileInputRef.current?.click()}>
          <div className="upload-icon">📷</div>
          <p className="upload-text">사진을 클릭하거나 드래그하여 업로드</p>
          <p className="upload-subtext">Click or drag photos to upload</p>
        </div>
        {stamps.length > 0 && (
          <button className="clear-button" onClick={clearAllStamps}>
            🗑️ 모두 삭제 / Clear All
          </button>
        )}
      </div>

      {isProcessing && (
        <div className="processing-message">
          우표 제작 중... / Creating stamps...
        </div>
      )}

      {stamps.length === 0 && !isProcessing && (
        <div className="empty-album">
          <p>아직 우표가 없습니다. 사진을 업로드해보세요!</p>
          <p>No stamps yet. Upload some photos to get started!</p>
        </div>
      )}

      <div className="stamp-grid">
        {stamps.map((stamp) => (
          <div key={stamp.id} className="stamp-card">
            <div className="stamp-container" onClick={() => setSelectedStamp(stamp)}>
              <img src={stamp.stampImage} alt="stamp" className="stamp-image" />
            </div>
            <div className="stamp-metadata">
              <input
                type="text"
                placeholder="장소 / Location"
                value={stamp.location}
                onChange={(e) => updateStampMetadata(stamp.id, 'location', e.target.value)}
                className="metadata-input"
              />
              <input
                type="date"
                value={stamp.date}
                onChange={(e) => updateStampMetadata(stamp.id, 'date', e.target.value)}
                className="metadata-input"
              />
              <button
                className="delete-button"
                onClick={() => deleteStamp(stamp.id)}
              >
                ✕
              </button>
            </div>
          </div>
        ))}
      </div>

      {selectedStamp && (
        <div className="modal-overlay" onClick={() => setSelectedStamp(null)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={() => setSelectedStamp(null)}>
              ✕
            </button>
            <img src={selectedStamp.stampImage} alt="stamp enlarged" className="modal-image" />
            <div className="modal-info">
              <p><strong>장소 / Location:</strong> {selectedStamp.location || '미지정 / Not specified'}</p>
              <p><strong>날짜 / Date:</strong> {selectedStamp.date}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PhotoStampAlbum;
