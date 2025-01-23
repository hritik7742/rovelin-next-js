export const cardTypes = {
  visa: {
    name: 'Visa',
    prefix: ['4'],
    length: 16,
    cvvLength: 3,
    icon: '🔒',
    colors: {
      primary: '#1a1f71',
      secondary: '#436dc4',
      text: '#ffffff'
    }
  },
  mastercard: {
    name: 'Mastercard',
    prefix: ['51', '52', '53', '54', '55'],
    length: 16,
    cvvLength: 3,
    icon: '🔒',
    colors: {
      primary: '#eb001b',
      secondary: '#f79e1b',
      text: '#ffffff'
    }
  },
  amex: {
    name: 'American Express',
    prefix: ['34', '37'],
    length: 15,
    cvvLength: 4,
    icon: '💳',
    colors: {
      primary: '#108168',
      secondary: '#0f7159',
      text: '#ffffff'
    }
  },
  discover: {
    name: 'Discover',
    prefix: ['6011', '644', '645', '646', '647', '648', '649', '65'],
    length: 16,
    cvvLength: 3,
    icon: '💳',
    colors: {
      primary: '#ff6000',
      secondary: '#d14700',
      text: '#ffffff'
    }
  },
  jcb: {
    name: 'JCB',
    prefix: ['35'],
    length: 16,
    cvvLength: 3,
    icon: '💳',
    colors: {
      primary: '#0f4c81',
      secondary: '#0b3b68',
      text: '#ffffff'
    }
  }
}; 