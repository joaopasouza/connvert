import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { string, func, number, bool, shape, node } from 'prop-types';

import formatCurrency from './format';

const defaultConfig = {
  locale: 'pt-BR',
  formats: {
    number: {
      BRL: {
        style: 'currency',
        currency: 'BRL',
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      },
    },
  },
};

function InputMoney({
  component: InputComponent,
  value,
  defaultValue,
  config,
  currency,
  max,
  autoFocus,
  autoSelect,
  autoReset,
  onChange,
  onBlur,
  onFocus,
  onKeyPress,
  ...otherProps
}) {
  const inputRef = useCallback(
    (node) => {
      const isActive = node === document.activeElement;

      if (node && autoFocus && !isActive) {
        node.focus();
      }
    },
    [autoFocus],
  );

  const [maskedValue, setMaskedValue] = useState('0');

  const safeConfig = useMemo(
    () => () => {
      const {
        formats: {
          number: {
            [currency]: { maximumFractionDigits },
          },
        },
      } = config;

      const finalConfig = {
        ...defaultConfig,
        ...config,
      };

      finalConfig.formats.number[
        currency
      ].minimumFractionDigits = maximumFractionDigits;

      return finalConfig;
    },
    [config, currency],
  );

  const clean = (number) => {
    if (typeof number === 'number') {
      return number;
    }

    return Number(number.toString().replace(/[^0-9-]/g, ''));
  };

  const normalizeValue = useCallback(
    (number) => {
      const {
        formats: {
          number: {
            [currency]: { maximumFractionDigits },
          },
        },
      } = safeConfig();
      let safeNumber = number;

      if (typeof number === 'string') {
        safeNumber = clean(number);

        if (safeNumber % 1 !== 0) {
          safeNumber = safeNumber.toFixed(maximumFractionDigits);
        }
      } else {
        safeNumber = Number.isInteger(number)
          ? Number(number) * 10 ** maximumFractionDigits
          : number.toFixed(maximumFractionDigits);
      }

      return clean(safeNumber) / 10 ** maximumFractionDigits;
    },
    [currency, safeConfig],
  );

  const calculateValues = useCallback(
    (inputFieldValue) => {
      const value = normalizeValue(inputFieldValue);
      const maskedValue = formatCurrency(value, safeConfig(), currency);

      return [value, maskedValue];
    },
    [currency, normalizeValue, safeConfig],
  );

  const updateValues = (value) => {
    const [calculatedValue, calculatedMaskedValue] = calculateValues(value);

    if (!max || calculatedValue <= max) {
      setMaskedValue(calculatedMaskedValue);

      return [calculatedValue, calculatedMaskedValue];
    } else {
      return [normalizeValue(maskedValue), maskedValue];
    }
  };

  const handleChange = (event) => {
    event.preventDefault();

    const [value, maskedValue] = updateValues(event.target.value);

    if (maskedValue) {
      onChange(event, value, maskedValue);
    }
  };

  const handleBlur = (event) => {
    const [value, maskedValue] = updateValues(event.target.value);

    if (autoReset) {
      calculateValues(0);
    }

    if (maskedValue) {
      onBlur(event, value, maskedValue);
    }
  };

  const handleFocus = (event) => {
    if (autoSelect) {
      event.target.select();
    }

    const [value, maskedValue] = updateValues(event.target.value);

    if (maskedValue) {
      onFocus(event, value, maskedValue);
    }
  };

  const handleKeyUp = (event) => onKeyPress(event, event.key, event.keyCode);

  useEffect(() => {
    const currentValue = value || defaultValue || 0;
    const [, maskedValue] = calculateValues(currentValue);

    setMaskedValue(maskedValue);
  }, [currency, value, defaultValue, config, calculateValues]);

  return (
    <InputComponent
      {...otherProps}
      ref={inputRef}
      value={maskedValue}
      onChange={handleChange}
      onBlur={handleBlur}
      onFocus={handleFocus}
      onKeyUp={handleKeyUp}
    />
  );
}

InputMoney.propTypes = {
  defaultValue: number,
  value: number,
  max: number,
  component: node.isRequired,
  currency: string.isRequired,
  config: shape().isRequired,
  autoFocus: bool.isRequired,
  autoSelect: bool.isRequired,
  autoReset: bool.isRequired,
  onChange: func.isRequired,
  onBlur: func.isRequired,
  onFocus: func.isRequired,
  onKeyPress: func.isRequired,
};

InputMoney.defaultProps = {
  component: 'input',
  currency: 'BRL',
  value: 0,
  config: defaultConfig,
  autoFocus: false,
  autoSelect: false,
  autoReset: false,
  onChange: (f) => f,
  onBlur: (f) => f,
  onFocus: (f) => f,
  onKeyPress: (f) => f,
};

export default InputMoney;
