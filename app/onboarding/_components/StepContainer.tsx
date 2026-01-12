import React from 'react';

interface StepContainerProps {
  children: React.ReactNode;
  title?: string;
  subtitle?: string;
  className?: string;
}

export const StepContainer: React.FC<StepContainerProps> = ({
  children,
  title,
  subtitle,
  className = ""
}) => {
  return (
    <div className={`w-full max-w-2xl mx-auto p-8 rounded-3xl bg-white/10 backdrop-blur-xl border border-white/20 shadow-2xl text-white ${className}`}>
      {(title || subtitle) && (
        <div className="mb-8 text-center space-y-4">
          <img src="/borno.png" alt="Borno AI Logo" className="h-12 w-12 mx-auto object-contain" />
          {title && (
            <h2 className="text-3xl md:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-teal-200 to-teal-200">
              {title}
            </h2>
          )}
          {subtitle && (
            <p className="text-teal-100/80 text-lg">
              {subtitle}
            </p>
          )}
        </div>
      )}
      {children}
    </div>
  );
};
