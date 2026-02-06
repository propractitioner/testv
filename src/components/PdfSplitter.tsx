import { useState, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { PDFDocument } from 'pdf-lib';
import './PdfSplitter.css';

function PdfSplitter() {
  const { t } = useTranslation();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [file, setFile] = useState<File | null>(null);
  const [totalPages, setTotalPages] = useState<number>(0);
  const [pagesPerSplit, setPagesPerSplit] = useState<number>(1);
  const [isSplitting, setIsSplitting] = useState(false);
  const [resultFiles, setResultFiles] = useState<{ name: string; url: string }[]>([]);
  const [error, setError] = useState<string>('');

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    setError('');
    setResultFiles([]);
    setTotalPages(0);

    const selected = e.target.files?.[0];
    if (!selected) return;

    if (selected.type !== 'application/pdf') {
      setError(t('pdfSplitter.errors.notPdf'));
      return;
    }

    setFile(selected);

    try {
      const arrayBuffer = await selected.arrayBuffer();
      const pdf = await PDFDocument.load(arrayBuffer);
      const pages = pdf.getPageCount();
      setTotalPages(pages);
      setPagesPerSplit(Math.min(pagesPerSplit, pages) || 1);
    } catch {
      setError(t('pdfSplitter.errors.loadFailed'));
      setFile(null);
    }
  };

  const handleSplit = async () => {
    if (!file || totalPages === 0 || pagesPerSplit < 1) return;

    setIsSplitting(true);
    setError('');
    // Revoke previous object URLs
    resultFiles.forEach((f) => URL.revokeObjectURL(f.url));
    setResultFiles([]);

    try {
      const arrayBuffer = await file.arrayBuffer();
      const srcPdf = await PDFDocument.load(arrayBuffer);
      const total = srcPdf.getPageCount();
      const results: { name: string; url: string }[] = [];
      const baseName = file.name.replace(/\.pdf$/i, '');

      let partIndex = 1;
      for (let start = 0; start < total; start += pagesPerSplit) {
        const end = Math.min(start + pagesPerSplit, total);
        const newPdf = await PDFDocument.create();
        const pages = await newPdf.copyPages(srcPdf, Array.from({ length: end - start }, (_, i) => start + i));
        pages.forEach((page) => newPdf.addPage(page));

        const pdfBytes = await newPdf.save();
        const blob = new Blob([pdfBytes.buffer as ArrayBuffer], { type: 'application/pdf' });
        const url = URL.createObjectURL(blob);
        const name = `${baseName}_part${partIndex}.pdf`;
        results.push({ name, url });
        partIndex++;
      }

      setResultFiles(results);
    } catch {
      setError(t('pdfSplitter.errors.splitFailed'));
    } finally {
      setIsSplitting(false);
    }
  };

  const handleDownloadAll = () => {
    resultFiles.forEach((f) => {
      const a = document.createElement('a');
      a.href = f.url;
      a.download = f.name;
      a.click();
    });
  };

  const handleReset = () => {
    resultFiles.forEach((f) => URL.revokeObjectURL(f.url));
    setFile(null);
    setTotalPages(0);
    setPagesPerSplit(1);
    setResultFiles([]);
    setError('');
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const splitCount = totalPages > 0 ? Math.ceil(totalPages / pagesPerSplit) : 0;

  return (
    <div className="pdf-splitter">
      <div className="header">
        <h1>{t('pdfSplitter.title')}</h1>
        <p className="subtitle">{t('pdfSplitter.subtitle')}</p>
      </div>

      {/* File Upload Area */}
      <div
        className="upload-area"
        onClick={() => fileInputRef.current?.click()}
      >
        <input
          ref={fileInputRef}
          type="file"
          accept="application/pdf"
          onChange={handleFileChange}
          className="file-input"
        />
        <div className="upload-icon">PDF</div>
        <p className="upload-text">
          {file ? file.name : t('pdfSplitter.upload.placeholder')}
        </p>
        {file && totalPages > 0 && (
          <p className="upload-info">
            {t('pdfSplitter.upload.pageCount', { count: totalPages })}
          </p>
        )}
      </div>

      {error && <div className="error-message">{error}</div>}

      {/* Split Settings */}
      {file && totalPages > 0 && (
        <div className="split-settings">
          <h2>{t('pdfSplitter.settings.title')}</h2>
          <div className="settings-row">
            <label htmlFor="pagesPerSplit">{t('pdfSplitter.settings.pagesPerSplit')}</label>
            <input
              id="pagesPerSplit"
              type="number"
              min={1}
              max={totalPages}
              value={pagesPerSplit}
              onChange={(e) => {
                const val = Math.max(1, Math.min(totalPages, Number(e.target.value)));
                setPagesPerSplit(val);
              }}
              className="pages-input"
            />
          </div>
          <div className="split-preview">
            <p>
              {t('pdfSplitter.settings.preview', {
                totalPages,
                pagesPerSplit,
                splitCount,
              })}
            </p>
          </div>
          <div className="action-buttons">
            <button
              className="split-button"
              onClick={handleSplit}
              disabled={isSplitting}
            >
              {isSplitting ? t('pdfSplitter.actions.splitting') : t('pdfSplitter.actions.split')}
            </button>
            <button className="reset-button" onClick={handleReset}>
              {t('pdfSplitter.actions.reset')}
            </button>
          </div>
        </div>
      )}

      {/* Results */}
      {resultFiles.length > 0 && (
        <div className="split-results">
          <div className="results-header">
            <h2>{t('pdfSplitter.results.title')}</h2>
            <button className="download-all-button" onClick={handleDownloadAll}>
              {t('pdfSplitter.results.downloadAll')}
            </button>
          </div>
          <div className="results-grid">
            {resultFiles.map((f, idx) => (
              <div key={idx} className="result-card">
                <div className="result-icon">PDF</div>
                <div className="result-info">
                  <span className="result-name">{f.name}</span>
                  <span className="result-pages">
                    {t('pdfSplitter.results.pages', {
                      start: idx * pagesPerSplit + 1,
                      end: Math.min((idx + 1) * pagesPerSplit, totalPages),
                    })}
                  </span>
                </div>
                <a href={f.url} download={f.name} className="download-button">
                  {t('pdfSplitter.results.download')}
                </a>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default PdfSplitter;
