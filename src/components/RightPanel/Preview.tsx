import { PDFViewer, PDFDownloadLink } from '@react-pdf/renderer';
import { Download } from 'lucide-react';
import { CVTemplate } from './CVTemplate';
import { useLanguage } from '../../i18n';
import type { CVData } from '../../types/cv';

interface PreviewProps {
  data: CVData | null;
  loading: boolean;
}

export function Preview({ data, loading }: PreviewProps) {
  const { language, t } = useLanguage();

  if (loading) {
    return (
      <div className="h-full flex items-center justify-center bg-gray-50">
        <div className="text-gray-400 text-sm">{t.preview.loading}</div>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="h-full flex items-center justify-center bg-gray-50">
        <div className="text-gray-400 text-sm">{t.preview.noData}</div>
      </div>
    );
  }

  const fileName = `${data.cv.name.replace(/\s+/g, '_')}_${new Date().getFullYear()}_${t.preview.resumeFileSuffix}.pdf`;

  return (
    <div className="h-full flex flex-col bg-gray-100">
      <div className="flex items-center justify-between px-4 py-2 bg-white border-b border-gray-200 flex-shrink-0">
        <span className="text-sm font-medium text-gray-600">{t.preview.pdfPreview}</span>
        <PDFDownloadLink
          document={<CVTemplate data={data} language={language} />}
          fileName={fileName}
          className="flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-medium bg-blue-500 text-white hover:bg-blue-600 transition-colors"
        >
          {({ loading: pdfLoading }) => (
            <>
              <Download size={14} />
              {pdfLoading ? t.preview.generating : t.preview.downloadPDF}
            </>
          )}
        </PDFDownloadLink>
      </div>
      <div className="flex-1 p-4 overflow-hidden">
        <PDFViewer
          style={{
            width: '100%',
            height: '100%',
            border: 'none',
            borderRadius: '8px',
          }}
          showToolbar={false}
        >
          <CVTemplate data={data} language={language} />
        </PDFViewer>
      </div>
    </div>
  );
}
