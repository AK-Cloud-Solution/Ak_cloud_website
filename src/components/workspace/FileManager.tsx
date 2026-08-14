import React from 'react';
import {
    Upload,
    File,
    Image as ImageIcon,
    Trash2
} from 'lucide-react';
import { Button } from '../ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { ScrollArea } from '../ui/scroll-area';

interface FileManagerProps {
    files: any[];
    handleFileUpload: (e: React.ChangeEvent<HTMLInputElement>) => void;
    handleDeleteFile: (id: string) => void;
    fileInputRef: React.RefObject<HTMLInputElement | null>;
}

export function FileManager({
    files,
    handleFileUpload,
    handleDeleteFile,
    fileInputRef
}: FileManagerProps) {
    return (
        <Card className="h-full shadow-sm animate-in fade-in slide-in-from-bottom-4 duration-500">
            <CardHeader className="flex flex-row items-center justify-between border-b border-slate-100 bg-slate-50/30">
                <div>
                    <CardTitle>My Drive</CardTitle>
                    <CardDescription>Manage all your uploaded files</CardDescription>
                </div>
                <div className="relative">
                    <input
                        type="file"
                        ref={fileInputRef}
                        className="hidden"
                        onChange={handleFileUpload}
                    />
                    <Button className="gap-2 shadow-sm" onClick={() => fileInputRef.current?.click()}>
                        <Upload className="h-4 w-4" /> Upload New File
                    </Button>
                </div>
            </CardHeader>
            <CardContent className="p-6">
                <ScrollArea className="h-[calc(100vh-300px)]">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 pb-4">
                        {files.map((file: any, i: number) => (
                            <Card key={i} className="group hover:shadow-lg transition-all border-slate-200 hover:border-blue-300 cursor-pointer">
                                <CardContent className="p-4">
                                    <div className="flex items-start justify-between mb-4">
                                        <div className={`h-12 w-12 rounded-xl flex items-center justify-center shrink-0 ${file.mimeType.includes('pdf') ? 'bg-red-50 text-red-600' :
                                            file.mimeType.includes('image') ? 'bg-purple-50 text-purple-600' :
                                                'bg-blue-50 text-blue-600'
                                            }`}>
                                            {file.mimeType.includes('image') ? <ImageIcon className="h-6 w-6" /> : <File className="h-6 w-6" />}
                                        </div>
                                        <Button
                                            variant="ghost"
                                            size="icon"
                                            className="h-8 w-8 text-slate-400 hover:text-red-500 hover:bg-red-50 opacity-0 group-hover:opacity-100 transition-opacity"
                                            onClick={(e: React.MouseEvent) => {
                                                e.stopPropagation();
                                                handleDeleteFile(file._id);
                                            }}
                                        >
                                            <Trash2 className="h-4 w-4" />
                                        </Button>
                                    </div>
                                    <div>
                                        <p className="font-semibold text-slate-900 truncate" title={file.originalName}>{file.originalName}</p>
                                        <div className="flex items-center justify-between mt-2 text-xs text-slate-500">
                                            <span>{(file.size / 1024).toFixed(0)} KB</span>
                                            <span>{new Date(file.createdAt).toLocaleDateString()}</span>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                    {files.length === 0 && (
                        <div className="flex flex-col items-center justify-center h-[400px] text-slate-400 border-2 border-dashed border-slate-200 rounded-xl bg-slate-50/50">
                            <div className="h-20 w-20 bg-white rounded-full flex items-center justify-center shadow-sm mb-4">
                                <Upload className="h-8 w-8 text-blue-500" />
                            </div>
                            <h3 className="text-lg font-medium text-slate-900">No files yet</h3>
                            <p className="text-slate-500 mt-1 mb-4">Upload files to get started</p>
                            <Button variant="outline" onClick={() => fileInputRef.current?.click()}>
                                Select File
                            </Button>
                        </div>
                    )}
                </ScrollArea>
            </CardContent>
        </Card>
    );
}
