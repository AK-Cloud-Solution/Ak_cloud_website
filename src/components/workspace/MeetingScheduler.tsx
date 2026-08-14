import React from 'react';
import {
    Mic,
    Trash2,
    Bot,
    Loader2
} from 'lucide-react';
import { Button } from '../ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { ScrollArea } from '../ui/scroll-area';

interface MeetingSchedulerProps {
    meetings: any[];
    handleDeleteMeeting: (id: string, e: React.MouseEvent) => void;
    inputMode: 'paste' | 'record';
    setInputMode: (mode: 'paste' | 'record') => void;
    transcript: string;
    setTranscript: (text: string) => void;
    isRecording: boolean;
    recordingTime: number;
    toggleRecording: () => void;
    handleGenerateMinutes: () => void;
    isGenerating: boolean;
    formatTime: (seconds: number) => string;
}

export function MeetingScheduler({
    meetings,
    handleDeleteMeeting,
    inputMode,
    setInputMode,
    transcript,
    setTranscript,
    isRecording,
    recordingTime,
    toggleRecording,
    handleGenerateMinutes,
    isGenerating,
    formatTime
}: MeetingSchedulerProps) {
    return (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 h-[calc(100vh-200px)] animate-in fade-in slide-in-from-bottom-4 duration-500">
            <Card className="lg:col-span-2 h-full flex flex-col shadow-sm">
                <CardHeader className="border-b border-slate-100">
                    <CardTitle>Meeting History</CardTitle>
                    <CardDescription>Past meeting minutes and action items</CardDescription>
                </CardHeader>
                <CardContent className="flex-1 p-0 overflow-hidden">
                    <ScrollArea className="h-full p-6">
                        <div className="space-y-4">
                            {meetings.map((meeting: any, i: number) => (
                                <Card key={i} className="hover:bg-slate-50 transition-colors border-slate-200">
                                    <CardContent className="p-6">
                                        <div className="flex items-center justify-between mb-4">
                                            <div className="flex items-center gap-3">
                                                <div className="h-10 w-10 bg-indigo-100 text-indigo-600 rounded-full flex items-center justify-center">
                                                    <Mic className="h-5 w-5" />
                                                </div>
                                                <div>
                                                    <h4 className="font-medium text-slate-900">{meeting.title || 'Untitled Meeting'}</h4>
                                                    <p className="text-sm text-slate-500">{new Date(meeting.date).toLocaleDateString()} • {new Date(meeting.date).toLocaleTimeString()}</p>
                                                </div>
                                            </div>
                                            <Button
                                                variant="ghost"
                                                size="icon"
                                                className="h-8 w-8 text-slate-400 hover:text-red-500 hover:bg-red-50"
                                                onClick={(e) => handleDeleteMeeting(meeting._id, e)}
                                            >
                                                <Trash2 className="h-4 w-4" />
                                            </Button>
                                        </div>
                                        <div className="space-y-3 pl-13">
                                            <div className="bg-slate-50 rounded-lg p-4 text-sm text-slate-700 border border-slate-100">
                                                <span className="font-semibold block mb-2 text-indigo-900">Summary</span>
                                                {meeting.summary}
                                            </div>
                                            <div>
                                                <span className="font-semibold text-sm text-slate-700 block mb-2">Action Items</span>
                                                <div className="space-y-2">
                                                    {meeting.actionItems?.map((item: string, idx: number) => (
                                                        <div key={idx} className="flex items-start gap-2 text-sm text-slate-600 bg-white p-2 rounded border border-slate-100">
                                                            <div className="h-5 w-5 rounded bg-green-100 text-green-600 flex items-center justify-center shrink-0 mt-0.5 text-xs">✓</div>
                                                            {item}
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>
                            ))}
                            {meetings.length === 0 && (
                                <div className="text-center py-20">
                                    <div className="h-20 w-20 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4 text-slate-400">
                                        <Mic className="h-10 w-10" />
                                    </div>
                                    <h3 className="text-lg font-medium text-slate-900">No meetings recorded</h3>
                                    <p className="text-slate-500 mt-1">Generate minutes to see them here</p>
                                </div>
                            )}
                        </div>
                    </ScrollArea>
                </CardContent>
            </Card>

            <Card className="lg:col-span-1 h-full flex flex-col shadow-md border-indigo-100">
                <CardHeader className="bg-gradient-to-r from-indigo-50 to-blue-50 border-b border-blue-100 shrink-0">
                    <div className="flex items-center gap-2">
                        <Bot className="h-5 w-5 text-indigo-600" />
                        <CardTitle className="text-indigo-900">New Meeting</CardTitle>
                    </div>
                    <CardDescription>Generate minutes instantly</CardDescription>
                </CardHeader>
                <CardContent className="p-4 space-y-4 flex-1 flex flex-col">
                    <div className="flex bg-slate-100 p-1 rounded-lg mb-2">
                        <button
                            className={`flex-1 text-sm font-medium py-1.5 rounded-md transition-all ${inputMode === 'paste' ? 'bg-white text-indigo-600 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
                            onClick={() => setInputMode('paste')}
                        >
                            Paste Transcript
                        </button>
                        <button
                            className={`flex-1 text-sm font-medium py-1.5 rounded-md transition-all ${inputMode === 'record' ? 'bg-white text-indigo-600 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
                            onClick={() => setInputMode('record')}
                        >
                            Auto Record
                        </button>
                    </div>

                    {inputMode === 'paste' ? (
                        <div className="bg-slate-50 rounded-lg p-4 text-sm text-slate-600 border border-slate-100 flex-1 flex flex-col">
                            <p className="font-medium text-slate-900 mb-2">Transcript Input:</p>
                            <textarea
                                className="w-full bg-transparent border-none focus:ring-0 p-0 text-sm resize-none flex-1"
                                placeholder="Paste meeting transcript here..."
                                value={transcript}
                                onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setTranscript(e.target.value)}
                            />
                        </div>
                    ) : (
                        <div className="bg-slate-50 rounded-lg p-4 text-sm text-slate-600 border border-slate-100 flex-1 flex flex-col items-center justify-center text-center">
                            <div className={`h-24 w-24 rounded-full flex items-center justify-center mb-6 transition-all duration-500 ${isRecording ? 'bg-red-100 ring-4 ring-red-50 animate-pulse' : 'bg-indigo-100'}`}>
                                <Mic className={`h-10 w-10 ${isRecording ? 'text-red-600' : 'text-indigo-600'}`} />
                            </div>

                            {isRecording ? (
                                <div className="space-y-2">
                                    <h3 className="text-lg font-semibold text-slate-900">Recording...</h3>
                                    <p className="text-2xl font-mono text-indigo-600 tabular-nums">{formatTime(recordingTime)}</p>
                                    <p className="text-xs text-slate-500">Click stop to process audio</p>
                                </div>
                            ) : (
                                <div className="space-y-2">
                                    <h3 className="text-lg font-semibold text-slate-900">Ready to Record</h3>
                                    <p className="text-slate-500">Click the button below to start</p>
                                </div>
                            )}
                        </div>
                    )}

                    {inputMode === 'paste' ? (
                        <Button
                            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white gap-2 shrink-0"
                            onClick={handleGenerateMinutes}
                            disabled={isGenerating || !transcript}
                        >
                            {isGenerating ? <Loader2 className="h-4 w-4 animate-spin" /> : <Bot className="h-4 w-4" />}
                            {isGenerating ? 'Generating...' : 'Generate Minutes'}
                        </Button>
                    ) : (
                        <Button
                            className={`w-full gap-2 shrink-0 ${isRecording ? 'bg-red-600 hover:bg-red-700 text-white' : 'bg-indigo-600 hover:bg-indigo-700 text-white'}`}
                            onClick={toggleRecording}
                        >
                            {isRecording ? (
                                <>
                                    <div className="h-3 w-3 bg-white rounded-sm" /> Stop Recording
                                </>
                            ) : (
                                <>
                                    <Mic className="h-4 w-4" /> Start Recording
                                </>
                            )}
                        </Button>
                    )}
                </CardContent>
            </Card>
        </div>
    );
}
