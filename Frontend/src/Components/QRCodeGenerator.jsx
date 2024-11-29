import React, { useState } from 'react';
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
    <div className="min-h-screen flex items-center justify-center pt-12">
      {/* Container for the QR Generator */}
      <div className="flex flex-col items-center space-y-6">
        {/* Input field for the URL or text */}
        <input
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          placeholder="Add link to generate QR"
          className="px-4 py-2 text-lg border border-gray-300 rounded-md w-72 focus:outline-none focus:ring-2 focus:ring-green-600"
        />
        
        {/* Generate QR Button */}
        <button
          onClick={handleGenerateQr}
          className="bg-green-600 text-white px-6 py-2 rounded-md cursor-pointer hover:bg-green-700"
        >
          Generate QR
        </button>

        {/* QR Code Display */}
        {qrCodeValue && (
          <div className="mt-6">
            <QRCode value={qrCodeValue} size={200} style={{ fill: '#659e38' }} />
          </div>
        )}
      </div>
    </div>
  );
};

export default QRCodeGenerator;
