"use client";

import { useState, useRef } from "react";
import { Upload, Mic, Play, Pause, Trash2, ArrowRight } from "lucide-react";

export default function MakeYourOwn() {
  const [uploadedFiles, setUploadedFiles] = useState([
    { name: "your-file-here.PDF", progress: 100, type: "pdf" },
    { name: "document-name.MP4", type: "mp4" },
  ]);
  const [speakerData, setSpeakerData] = useState({
    name: "",
    company: "",
    title: "",
    context: "",
    image: null,
    imagePreview: null,
  });

  const [isDragging, setIsDragging] = useState(false);
  const [showAnalysisModal, setShowAnalysisModal] = useState(false);
  const [analysisProgress, setAnalysisProgress] = useState(20);

  // Audio recording states
  const [isRecording, setIsRecording] = useState(false);
  const [recordingTime, setRecordingTime] = useState("00:00");
  const [recordingProgress, setRecordingProgress] = useState(0);
  const [audioBlob, setAudioBlob] = useState(null);

  // Refs for audio recording
  const mediaRecorderRef = useRef(null);
  const audioChunksRef = useRef([]);
  const timerRef = useRef(null);
  const startTimeRef = useRef(0);

  // Transcript data
  const [transcriptData, setTranscriptData] = useState([
    {
      speaker: "Speaker 1",
      time: "00:10",
      text: "Duis aute irure dolor in in proident velit esse cillum dolore eu fugiat",
    },
    {
      speaker: "Speaker 2",
      time: "00:10",
      text: "Duis aute irure dolor in in proident velit esse cillum dolore eu fugiat",
    },
  ]);

  // Handle audio recording
  const handleStartRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      mediaRecorderRef.current = new MediaRecorder(stream);
      audioChunksRef.current = [];

      mediaRecorderRef.current.ondataavailable = (event) => {
        audioChunksRef.current.push(event.data);
      };

      mediaRecorderRef.current.onstop = () => {
        const audioBlob = new Blob(audioChunksRef.current, {
          type: "audio/wav",
        });
        setAudioBlob(audioBlob);

        // In a real app, you would send this blob to a transcription service
        console.log("Recording stopped, audio blob created");
      };

      // Start recording
      mediaRecorderRef.current.start();
      setIsRecording(true);
      startTimeRef.current = Date.now();

      // Start timer
      timerRef.current = setInterval(() => {
        const elapsedTime = Date.now() - startTimeRef.current;
        const minutes = Math.floor(elapsedTime / 60000);
        const seconds = Math.floor((elapsedTime % 60000) / 1000);
        setRecordingTime(
          `${minutes.toString().padStart(2, "0")}:${seconds
            .toString()
            .padStart(2, "0")}`
        );

        // Update progress (assuming max recording time is 2:30)
        const totalSeconds = 2 * 60 + 30; // 2:30 in seconds
        const elapsedSeconds = minutes * 60 + seconds;
        const progress = Math.min((elapsedSeconds / totalSeconds) * 100, 100);
        setRecordingProgress(progress);
      }, 1000);
    } catch (error) {
      console.error("Error accessing microphone:", error);
    }
  };

  const handleStopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);

      if (timerRef.current) {
        clearInterval(timerRef.current);
      }

      // Stop all tracks on the stream
      mediaRecorderRef.current.stream
        .getTracks()
        .forEach((track) => track.stop());
    }
  };

  const handleFileUpload = (e) => {
    if (!e.target.files || e.target.files.length === 0) return;

    const files = Array.from(e.target.files);

    // Process the selected files
    const newFiles = files.map((file) => {
      const fileExtension = file.name.split(".").pop()?.toLowerCase() || "";
      return {
        name: file.name,
        progress: 0, // Start at 0% progress
        type: fileExtension,
      };
    });

    // Add new files to the state
    setUploadedFiles((prev) => [...prev, ...newFiles]);

    // Simulate upload progress for the new files
    newFiles.forEach((file, index) => {
      simulateFileUpload(uploadedFiles.length + index);
    });

    // Reset the input
    e.target.value = "";
  };

  const handleDragEnter = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (!isDragging) {
      setIsDragging(true);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);

    const files = Array.from(e.dataTransfer.files);

    if (files.length === 0) return;

    // Process the dropped files
    const newFiles = files.map((file) => {
      const fileExtension = file.name.split(".").pop()?.toLowerCase() || "";
      return {
        name: file.name,
        progress: 0, // Start at 0% progress
        type: fileExtension,
      };
    });

    // Add new files to the state
    setUploadedFiles((prev) => [...prev, ...newFiles]);

    // Simulate upload progress for the new files
    newFiles.forEach((file, index) => {
      simulateFileUpload(uploadedFiles.length + index);
    });
  };

  const simulateFileUpload = (fileIndex) => {
    let progress = 0;
    const interval = setInterval(() => {
      progress += 5;
      setUploadedFiles((prev) =>
        prev.map((file, index) =>
          index === fileIndex ? { ...file, progress } : file
        )
      );

      if (progress >= 100) {
        clearInterval(interval);
      }
    }, 200);
  };

  const removeFile = (index) => {
    setUploadedFiles(uploadedFiles.filter((_, i) => i !== index));
  };

  const handleDoneClick = () => {
    setShowAnalysisModal(true);

    // Simulate analysis progress
    const interval = setInterval(() => {
      setAnalysisProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + 5;
      });
    }, 300);
  };

  return (
    <div className="flex flex-col md:flex-row gap-6 bg-white">
      {/* Speaker Profile Form */}
      <div className="w-full md:w-[43%] p-4 space-y-6">
        <div className="flex flex-col items-center">
          <div className="w-24 h-24 rounded-full bg-gray-200 overflow-hidden mb-2">
            {speakerData.imagePreview ? (
              <img
                src={speakerData.imagePreview}
                alt="Speaker"
                className="w-full h-full object-cover rounded-full"
              />
            ) : (
              <Upload className="h-8 w-8 text-gray-500 m-auto mt-8" />
            )}
          </div>

          <label
            htmlFor="speaker-photo-upload"
            className="text-blue-500 cursor-pointer font-medium"
          >
            Upload Speaker Photo
          </label>

          <input
            type="file"
            accept="image/*"
            className="hidden"
            id="speaker-photo-upload"
            onChange={(e) => {
              const file = e.target.files[0];
              if (file) {
                const previewUrl = URL.createObjectURL(file);
                setSpeakerData({
                  ...speakerData,
                  image: file,
                  imagePreview: previewUrl,
                });
              }
            }}
          />
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-gray-600 mb-1">Speaker Name</label>
            <input
              type="text"
              placeholder="Enter Speaker's name"
              className="..."
              value={speakerData.name}
              onChange={(e) =>
                setSpeakerData({ ...speakerData, name: e.target.value })
              }
            />
          </div>

          <div>
            <label className="block text-gray-600 mb-1">Company</label>
            <input
              type="text"
              placeholder="Enter Speaker's Company"
              className="w-full p-3 bg-[#F5F6FA] border border-gray-300 rounded-[4px] focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={speakerData.company}
              onChange={(e) =>
                setSpeakerData({ ...speakerData, company: e.target.value })
              }
            />
          </div>

          <div>
            <label className="block text-gray-600 mb-1">Title</label>
            <input
              type="text"
              placeholder="Enter Speaker's Title"
              className="w-full p-3 bg-[#F5F6FA] border border-gray-300 rounded-[4px] focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={speakerData.title}
              onChange={(e) =>
                setSpeakerData({ ...speakerData, title: e.target.value })
              }
            />
          </div>

          <div>
            <label className="block text-gray-600 mb-1">Context</label>
            <input
              type="text"
              placeholder="Enter Context"
              className="w-full p-3 bg-[#F5F6FA] border border-gray-300 rounded-[4px] focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={speakerData.context}
              onChange={(e) =>
                setSpeakerData({ ...speakerData, context: e.target.value })
              }
            />
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="text-lg font-medium">Record your audio</h3>
          <div className="bg-gray-100 p-4 rounded-md">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center">
                  <Mic className="h-6 w-6 text-gray-500" />
                </div>
                <div>
                  <div className="text-2xl font-medium">{recordingTime}</div>
                  <div className="text-gray-500">
                    {isRecording ? "Recording..." : "Start recording"}
                  </div>
                </div>
              </div>
              <button
                className="w-12 h-12 cursor-pointer rounded-full bg-blue-500 flex items-center justify-center text-white"
                onClick={
                  isRecording ? handleStopRecording : handleStartRecording
                }
              >
                {isRecording ? (
                  <Pause className="h-6 w-6" />
                ) : (
                  <Play className="h-6 w-6" />
                )}
              </button>
            </div>

            <div className="mt-4">
              <div className="h-2 w-full bg-gray-300 rounded-full overflow-hidden">
                <div
                  className="h-full bg-blue-500 rounded-full"
                  style={{ width: `${recordingProgress}%` }}
                ></div>
              </div>
              <div className="flex justify-between mt-1 text-sm text-gray-500">
                <span>{recordingTime}</span>
                <span>02:30</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="w-full md:w-[57%] bg-gray-50 p-6">
        <div className="w-full bg-white p-4 rounded-lg">
          <h2 className="text-xl font-medium text-center mb-4">
            Upload a Video, Audio or Doc File
          </h2>

          <div
            className={`border-2 border-dashed ${
              isDragging
                ? "border-blue-500 bg-blue-100"
                : "border-blue-300 bg-blue-50"
            } rounded-lg p-8 flex flex-col items-center justify-center transition-colors duration-200`}
            onDragEnter={handleDragEnter}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
          >
            <div className="w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center mb-4">
              <Upload className="h-8 w-8 text-blue-500" />
            </div>

            <p className="text-center mb-2">
              {isDragging ? "Drop files here" : "Drag & drop files or"}{" "}
              <label
                htmlFor="file-upload"
                className="text-blue-500 cursor-pointer"
              >
                Browse
              </label>
            </p>
            <p className="text-sm text-gray-500 text-center">
              Supported formats: .MP4, AVI, MOV, WMV, MKV, FLV, DOC and MPEG
            </p>

            <input
              type="file"
              id="file-upload"
              className="hidden"
              onChange={handleFileUpload}
              multiple
            />
          </div>

          {uploadedFiles.length > 0 && (
            <div className="mt-6 space-y-4">
              <div className="flex justify-between items-center">
                <p className="text-gray-600">
                  Uploading - {uploadedFiles.length}/3 files
                </p>
              </div>

              {uploadedFiles
                .filter(
                  (file) => file.progress !== undefined && file.progress < 100
                )
                .map((file, index) => (
                  <div key={`uploading-${index}`} className="relative w-full">
                    <div className="h-1 w-full bg-gray-200 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-blue-500 rounded-full transition-all duration-300"
                        style={{ width: `${file.progress}%` }}
                      ></div>
                    </div>
                    <div className="flex justify-between items-center mt-1">
                      <span className="text-sm">{file.name}</span>
                      <button
                        onClick={() => removeFile(index)}
                        className="text-gray-400  cursor-pointer hover:text-gray-600"
                      >
                        <Trash2 className="h-5 w-5" />
                      </button>
                    </div>
                  </div>
                ))}

              <h3 className="font-medium pt-2">Uploaded</h3>
              <div className="flex flex-wrap gap-2">
                {uploadedFiles
                  .filter((file) => !file.progress || file.progress >= 100)
                  .map((file, index) => (
                    <div
                      key={`uploaded-${index}`}
                      className="flex justify-between items-center p-2 bg-white rounded border border-[#11AF22] w-[calc(50%-0.25rem)]"
                    >
                      <span>{file.name}</span>
                      <button
                        onClick={() =>
                          removeFile(
                            uploadedFiles.findIndex((f) => f.name === file.name)
                          )
                        }
                        className="text-red-400 cursor-pointer hover:text-red-600"
                      >
                        <Trash2 className="h-5 w-5" />
                      </button>
                    </div>
                  ))}
              </div>

              <button className="w-full cursor-pointer bg-blue-500 text-white py-3 rounded-md font-medium mt-4">
                UPLOAD FILES
              </button>

              {/* Transcript Section */}
              <div className="pt-4">
                <h3 className="font-medium text-center mb-4">Transcript</h3>
                <div className="space-y-4 border-[1px] border-gray-100 p-4 rounded-lg h-[300px] overflow-y-scroll">
                  {transcriptData.map((item, index) => (
                    <div
                      key={index}
                      className={`mb-6 bg-gray-50 p-4 rounded-lg w-full max-w-[400px] ${
                        index % 2 !== 0 ? "ml-auto" : ""
                      }`}
                    >
                      <div className="flex justify-between items-center mb-1">
                        <span className="font-medium">{item.speaker}</span>
                        <span className="text-sm text-gray-500">
                          {item.time}
                        </span>
                      </div>
                      <p className="text-sm text-gray-600">{item.text}</p>
                    </div>
                  ))}
                </div>

                <button
                  className="w-full bg-blue-500 text-white py-3 rounded-md font-medium mt-6"
                  onClick={handleDoneClick}
                >
                  DONE
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Analysis Modal */}
        {showAnalysisModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
              <h3 className="text-center text-gray-500 mb-4">
                Sit back & Relax !
              </h3>
              <h2 className="text-2xl font-bold text-center mb-6">
                Truthify is analysing your data
              </h2>

              <div className="h-2 w-full bg-gray-200 rounded-full overflow-hidden mb-4">
                <div
                  className="h-full bg-blue-500 rounded-full transition-all duration-300"
                  style={{ width: `${analysisProgress}%` }}
                ></div>
              </div>

              <p className="text-center text-gray-500 mb-8">
                This may take a few minutes.
              </p>

              <button
                className="flex cursor-pointer items-center justify-center gap-2 bg-blue-500 text-white py-3 px-6 rounded-md font-medium mx-auto"
                onClick={() => setShowAnalysisModal(false)}
              >
                SEE HOW WE ANALYZE DATA
                <ArrowRight className="h-5 w-5" />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
