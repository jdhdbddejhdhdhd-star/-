import React, { useState, useEffect, useRef } from 'react';
import QRCode from 'qrcode';
import {
  QrCode,
  Printer,
  Download,
  Search,
  ExternalLink,
  ShieldCheck,
  CheckCircle,
  Copy,
} from 'lucide-react';
import { generateTableToken, getTableQRUrl } from '../lib/tableQr';

export const TableQrManager: React.FC = () => {
  const [selectedTable, setSelectedTable] = useState<number>(1);
  const [searchTable, setSearchTable] = useState<string>('');
  const [qrDataUrl, setQrDataUrl] = useState<string>('');
  const [copied, setCopied] = useState<boolean>(false);
  const [printAllMode, setPrintAllMode] = useState<boolean>(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Generate QR for selected table
  useEffect(() => {
    const directUrl = getTableQRUrl(selectedTable);
    QRCode.toDataURL(directUrl, {
      width: 320,
      margin: 2,
      color: {
        dark: '#4A0A24',
        light: '#FFFFFF',
      },
    }).then(setQrDataUrl).catch(console.error);
  }, [selectedTable]);

  const currentToken = generateTableToken(selectedTable);
  const currentUrl = getTableQRUrl(selectedTable);

  const handleCopyLink = () => {
    navigator.clipboard.writeText(currentUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handlePrintSingle = () => {
    window.print();
  };

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-3xl p-5 border border-stone-200 shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-[#7A153E]" />
            <h2 className="text-sm sm:text-base font-black text-stone-900">
              رموز QR لطاولات الصالة (1 إلى 100)
            </h2>
          </div>
          <p className="text-xs text-stone-500 mt-1">
            اختر رقم الطاولة لعرض وتحميل كود الـ QR الخاص بها.
          </p>
        </div>

        <div className="flex items-center gap-2 w-full md:w-auto">
          <button
            onClick={() => setPrintAllMode((p) => !p)}
            className="flex-1 md:flex-initial px-4 py-2 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-800 text-xs font-bold transition-colors cursor-pointer"
          >
            {printAllMode ? 'عرض الطاولة المحددة' : 'طباعة ورقة طاولات مجمعة'}
          </button>
        </div>
      </div>

      {!printAllMode ? (
        <div className="grid grid-cols-1 md:grid-cols-12 gap-5">
          {/* Table Selector (1 to 100) */}
          <div className="md:col-span-7 bg-white rounded-3xl p-5 border border-stone-200 shadow-sm space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-black text-stone-800">اختر رقم الطاولة (1 - 100):</span>
              <div className="w-36">
                <input
                  type="number"
                  min="1"
                  max="100"
                  value={searchTable}
                  onChange={(e) => {
                    setSearchTable(e.target.value);
                    const n = parseInt(e.target.value, 10);
                    if (n >= 1 && n <= 100) setSelectedTable(n);
                  }}
                  placeholder="بحث برقم طاولة..."
                  className="w-full px-2.5 py-1 text-xs rounded-xl border border-stone-200 focus:outline-none focus:border-[#7A153E]"
                />
              </div>
            </div>

            <div className="grid grid-cols-5 sm:grid-cols-10 gap-1.5 max-h-96 overflow-y-auto p-1 border border-stone-100 rounded-2xl">
              {Array.from({ length: 100 }, (_, i) => i + 1).map((num) => {
                const isSelected = selectedTable === num;
                return (
                  <button
                    key={num}
                    onClick={() => setSelectedTable(num)}
                    className={`py-2 rounded-xl text-xs font-black transition-all cursor-pointer ${
                      isSelected
                        ? 'bg-[#7A153E] text-white shadow-md shadow-[#7A153E]/20 scale-105'
                        : 'bg-stone-50 hover:bg-stone-100 text-stone-700 border border-stone-200/60'
                    }`}
                  >
                    {num}
                  </button>
                );
              })}
            </div>
          </div>

          {/* QR Preview & Print Card */}
          <div className="md:col-span-5 flex flex-col items-center justify-center bg-white rounded-3xl p-6 border border-stone-200 shadow-sm text-center space-y-4">
            <div
              id="printable-qr-stand"
              className="bg-white p-6 rounded-3xl border-2 border-[#7A153E]/30 shadow-lg text-center space-y-3 max-w-xs w-full"
            >
              <div className="border-b border-stone-100 pb-2">
                <span className="text-[10px] font-bold text-stone-400 block">مثلجات وحلويات الإيطالي</span>
                <span className="text-xl font-black text-[#4A0A24] font-serif">طاولة {selectedTable}</span>
              </div>

              {qrDataUrl && (
                <div className="flex justify-center py-1">
                  <img
                    src={qrDataUrl}
                    alt={`QR Code Table ${selectedTable}`}
                    className="w-48 h-48 rounded-2xl shadow-xs"
                  />
                </div>
              )}

              <div className="text-[10px] text-stone-500 font-medium leading-tight">
                امسح الرمز بكاميرا هاتفك للطلب مباشرة من هذه الطاولة
                <div className="text-[9px] text-stone-400 font-mono mt-1">كود الحماية: {currentToken}</div>
              </div>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-2 w-full pt-2">
              <button
                onClick={handlePrintSingle}
                className="flex-1 px-4 py-2.5 rounded-xl bg-[#7A153E] hover:bg-[#961D4E] text-white text-xs font-black flex items-center justify-center gap-2 cursor-pointer shadow-md transition-all"
              >
                <Printer className="w-4 h-4" />
                <span>طباعة استيكر الطاولة</span>
              </button>

              <button
                onClick={handleCopyLink}
                className="px-3 py-2.5 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-800 text-xs font-bold flex items-center gap-1.5 cursor-pointer transition-colors"
                title="نسخ الرابط المباشر"
              >
                {copied ? <CheckCircle className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
                <span>{copied ? 'تم النسخ' : 'نسخ الرابط'}</span>
              </button>

              <a
                href={currentUrl}
                target="_blank"
                rel="noreferrer"
                className="p-2.5 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-800 text-xs font-bold flex items-center justify-center cursor-pointer transition-colors"
                title="تجربة الدخول كزبون لهذه الطاولة"
              >
                <ExternalLink className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>
      ) : (
        /* Sheet for Bulk Printing (Tables 1 to 20 or chosen batch) */
        <div className="bg-white rounded-3xl p-6 border border-stone-200 shadow-sm space-y-4">
          <div className="flex items-center justify-between pb-3 border-b">
            <span className="font-bold text-xs text-stone-700">طباعة ملصقات الطاولات (مصفوفة قابلة للقص):</span>
            <button
              onClick={() => window.print()}
              className="px-4 py-2 rounded-xl bg-[#7A153E] text-white font-black text-xs flex items-center gap-2 cursor-pointer"
            >
              <Printer className="w-4 h-4" />
              <span>طباعة الكل</span>
            </button>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-2">
            {Array.from({ length: 24 }, (_, i) => i + 1).map((tableNum) => {
              const url = getTableQRUrl(tableNum);
              return (
                <div
                  key={tableNum}
                  className="border-2 border-dashed border-stone-300 p-3 rounded-2xl text-center space-y-2"
                >
                  <div className="font-black text-xs text-[#4A0A24]">طاولة {tableNum}</div>
                  <div className="text-[9px] text-stone-400">امسح للطلب</div>
                  <div className="w-24 h-24 mx-auto bg-stone-50 rounded-lg flex items-center justify-center border border-stone-100">
                    <img
                      src={`https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${encodeURIComponent(url)}`}
                      alt={`QR ${tableNum}`}
                      className="w-full h-full object-contain p-1"
                      loading="lazy"
                    />
                  </div>
                  <div className="text-[8px] font-mono text-stone-400">{generateTableToken(tableNum)}</div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};
