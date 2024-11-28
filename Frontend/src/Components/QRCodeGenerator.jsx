// import React, { useState } from 'react';
// import MarketingBox from './MarketingBox';
// import QRCode from 'react-qr-code';

// const QRCodeGenerator = () => {
//   const [inputValue, setInputValue] = useState(''); // State to store the input value

//   const handleInputChange = (e) => {
//     const inputValue = e.target.value;
//     setInputValue(inputValue);
//   };

//   return (
//     <div>
//       <MarketingBox />

//       <div className='QR-Generator'>
//         <input type='text' value={inputValue} onChange={handleInputChange} placeholder='Enter text or URL' />
//         <QRCode value={inputValue} size={200} />
//       </div>
//     </div>
//   );
// };

// export default QRCodeGenerator;

import React, { useState } from 'react';
import MarketingBox from './MarketingBox';
import QRCode from 'react-qr-code';

const QRCodeGenerator = () => {
  const [inputValue, setInputValue] = useState(''); // State to store the input value
  const [qrCodeValue, setQrCodeValue] = useState(''); // State to store the QR code value

  const handleInputChange = (e) => {
    const inputValue = e.target.value;
    setInputValue(inputValue);
  };

  const handleGenerateQr = () => {
    setQrCodeValue(inputValue);
  };

  return (
    <div>
      <MarketingBox />

      <div className='QR-Generator' style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <input type='text' value={inputValue} onChange={handleInputChange} placeholder='Enter text or URL' style={{ padding: '10px', fontSize: '16px', marginBottom: '20px' }} />
          <button onClick={handleGenerateQr} style={{ backgroundColor: '#659e38', color: 'white', padding: '10px 20px', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>Generate QR</button>
        </div>
        {qrCodeValue && (
          <div style={{ marginLeft: '20px' }}>
            <QRCode value={qrCodeValue} size={200} style={{ fill: '#659e38' }} />
          </div>
        )}
      </div>
    </div>
  );
};

export default QRCodeGenerator;