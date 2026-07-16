"use client";

import React, { useState, useRef } from "react";
import { UploadCloud, File as FileIcon, X, CheckCircle, AlertCircle, HardDrive } from "lucide-react";
import { DocumentSelector } from "./DocumentSelector";

interface SmartUploadProps {
  id: string;
  label: string;
  acceptedFormats?: string[];
  maxSizeMB?: number;
  onChange: (value: any) => void;
  value?: any;
}

export function SmartUpload({ id, label, acceptedFormats = [".pdf", ".jpg", ".png"], maxSizeMB = 5, onChange, value }: SmartUploadProps) {
  const [dragActive, setDragActive] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showPicker, setShowPicker] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const validateFile = (file: File) => {
    setError(null);
    const ext = "." + file.name.split('.').pop()?.toLowerCase();
    if (acceptedFormats.length > 0 && !acceptedFormats.includes(ext)) {
      setError(`Invalid format. Accepted: ${acceptedFormats.join(", ")}`);
      return false;
    }
    if (file.size > maxSizeMB * 1024 * 1024) {
      setError(`File is too large. Max size is ${maxSizeMB}MB`);
      return false;
    }
    return true;
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      if (validateFile(file)) {
        onChange(file);
      }
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      if (validateFile(file)) {
        onChange(file);
      }
    }
  };

  const handleCredentialSelect = (docId: string) => {
    // In a real app, this would fetch the credential details or a reference to it
    onChange({ type: 'credential', docId });
    setShowPicker(false);
    setError(null);
  };

  return (
    <div className="w-full">
      <div className="flex justify-between items-center mb-2">
        <label className="block text-sm font-medium text-slate-700">{label}</label>
        {(!value && !showPicker) && (
          <button 
            type="button" 
            onClick={() => setShowPicker(true)}
            className="text-xs font-semibold text-blue-600 hover:text-blue-800 flex items-center gap-1"
          >
            <HardDrive size={14} />
            Use Credentials
          </button>
        )}
      </div>

      {showPicker && !value && (
        <div className="bg-slate-50 p-4 rounded-lg border border-slate-200 mb-2">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium text-slate-700">Select from DigiLocker / Credentials</span>
            <button type="button" onClick={() => setShowPicker(false)} className="text-slate-500 hover:text-slate-700">
              <X size={16} />
            </button>
          </div>
          <DocumentSelector onSelect={handleCredentialSelect} />
        </div>
      )}

      {value ? (
        <div className="flex items-center justify-between p-4 bg-green-50 border border-green-200 rounded-lg">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-green-100 text-green-600 rounded-full flex items-center justify-center">
              <CheckCircle size={20} />
            </div>
            <div>
              <p className="text-sm font-medium text-slate-900">
                {value instanceof File ? value.name : `Credential Selected: ${value.docId}`}
              </p>
              <p className="text-xs text-slate-500">
                {value instanceof File ? `${(value.size / 1024 / 1024).toFixed(2)} MB` : 'Verified source'}
              </p>
            </div>
          </div>
          <button 
            type="button" 
            onClick={() => { onChange(undefined); setShowPicker(false); }}
            className="text-slate-400 hover:text-red-500 transition-colors"
          >
            <X size={20} />
          </button>
        </div>
      ) : (
        <div 
          className={`relative border-2 border-dashed rounded-lg p-6 flex flex-col items-center justify-center text-center transition-colors cursor-pointer ${
            dragActive ? "border-blue-500 bg-blue-50" : "border-slate-300 hover:bg-slate-50"
          } ${error ? "border-red-400 bg-red-50" : ""}`}
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
          onClick={() => inputRef.current?.click()}
        >
          <input
            ref={inputRef}
            type="file"
            className="hidden"
            accept={acceptedFormats.join(",")}
            onChange={handleChange}
          />
          <UploadCloud className={`w-10 h-10 mb-3 ${error ? 'text-red-400' : 'text-slate-400'}`} />
          <p className="text-sm font-medium text-slate-700">
            Drag and drop your file here, or <span className="text-blue-600 cursor-pointer">browse</span>
          </p>
          <p className="text-xs text-slate-500 mt-1">
            Supports: {acceptedFormats.join(", ")} up to {maxSizeMB}MB
          </p>
        </div>
      )}

      {error && (
        <div className="mt-2 flex items-center gap-2 text-sm text-red-600">
          <AlertCircle size={14} />
          {error}
        </div>
      )}
    </div>
  );
}
