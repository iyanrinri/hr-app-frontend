'use client';

import { forwardRef, useState, useEffect } from 'react';

interface CurrencyInputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'onChange' | 'value'> {
  label?: string;
  error?: string;
  value?: number | string;
  onChange?: (value: number) => void;
  currency?: string;
}

export const CurrencyInput = forwardRef<HTMLInputElement, CurrencyInputProps>(
  ({ label, error, value, onChange, currency = 'IDR', className = '', ...props }, ref) => {
    // Format number with thousand separators
    const formatNumber = (num: number | string): string => {
      if (!num && num !== 0) return '';
      const numStr = num.toString().replace(/[^\d]/g, '');
      if (!numStr) return '';
      return parseInt(numStr).toLocaleString('id-ID');
    };

    // Parse formatted string to number
    const parseNumber = (str: string): number => {
      const cleaned = str.replace(/[^\d]/g, '');
      return cleaned ? parseInt(cleaned) : 0;
    };

    const [displayValue, setDisplayValue] = useState(() => 
      value !== undefined ? formatNumber(value) : ''
    );
    const [isFocused, setIsFocused] = useState(false);

    // Update display value when prop value changes (only when not focused)
    // eslint-disable-next-line react-hooks/exhaustive-deps
    useEffect(() => {
      if (!isFocused && value !== undefined) {
        const formatted = formatNumber(value);
        // Only update if different to avoid unnecessary re-renders
        setDisplayValue(prev => prev !== formatted ? formatted : prev);
      }
    }, [value, isFocused]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const inputValue = e.target.value;
      
      // Remove all non-digit characters
      const numericValue = inputValue.replace(/[^\d]/g, '');
      
      // Update display with formatted value
      const formatted = formatNumber(numericValue);
      setDisplayValue(formatted);
      
      // Call onChange with numeric value
      if (onChange) {
        onChange(parseNumber(numericValue));
      }
    };

    const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
      setIsFocused(true);
      if (props.onFocus) {
        props.onFocus(e);
      }
    };

    const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
      setIsFocused(false);
      // Reformat on blur to ensure consistency
      const numValue = parseNumber(displayValue);
      setDisplayValue(formatNumber(numValue));
      
      if (props.onBlur) {
        props.onBlur(e);
      }
    };

    return (
      <div className="space-y-1">
        {label && (
          <label className="block text-sm font-medium text-gray-700">
            {label}
          </label>
        )}
        <div className="relative">
          {currency && (
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <span className="text-gray-500 sm:text-sm font-medium">
                {currency === 'IDR' ? 'Rp' : currency}
              </span>
            </div>
          )}
          <input
            ref={ref}
            type="text"
            inputMode="numeric"
            value={displayValue}
            onChange={handleChange}
            onFocus={handleFocus}
            onBlur={handleBlur}
            className={`
              flex h-10 w-full rounded-md border border-gray-300 bg-transparent 
              ${currency ? 'pl-12' : 'px-3'} pr-3 py-2 text-sm 
              placeholder:text-gray-400 
              focus:outline-none focus:ring-2 focus:ring-brand-navy focus:ring-offset-2 
              disabled:cursor-not-allowed disabled:opacity-50
              ${error ? 'border-red-500 focus:ring-red-500' : ''}
              ${className}
            `}
            {...props}
          />
        </div>
        {error && (
          <p className="text-xs text-red-500 mt-1">{error}</p>
        )}
        {displayValue && !error && (
          <p className="text-xs text-gray-500 mt-1">
            {new Intl.NumberFormat('id-ID', {
              style: 'currency',
              currency: 'IDR',
              minimumFractionDigits: 0,
              maximumFractionDigits: 0,
            }).format(parseNumber(displayValue))}
          </p>
        )}
      </div>
    );
  }
);

CurrencyInput.displayName = 'CurrencyInput';
