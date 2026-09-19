import React, { useState, useRef, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  QrCode,
  Camera,
  X,
  CheckCircle2,
  AlertTriangle,
  KeyRound,
  ShieldCheck,
  RefreshCw,
  UploadCloud,
  AlertOctagon,
} from 'lucide-react';
import jsQR from 'jsqr';
import { generateTableToken, verifyTableToken } from '../lib/tableQr';
import { BrandLogo } from './BrandLogo';

interface TableQrScanModalProps {
  isOpen: boolean;
  tableNumber: string;
  totalAmount: number;
  onClose: () => void;
  onConfirmOrder: () => void;
}

interface ValidationResult {
  isValid: boolean;
  message: string;
  detectedTable?: number;
}

export const TableQrScanModal: React.FC<TableQrScanModalProps> = ({
  isOpen,
  tableNumber,
  totalAmount,
  onClose,
  onConfirmOrder,
}) => {
  const currentTableNum = parseInt(tableNumber, 10) || 1;
  const [cameraActive, setCameraActive] = useState<boolean>(false);
  const [cameraError, setCameraError] = useState<string | null>(null);
  const [scanFeedback, setScanFeedback] = useState<string | null>(null);
  const [manualCode, setManualCode] = useState<string>('');
  const [manualError, setManualError] = useState<string | null>(null);
  const [scanSuccess, setScanSuccess] = useState<boolean>(false);
  const [isProcessing, setIsProcessing] = useState<boolean>(false);

  const videoRef = useRef<HTMLVideoElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const animationFrameRef = useRef<number | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  // Stop camera stream & frame processing
  const stopCamera = useCallback(() => {
    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current);
      animationFrameRef.current = null;
    }
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop());
      streamRef.current = null;
    }
    setCameraActive(false);
  }, []);

  // Strict Validation Function
  const validateDecodedString = useCallback((decoded: string): ValidationResult => {
    if (!decoded || !decoded.trim()) {
      return { isValid: false, message: 'الرمز المقروء فارغ' };
    }

    const raw = decoded.trim();

    // 1. Look for URL query parameters (e.g. ?table=5 or &table=5)
    const urlTableMatch = raw.match(/[?&]table=(\d+)/i);
    const urlTokenMatch = raw.match(/[?&]token=([^&#\s]+)/i);

    // 2. Look for standalone token format (e.g. TAB5-A1B2C3 or TAB5)
    const tokenMatch = raw.match(/^TAB(\d+)(?:-([A-Z0-9]+))?$/i);

    let detectedNum: number | null = null;
    let detectedToken: string | null = null;

    if (urlTableMatch) {
      detectedNum = parseInt(urlTableMatch[1], 10);
      detectedToken = urlTokenMatch ? urlTokenMatch[1] : null;
    } else if (tokenMatch) {
      detectedNum = parseInt(tokenMatch[1], 10);
      detectedToken = raw;
    }

    // If it didn't match any table format at all (e.g., someone scanned a random website, Wi-Fi code, or product barcode)
    if (detectedNum === null) {
      return {
        isValid: false,
        message: `رمز غير معتمد! يجب مسح ملصق رمز QR المخصص لطاولة ${currentTableNum} في مطعم الإيطالي.`,
      };
    }

    // If it matches a table, but NOT this table
    if (detectedNum !== currentTableNum) {
      return {
        isValid: false,
        detectedTable: detectedNum,
        message: `تنبيه: قمت بمسح ملصق طاولة رقم (${detectedNum})، بينما طلبك الحالي مسجل على طاولة رقم (${currentTableNum}). يرجى مسح ملصق طاولتك.`,
      };
    }

    // Cryptographic validation of token if present
    if (detectedToken) {
      const isTokenValid = verifyTableToken(detectedNum, detectedToken);
      if (!isTokenValid && !detectedToken.toUpperCase().startsWith(`TAB${detectedNum}`)) {
        return {
          isValid: false,
          message: `كود التحقق الرقمي لطاولة ${currentTableNum} غير متطابق. يرجى مسح الرمز الأصلي المطبوع.`,
        };
      }
    }

    return {
      isValid: true,
      detectedTable: detectedNum,
      message: `تم التحقق بنجاح من ملصق طاولة ${detectedNum}!`,
    };
  }, [currentTableNum]);

  // Handle successful scan
  const handleSuccess = useCallback(() => {
    setIsProcessing(true);
    setScanSuccess(true);
    stopCamera();

    // Haptic feedback if supported
    if (typeof navigator !== 'undefined' && 'vibrate' in navigator) {
      try {
        navigator.vibrate([100, 50, 150]);
      } catch {}
    }

    setTimeout(() => {
      onConfirmOrder();
    }, 1100);
  }, [stopCamera, onConfirmOrder]);

  // Live QR Frame Processing Loop
  const scanVideoFrame = useCallback(() => {
    const video = videoRef.current;
    const canvas = canvasRef.current;

    if (!video || !canvas || video.readyState !== video.HAVE_ENOUGH_DATA) {
      animationFrameRef.current = requestAnimationFrame(scanVideoFrame);
      return;
    }

    const ctx = canvas.getContext('2d', { willReadFrequently: true });
    if (!ctx) {
      animationFrameRef.current = requestAnimationFrame(scanVideoFrame);
      return;
    }

    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);

    // Call jsQR to decode the raw pixel data
    const code = jsQR(imageData.data, imageData.width, imageData.height, {
      inversionAttempts: 'dontInvert',
    });

    if (code && code.data) {
      const validation = validateDecodedString(code.data);

      if (validation.isValid) {
        setScanFeedback(null);
        handleSuccess();
        return; // Stop scan loop
      } else {
        // Detected a QR code, but it's invalid or for the wrong table
        setScanFeedback(validation.message);
      }
    }

    // Keep scanning next frame
    animationFrameRef.current = requestAnimationFrame(scanVideoFrame);
  }, [validateDecodedString, handleSuccess]);

  // Start Camera
  const startCamera = useCallback(async () => {
    try {
      setCameraError(null);
      setScanFeedback(null);

      const constraints: MediaStreamConstraints = {
        video: {
          facingMode: { ideal: 'environment' },
          width: { ideal: 1280 },
          height: { ideal: 720 },
        },
      };

      const stream = await navigator.mediaDevices.getUserMedia(constraints);
      streamRef.current = stream;

      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        await videoRef.current.play();
      }

      setCameraActive(true);
      animationFrameRef.current = requestAnimationFrame(scanVideoFrame);
    } catch (err: any) {
      console.warn('Camera access error:', err);
      setCameraActive(false);
      if (err.name === 'NotAllowedError') {
        setCameraError('تم رفض إذن الوصول للكاميرا من المتصفح. يمكنك إدخال كود الطاولة يدوياً أو رفع صورة الملصق.');
      } else {
        setCameraError('تعذر فتح الكاميرا على جهازك. يرجى إدخال كود الطاولة المطبوع أسفل QR.');
      }
    }
  }, [scanVideoFrame]);

  // Auto-start camera on modal open
  useEffect(() => {
    if (isOpen) {
      setScanSuccess(false);
      setIsProcessing(false);
      setScanFeedback(null);
      setManualError(null);
      setManualCode('');
      startCamera();
    } else {
      stopCamera();
    }
    return () => {
      stopCamera();
    };
  }, [isOpen, startCamera, stopCamera]);

  // Handle Photo Upload / Capture fallback
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement('canvas');
        canvas.width = img.width;
        canvas.height = img.height;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;
        ctx.drawImage(img, 0, 0);
        const imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        const code = jsQR(imgData.data, imgData.width, imgData.height);
        if (code && code.data) {
          const validation = validateDecodedString(code.data);
          if (validation.isValid) {
            handleSuccess();
          } else {
            setScanFeedback(validation.message);
          }
        } else {
          setScanFeedback('لم يتم العثور على رمز QR واضح في الصورة المرفوعة. يرجى التأكد من وضوح الملصق.');
        }
      };
      img.src = event.target?.result as string;
    };
    reader.readAsDataURL(file);
  };

  // Handle Manual Code Submission
  const handleManualCodeSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setManualError(null);
    const cleaned = manualCode.trim();
    if (!cleaned) {
      setManualError('يرجى كتابة كود الطاولة.');
      return;
    }

    const validation = validateDecodedString(cleaned);
    if (validation.isValid) {
      handleSuccess();
    } else {
      // Also allow exact token check
      const expectedToken = generateTableToken(currentTableNum);
      if (
        cleaned.toUpperCase() === expectedToken.toUpperCase() ||
        cleaned === String(currentTableNum) ||
        verifyTableToken(currentTableNum, cleaned)
      ) {
        handleSuccess();
      } else {
        setManualError(`كود الطاولة غير صحيح! (الكود المعتمد لطاولة ${currentTableNum} يبدأ بـ TAB${currentTableNum})`);
      }
    }
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4" dir="rtl">
        {/* Hidden Canvas for Live Video Processing */}
        <canvas ref={canvasRef} className="hidden" />

        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={isProcessing ? undefined : onClose}
          className="fixed inset-0 bg-black/80 backdrop-blur-sm cursor-pointer"
        />

        {/* Modal Sheet */}
        <motion.div
          initial={{ scale: 0.92, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.92, opacity: 0, y: 20 }}
          className="relative z-10 w-full max-w-md bg-white rounded-3xl overflow-hidden shadow-2xl border border-stone-200"
        >
          {/* Header */}
          <div className="p-4 sm:p-5 bg-gradient-to-r from-[#4A0A24] via-[#6B1237] to-[#7A153E] text-white">
            <div className="flex items-center justify-between gap-3 mb-3">
              <BrandLogo variant="light" size="sm" />
              {!isProcessing && (
                <button
                  onClick={onClose}
                  className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

            <div className="flex items-center gap-2.5 pt-2.5 border-t border-white/15">
              <div className="w-9 h-9 rounded-2xl bg-amber-400 text-stone-900 flex items-center justify-center font-black shadow-md shrink-0">
                <QrCode className="w-4 h-4" />
              </div>
              <div>
                <h3 className="font-black text-sm sm:text-base text-white">
                  مسح رمز QR لتأكيد الطلب
                </h3>
                <p className="text-[11px] text-rose-100 font-medium">
                  طاولة رقم {currentTableNum} • القيمة: {totalAmount.toLocaleString('ar-IQ')} د.ع
                </p>
              </div>
            </div>
          </div>

          <div className="p-5 space-y-4 text-center">
            {scanSuccess ? (
              /* Success Stage */
              <div className="py-8 space-y-3">
                <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 mx-auto flex items-center justify-center animate-bounce">
                  <CheckCircle2 className="w-10 h-10" />
                </div>
                <h4 className="text-lg font-black text-stone-900">
                  تم التحقق من وجودك على طاولة {currentTableNum} بنجاح!
                </h4>
                <p className="text-xs text-stone-500 font-semibold">
                  جاري اعتماد الطلب وإرساله فوراً إلى المطبخ والكاشير...
                </p>
              </div>
            ) : (
              <>
                {/* Security Requirement Notice */}
                <div className="bg-amber-50 border border-amber-200 rounded-2xl p-3 text-right flex items-start gap-2.5 text-xs text-amber-950">
                  <ShieldCheck className="w-5 h-5 text-[#7A153E] shrink-0 mt-0.5" />
                  <p className="leading-relaxed font-medium">
                    <strong>تحقق أمني صارم:</strong> لمنع الطلب الوهمي من خارج الصالة، يرجى توجيه الكاميرا إلى ملصق QR المثبت على طاولة <strong>رقم {currentTableNum}</strong>.
                  </p>
                </div>

                {/* Camera Viewfinder with Live Detection */}
                <div className="relative w-full h-56 rounded-2xl bg-stone-950 overflow-hidden flex flex-col items-center justify-center border-2 border-stone-800 shadow-inner">
                  {cameraActive ? (
                    <video
                      ref={videoRef}
                      playsInline
                      muted
                      autoPlay
                      className="absolute inset-0 w-full h-full object-cover"
                    />
                  ) : (
                    /* Inactive placeholder */
                    <div className="text-center space-y-2 text-stone-400 p-4 z-10">
                      <QrCode className="w-14 h-14 text-amber-300 mx-auto opacity-70 animate-pulse" />
                      <p className="text-xs font-semibold text-stone-300">
                        الكاميرا متوقفة أو بانتظار الإذن
                      </p>
                      <button
                        onClick={startCamera}
                        className="mt-2 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-bold border border-white/20 cursor-pointer"
                      >
                        <RefreshCw className="w-3.5 h-3.5" />
                        <span>تشغيل الكاميرا</span>
                      </button>
                    </div>
                  )}

                  {/* High-tech Viewfinder Overlay */}
                  {cameraActive && (
                    <div className="absolute inset-6 pointer-events-none border-2 border-dashed border-amber-300/60 rounded-2xl flex flex-col justify-between p-2">
                      <div className="flex justify-between">
                        <div className="w-5 h-5 border-t-3 border-r-3 border-amber-400" />
                        <div className="w-5 h-5 border-t-3 border-l-3 border-amber-400" />
                      </div>

                      {/* Animated Laser Scanning Line */}
                      <motion.div
                        animate={{ y: [-40, 100, -40] }}
                        transition={{ duration: 2.2, repeat: Infinity, ease: 'linear' }}
                        className="w-full h-0.5 bg-gradient-to-r from-transparent via-rose-500 to-transparent shadow-lg shadow-rose-500/80"
                      />

                      <div className="flex justify-between">
                        <div className="w-5 h-5 border-b-3 border-r-3 border-amber-400" />
                        <div className="w-5 h-5 border-b-3 border-l-3 border-amber-400" />
                      </div>
                    </div>
                  )}

                  {cameraActive && (
                    <div className="absolute bottom-2.5 px-3 py-1 rounded-full bg-black/60 backdrop-blur-xs text-[11px] text-white font-medium">
                      جارٍ البحث عن ملصق طاولة {currentTableNum}...
                    </div>
                  )}
                </div>

                {/* Scan Error Feedback Alert */}
                {scanFeedback && (
                  <motion.div
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="p-3 rounded-2xl bg-rose-50 border border-rose-200 text-rose-800 text-xs font-bold text-right flex items-start gap-2"
                  >
                    <AlertTriangle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
                    <span>{scanFeedback}</span>
                  </motion.div>
                )}

                {/* Camera Permission / Device Error */}
                {cameraError && (
                  <div className="p-3 rounded-2xl bg-amber-50 border border-amber-200 text-amber-900 text-xs font-semibold text-right flex items-start gap-2">
                    <AlertOctagon className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                    <span>{cameraError}</span>
                  </div>
                )}

                {/* Alternative: Upload Photo of QR */}
                <div className="flex items-center justify-between gap-2 pt-1">
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    capture="environment"
                    className="hidden"
                    onChange={handleFileUpload}
                  />

                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className="flex-1 py-2.5 px-3 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-700 text-xs font-bold border border-stone-200 flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                  >
                    <UploadCloud className="w-4 h-4 text-[#7A153E]" />
                    <span>التقاط أو رفع صورة الـ QR</span>
                  </button>

                  {!cameraActive && (
                    <button
                      type="button"
                      onClick={startCamera}
                      className="py-2.5 px-3 rounded-xl bg-[#7A153E] hover:bg-[#911849] text-white text-xs font-bold flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                    >
                      <Camera className="w-4 h-4" />
                      <span>إعادة فتح الكاميرا</span>
                    </button>
                  )}
                </div>

                {/* Fallback: Security code printed under table sticker */}
                <div className="border-t border-stone-200 pt-2.5 text-right">
                  <details className="group">
                    <summary className="text-xs text-stone-600 font-bold cursor-pointer hover:text-[#7A153E] flex items-center justify-between py-1">
                      <span>إدخال كود أمان الطاولة يدوياً (مطبوع أسفل QR)</span>
                      <KeyRound className="w-3.5 h-3.5" />
                    </summary>

                    <form onSubmit={handleManualCodeSubmit} className="mt-2.5 space-y-2">
                      <div className="flex gap-2">
                        <input
                          type="text"
                          value={manualCode}
                          onChange={(e) => {
                            setManualCode(e.target.value);
                            setManualError(null);
                          }}
                          placeholder={`كود الطاولة مثلاً: TAB${currentTableNum}-...`}
                          className="flex-1 px-3 py-2 rounded-xl bg-stone-50 border border-stone-300 text-xs text-stone-800 font-mono focus:outline-none focus:border-[#7A153E]"
                        />
                        <button
                          type="submit"
                          className="px-4 py-2 rounded-xl bg-[#7A153E] hover:bg-[#911849] text-white font-bold text-xs transition-colors cursor-pointer"
                        >
                          تأكيد
                        </button>
                      </div>

                      {manualError && (
                        <p className="text-[11px] text-rose-600 font-bold">
                          {manualError}
                        </p>
                      )}
                    </form>
                  </details>
                </div>
              </>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
