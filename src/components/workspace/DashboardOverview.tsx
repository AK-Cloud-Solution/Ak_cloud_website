import React from 'react';
import {
    Trash2,
    Image as ImageIcon,
    File,
    FolderPlus,
    Bot
} from 'lucide-react';
import { Button } from '../ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { ScrollArea } from '../ui/scroll-area';

interface DashboardOverviewProps {
    files: any[];
    meetings: any[];
    projects: any[];
    setActiveProject: (project: any) => void;
    handleDeleteProject: (id: string, e: React.MouseEvent) => void;
    setActiveTab: (tab: string) => void;
}

export function DashboardOverview({
    files,
    meetings,
    projects,
    setActiveProject,
    handleDeleteProject,
    setActiveTab
}: DashboardOverviewProps) {
    return (
        <div className="space-y-8 animate-in fade-in duration-500">
            {/* Quick Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card className="bg-gradient-to-br from-blue-600 to-indigo-600 text-white border-none shadow-xl">
                    <CardHeader className="pb-2">
                        <CardTitle className="text-lg font-medium opacity-90">Total Files</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-4xl font-bold">{files.length}</div>
                        <p className="text-sm opacity-75 mt-1">Stored securely in cloud</p>
                    </CardContent>
                </Card>
                <Card className="shadow-sm hover:shadow-md transition-shadow">
                    <CardHeader className="pb-2">
                        <CardTitle className="text-lg font-medium text-slate-600 dark:text-slate-400">Meetings</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-4xl font-bold text-slate-900 dark:text-slate-100">{meetings.length}</div>
                        <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">Last: {meetings[0]?.date ? new Date(meetings[0].date).toLocaleDateString() : 'No meetings yet'}</p>
                    </CardContent>
                </Card>
                <Card className="shadow-sm hover:shadow-md transition-shadow">
                    <CardHeader className="pb-2">
                        <CardTitle className="text-lg font-medium text-slate-600 dark:text-slate-400">System Status</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="flex items-center gap-2 text-green-600 font-medium">
                            <div className="h-2 w-2 rounded-full bg-green-600 animate-pulse" />
                            All Systems Operational
                        </div>
                        <p className="text-sm text-slate-500 mt-1">Uptime: 99.9%</p>
                    </CardContent>
                </Card>
            </div>

            {/* Projects Section */}
            <div className="space-y-4">
                <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100">Your Projects</h3>
                {projects.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {projects.map((project: any) => (
                            <Card key={project._id} className="hover:shadow-md transition-shadow cursor-pointer group relative" onClick={() => setActiveProject(project)}>
                                <CardHeader>
                                    <div className="flex justify-between items-start">
                                        <CardTitle className="text-base">{project.name}</CardTitle>
                                        <Button
                                            variant="ghost"
                                            size="icon"
                                            className="h-6 w-6 text-slate-400 hover:text-red-500 -mt-1 -mr-1 opacity-0 group-hover:opacity-100 transition-opacity"
                                            onClick={(e) => handleDeleteProject(project._id, e)}
                                        >
                                            <Trash2 className="h-4 w-4" />
                                        </Button>
                                    </div>
                                    <CardDescription>{project.description || 'No description'}</CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <p className="text-xs text-slate-500">Created {new Date(project.createdAt).toLocaleDateString()}</p>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-10 bg-slate-50 dark:bg-slate-900 rounded-lg border border-dashed border-slate-200 dark:border-slate-800">
                        <p className="text-slate-500 dark:text-slate-400">No projects yet. Create one to get started!</p>
                    </div>
                )}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Recent Files Preview */}
                <Card className="col-span-1 shadow-sm">
                    <CardHeader className="flex flex-row items-center justify-between">
                        <div>
                            <CardTitle>Recent Files</CardTitle>
                            <CardDescription>Your latest uploads</CardDescription>
                        </div>
                        <Button variant="outline" size="sm" onClick={() => setActiveTab('drive')}>
                            View All
                        </Button>
                    </CardHeader>
                    <CardContent>
                        <ScrollArea className="h-[300px] pr-4">
                            <div className="space-y-4">
                                {files.slice(0, 5).map((file, i) => (
                                    <div key={i} className="flex items-center justify-between p-3 hover:bg-slate-50 rounded-lg transition-colors group border border-transparent hover:border-slate-100">
                                        <div className="flex items-center gap-3">
                                            <div className={`h-10 w-10 rounded-lg flex items-center justify-center ${file.mimeType.includes('pdf') ? 'bg-red-100 text-red-600' :
                                                file.mimeType.includes('image') ? 'bg-purple-100 text-purple-600' :
                                                    'bg-blue-100 text-blue-600'
                                                }`}>
                                                {file.mimeType.includes('image') ? <ImageIcon className="h-5 w-5" /> : <File className="h-5 w-5" />}
                                            </div>
                                            <div>
                                                <p className="font-medium text-sm text-slate-900 truncate max-w-[200px]">{file.originalName}</p>
                                                <p className="text-xs text-slate-500">{(file.size / 1024).toFixed(0)} KB • {new Date(file.createdAt).toLocaleDateString()}</p>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                                {files.length === 0 && (
                                    <div className="text-center py-12 text-slate-400">
                                        <FolderPlus className="h-12 w-12 mx-auto mb-3 opacity-50" />
                                        <p>No files uploaded yet</p>
                                    </div>
                                )}
                            </div>
                        </ScrollArea>
                    </CardContent>
                </Card>

                {/* Quick Meeting Action */}
                <Card className="col-span-1 border-indigo-100 shadow-md bg-gradient-to-br from-white to-indigo-50/50">
                    <CardHeader>
                        <div className="flex items-center gap-2">
                            <Bot className="h-5 w-5 text-indigo-600" />
                            <CardTitle className="text-indigo-900">Meeting Mind AI</CardTitle>
                        </div>
                        <CardDescription>Quickly process a meeting transcript</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="bg-white/80 backdrop-blur rounded-lg p-4 text-sm text-slate-600 border border-indigo-100 shadow-sm">
                            <p className="font-medium text-slate-900 mb-2">Start a new session:</p>
                            <p className="mb-4">Paste your transcript to generate instant minutes, summaries, and action items.</p>
                            <Button
                                className="w-full bg-indigo-600 hover:bg-indigo-700 text-white"
                                onClick={() => setActiveTab('meetings')}
                            >
                                Open Meeting Mind
                            </Button>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
