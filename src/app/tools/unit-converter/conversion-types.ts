export type ConversionUnits = {
  [key: string]: number | string;
};

export type ConversionType = {
  name: string;
  icon: string;
  units: ConversionUnits;
};

export const CONVERSION_TYPES: { [key: string]: ConversionType } = {
  length: {
    name: 'Length',
    icon: '📏',
    units: {
      meter: 1,
      kilometer: 1000,
      centimeter: 0.01,
      millimeter: 0.001,
      mile: 1609.34,
      yard: 0.9144,
      foot: 0.3048,
      inch: 0.0254,
      nauticalMile: 1852
    }
  },
  temperature: {
    name: 'Temperature',
    icon: '🌡️',
    units: {
      celsius: 'C',
      fahrenheit: 'F',
      kelvin: 'K'
    }
  },
  area: {
    name: 'Area',
    icon: '⬛',
    units: {
      squareMeter: 1,
      squareKilometer: 1000000,
      squareMile: 2589988.11,
      squareYard: 0.836127,
      squareFoot: 0.092903,
      squareInch: 0.00064516,
      hectare: 10000,
      acre: 4046.86
    }
  },
  volume: {
    name: 'Volume',
    icon: '🧊',
    units: {
      cubicMeter: 1,
      liter: 0.001,
      milliliter: 0.000001,
      gallon: 0.00378541,
      quart: 0.000946353,
      pint: 0.000473176,
      cup: 0.000236588,
      fluidOunce: 2.95735e-5,
      cubicFoot: 0.0283168,
      cubicInch: 1.63871e-5
    }
  },
  weight: {
    name: 'Weight',
    icon: '⚖️',
    units: {
      kilogram: 1,
      gram: 0.001,
      milligram: 0.000001,
      metricTon: 1000,
      pound: 0.453592,
      ounce: 0.0283495,
      stone: 6.35029,
      grain: 0.0000647989
    }
  },
  time: {
    name: 'Time',
    icon: '⏰',
    units: {
      second: 1,
      minute: 60,
      hour: 3600,
      day: 86400,
      week: 604800,
      month: 2629746,
      year: 31556952,
      decade: 315569520
    }
  }
};

export const formatValue = (value: number): string => {
  if (Math.abs(value) < 0.000001 || Math.abs(value) > 999999999) {
    return value.toExponential(6);
  }
  return Number(value.toPrecision(10)).toString();
}; 