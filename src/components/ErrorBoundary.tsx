import React, { Component, ErrorInfo, ReactNode } from 'react';
import { RotateCcw, AlertTriangle, Phone, Home } from 'lucide-react';
import { BrandLogo } from './BrandLogo';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null,
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    // Production audit: Log safely to telemetry/console without breaking the client
    console.error('Handled application exception in ErrorBoundary:', error.message, errorInfo.componentStack);
  }

  private handleReload = () => {
    try {
      // Clear any corrupted transient session state if necessary
      window.location.reload();
    } catch {
      window.location.href = '/';
    }
  };

  private handleResetState = () => {
    try {
      localStorage.removeItem('al_italy_cart');
      window.location.href = window.location.pathname;
    } catch {
      window.location.reload();
    }
  };

  public render() {
    if (this.state.hasError) {
      return (
        <div
          dir="rtl"
          className="min-h-screen bg-[#FAF6F7] flex items-center justify-center p-4 sm:p-6 text-stone-800"
        >
          <div className="max-w-md w-full bg-white rounded-3xl p-6 sm:p-8 shadow-xl border border-[#7A153E]/10 text-center space-y-6">
            {/* Logo */}
            <div className="flex justify-center">
              <BrandLogo size="lg" />
            </div>

            {/* Icon & Message */}
            <div className="space-y-3">
              <div className="w-14 h-14 mx-auto rounded-2xl bg-[#7A153E]/10 flex items-center justify-center text-[#7A153E]">
                <AlertTriangle className="w-7 h-7" />
              </div>
              <h1 className="text-xl sm:text-2xl font-black text-[#2E0B19]">
                عذراً، حدث خطأ غير متوقع
              </h1>
              <p className="text-sm text-stone-600 leading-relaxed">
                تم حفظ بياناتك بأمان. يمكنك إعادة تحميل الصفحة أو العودة للواجهة الرئيسية لمتابعة طلبك بكل سلاسة.
              </p>
            </div>

            {/* Actions */}
            <div className="space-y-2.5 pt-2">
              <button
                onClick={this.handleReload}
                className="w-full py-3 px-5 rounded-2xl bg-[#7A153E] hover:bg-[#911849] text-white font-bold text-sm shadow-md shadow-[#7A153E]/20 transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-95"
              >
                <RotateCcw className="w-4 h-4" />
                <span>إعادة تحميل الصفحة</span>
              </button>

              <button
                onClick={this.handleResetState}
                className="w-full py-2.5 px-4 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-700 font-semibold text-xs transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <Home className="w-3.5 h-3.5" />
                <span>العودة للواجهة الرئيسية وتحديث السلة</span>
              </button>
            </div>

            {/* Quick branches phone hotline */}
            <div className="pt-4 border-t border-stone-100 text-xs text-stone-500">
              <p className="font-semibold text-stone-600 mb-1">خدمة الزبائن واستفسارات الطلبات:</p>
              <div className="flex items-center justify-center gap-4 text-[#7A153E] font-bold">
                <a href="tel:07813071487" className="hover:underline flex items-center gap-1" dir="ltr">
                  <Phone className="w-3 h-3" />
                  <span>0781 307 1487</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
