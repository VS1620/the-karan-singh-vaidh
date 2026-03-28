import React, { useState } from 'react';
import { IKContext, IKUpload } from 'imagekitio-react';
import { Upload, X, Check, Loader2 } from 'lucide-react';

// Use same logic as api.js for consistency
const BASE_URL = window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1"
  ? "http://localhost:5000"
  : (import.meta.env.VITE_API_URL || window.location.origin);

const API_ORIGIN = BASE_URL.replace(/\/$/, "");

const publicKey = 'public_4c8twCaRhq67pmSzubBwraeuJvQ=';
const urlEndpoint = 'https://ik.imagekit.io/wjmididvj';

const authenticator = async () => {
  try {
    // Full path used to avoid confusion between frontend and backend domains
    const response = await fetch(`${API_ORIGIN}/api/imagekit/auth`);

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Auth failed: ${response.status}`);
    }

    const data = await response.json();
    const { signature, expire, token } = data;
    return { signature, expire, token };
  } catch (error) {
    console.error("ImageKit Auth Error:", error.message);
    throw new Error(`Authentication failed. ${error.message}`);
  }
};

const ImageKitUpload = ({ onUploadSuccess, folder = "/ksv-products", label = "Upload Image" }) => {
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [preview, setPreview] = useState(null);
  const [error, setError] = useState(null);

  const onError = (err) => {
    console.error("ImageKit Detail Error:", err);
    setError("API Error. Please check backend ENV keys.");
    setUploading(false);
  };

  const onSuccess = (res) => {
    setUploading(false);
    setPreview(res.url);
    setError(null);
    if (onUploadSuccess) onUploadSuccess(res.url);
  };

  const onUploadStart = () => {
    setUploading(true);
    setProgress(0);
    setError(null);
  };

  return (
    <IKContext
      publicKey={publicKey}
      urlEndpoint={urlEndpoint}
      authenticator={authenticator}
    >
      <div className="w-full">
        <div className={`relative border-2 border-dashed rounded-lg p-3 transition-all duration-300 
                    ${uploading ? 'border-emerald-300 bg-emerald-50/20' : 'border-gray-200 hover:border-emerald-400 bg-gray-50/50'}`}>

          {!preview && !uploading && (
            <div className="flex flex-col items-center justify-center gap-1.5">
              <Upload className="w-4 h-4 text-emerald-600" />
              <label className="cursor-pointer">
                <span className="text-emerald-700 text-[11px] font-bold hover:underline">{label}</span>
                <IKUpload
                  fileName={`ksv-${Date.now()}`}
                  folder={folder}
                  useUniqueFileName={true}
                  onError={onError}
                  onSuccess={onSuccess}
                  onUploadStart={onUploadStart}
                  className="hidden"
                />
              </label>
            </div>
          )}

          {uploading && (
            <div className="flex items-center justify-center gap-2 py-1">
              <Loader2 className="w-4 h-4 text-emerald-600 animate-spin" />
              <span className="text-[10px] font-bold text-emerald-700">Uploading...</span>
            </div>
          )}

          {preview && !uploading && (
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <img src={preview} alt="Min" className="w-6 h-6 rounded object-cover border border-emerald-200 shadow-sm" />
                <Check className="w-3 h-3 text-emerald-500" />
              </div>
              <button onClick={() => setPreview(null)} className="text-red-400 hover:text-red-600">
                <X size={12} />
              </button>
            </div>
          )}

          {error && <p className="text-[9px] text-red-500 mt-1 text-center italic">{error}</p>}
        </div>
      </div>
    </IKContext>
  );
};

export default ImageKitUpload;
