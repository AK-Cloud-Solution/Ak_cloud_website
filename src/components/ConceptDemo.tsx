import React, { useState, useEffect, useRef } from 'react';
import {
    Search,
    Upload,
    FileText,
    Mic,
    Bell,
    Settings,
    File,

    Image as ImageIcon,
    Plus,
    Trash2,
    LayoutDashboard,
    FolderPlus
} from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { ScrollArea } from './ui/scroll-area';
import { Separator } from './ui/separator';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "./ui/dialog";
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "./ui/sheet";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "./ui/popover";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Label } from "./ui/label";
import { api } from '../services/api';
import { toast } from 'sonner';
import { useAuth } from '../contexts/AuthContext';
import { useTheme } from './theme-provider';
import { SettingsPanel } from './workspace/SettingsPanel';
import { DashboardOverview } from './workspace/DashboardOverview';
import { FileManager } from './workspace/FileManager';
import { MeetingScheduler } from './workspace/MeetingScheduler';

interface ConceptDemoProps {
    onExit?: () => void;
}

export function ConceptDemo({ onExit }: ConceptDemoProps) {
    const { user } = useAuth();
    const { theme, setTheme } = useTheme();
    const [activeTab, setActiveTab] = useState('dashboard');
    const [files, setFiles] = useState<any[]>([]);
    const [meetings, setMeetings] = useState<any[]>([]);
    const [projects, setProjects] = useState<any[]>([]);
    const [activeProject, setActiveProject] = useState<any | null>(null);
    const [transcript, setTranscript] = useState('');
    const [isGenerating, setIsGenerating] = useState(false);
    const [isRecording, setIsRecording] = useState(false);
    const [recordingTime, setRecordingTime] = useState(0);
    const [inputMode, setInputMode] = useState<'paste' | 'record'>('paste');
    const recordingInterval = useRef<NodeJS.Timeout | null>(null);

    const [isNewProjectOpen, setIsNewProjectOpen] = useState(false);
    const [newProjectName, setNewProjectName] = useState('');
    const [emailNotifications, setEmailNotifications] = useState(true);
    const fileInputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        loadData();
    }, [activeProject]);

    const loadData = async () => {
        try {
            const [filesData, meetingsData, projectsData] = await Promise.all([
                api.getFiles(activeProject?._id),
                api.getMeetings(),
                api.getProjects()
            ]);

            if (Array.isArray(filesData)) {
                setFiles(filesData);
            } else {
                console.error('Files data is not an array:', filesData);
                setFiles([]);
            }

            if (Array.isArray(meetingsData)) {
                setMeetings(meetingsData);
            } else {
                console.error('Meetings data is not an array:', meetingsData);
                setMeetings([]);
            }

            if (Array.isArray(projectsData)) {
                setProjects(projectsData);
            } else {
                setProjects([]);
            }
        } catch (error) {
            console.error('Failed to load data', error);
            setFiles([]);
            setMeetings([]);
            setProjects([]);
        }
    };

    const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        try {
            toast.info(`Uploading ${file.name}...`);
            await api.uploadFile(file, activeProject?._id);
            toast.success('File uploaded successfully');
            loadData();
        } catch (error) {
            console.error('Upload error:', error);
            toast.error('Failed to upload file. Please try again.');
        } finally {
            // Reset input so the same file can be selected again if needed
            if (fileInputRef.current) {
                fileInputRef.current.value = '';
            }
        }
    };

    const handleDeleteFile = async (id: string) => {
        try {
            await api.deleteFile(id);
            toast.success('File deleted');
            loadData();
        } catch (error) {
            toast.error('Failed to delete file');
        }
    };

    const handleDeleteProject = async (id: string, e: React.MouseEvent) => {
        e.stopPropagation();
        if (!confirm('Are you sure you want to delete this project?')) return;

        try {
            await api.deleteProject(id);
            toast.success('Project deleted');
            if (activeProject?._id === id) {
                setActiveProject(null);
                setActiveTab('dashboard');
            }
            loadData();
        } catch (error) {
            toast.error('Failed to delete project');
        }
    };

    const handleDeleteMeeting = async (id: string, e: React.MouseEvent) => {
        e.stopPropagation();
        if (!confirm('Are you sure you want to delete this meeting?')) return;

        try {
            await api.deleteMeeting(id);
            toast.success('Meeting deleted');
            loadData();
        } catch (error) {
            toast.error('Failed to delete meeting');
        }
    };

    const toggleRecording = () => {
        if (isRecording) {
            // Stop recording
            setIsRecording(false);
            if (recordingInterval.current) {
                clearInterval(recordingInterval.current);
                recordingInterval.current = null;
            }
            // Simulate transcript generation
            toast.success('Recording finished. Processing audio...');
            setTimeout(() => {
                setTranscript("This is a simulated transcript of the recorded meeting. In a real application, this would be the result of speech-to-text processing. The meeting discussed project timelines, key deliverables, and assigned action items to the team members present.");
                setInputMode('paste'); // Switch back to view the transcript
            }, 1500);
        } else {
            // Start recording
            setIsRecording(true);
            setRecordingTime(0);
            recordingInterval.current = setInterval(() => {
                setRecordingTime(prev => prev + 1);
            }, 1000);
        }
    };

    const formatTime = (seconds: number) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins}:${secs.toString().padStart(2, '0')}`;
    };

    const handleGenerateMinutes = async () => {
        if (!transcript.trim()) return;

        setIsGenerating(true);
        try {
            const result = await api.generateMinutes(transcript);
            // setGeneratedResult(result);

            // Auto-save meeting
            await api.saveMeeting({
                title: `Meeting on ${new Date().toLocaleDateString()}`,
                transcript,
                summary: result.summary,
                actionItems: result.actionItems
            });

            toast.success('Minutes generated and saved!');
            loadData();
        } catch (error) {
            toast.error('Failed to generate minutes');
            setIsGenerating(false);
        }
    };

    const handleCreateProject = async () => {
        if (!newProjectName.trim()) return;

        try {
            await api.createProject(newProjectName);
            toast.success(`Project "${newProjectName}" created!`);
            setIsNewProjectOpen(false);
            setNewProjectName('');
            loadData();
        } catch (error) {
            toast.error('Failed to create project');
        }
    };

    const getRecentActivity = () => {
        const activity = [
            ...files.map((f: any) => ({ type: 'file', item: f, date: new Date(f.createdAt) })),
            ...meetings.map((m: any) => ({ type: 'meeting', item: m, date: new Date(m.date) })),
            ...projects.map((p: any) => ({ type: 'project', item: p, date: new Date(p.createdAt) }))
        ];
        return activity.sort((a, b) => b.date.getTime() - a.date.getTime()).slice(0, 10);
    };

    const recentActivity = getRecentActivity();

    return (
        <div className="fixed inset-0 bg-slate-50 dark:bg-slate-950 font-sans text-slate-900 dark:text-slate-50 flex flex-col h-screen overflow-hidden transition-colors duration-300">
            {/* Top Navigation Bar - Glassmorphic */}
            <header className="shrink-0 z-50 w-full border-b border-slate-200 dark:border-slate-800 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md supports-[backdrop-filter]:bg-white/60 dark:supports-[backdrop-filter]:bg-slate-900/60">
                <div className="container-fluid px-6 h-16 flex items-center justify-between">
                    <div className="flex items-center gap-2 font-bold text-xl text-blue-600">
                        <div className="h-8 w-8 bg-blue-600 rounded-lg flex items-center justify-center text-white">
                            AK
                        </div>
                    </div>
                    {/* Global Search / Command Palette */}
                    <div className="hidden md:flex items-center max-w-md w-full relative mx-4">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                        <Input
                            placeholder="Search files, meetings, or commands (Ctrl+K)..."
                            className="pl-10 bg-slate-100 dark:bg-slate-800 border-transparent focus:bg-white dark:focus:bg-slate-900 transition-all w-full"
                        />
                    </div>

                    <div className="flex items-center gap-4">
                        <Popover>
                            <PopoverTrigger asChild>
                                <Button variant="ghost" size="icon" className="text-slate-500 relative">
                                    <Bell className="h-5 w-5" />
                                    {recentActivity.length > 0 && (
                                        <span className="absolute top-2 right-2 h-2 w-2 bg-red-500 rounded-full" />
                                    )}
                                </Button>
                            </PopoverTrigger>
                            <PopoverContent className="w-80 p-0" align="end">
                                <div className="p-4 border-b border-slate-100">
                                    <h4 className="font-semibold leading-none">Notifications</h4>
                                    <p className="text-sm text-slate-500 mt-1">Recent activity in your workspace</p>
                                </div>
                                <ScrollArea className="h-[300px]">
                                    {recentActivity.length > 0 ? (
                                        <div className="divide-y divide-slate-100 dark:divide-slate-800">
                                            {recentActivity.map((act, i) => (
                                                <div key={i} className="p-4 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors flex gap-3">
                                                    <div className={`h-8 w-8 rounded-full flex items-center justify-center shrink-0 ${act.type === 'file' ? 'bg-blue-100 text-blue-600 dark:bg-blue-900 dark:text-blue-300' :
                                                        act.type === 'meeting' ? 'bg-purple-100 text-purple-600 dark:bg-purple-900 dark:text-purple-300' :
                                                            'bg-green-100 text-green-600 dark:bg-green-900 dark:text-green-300'
                                                        }`}>
                                                        {act.type === 'file' ? <FileText className="h-4 w-4" /> :
                                                            act.type === 'meeting' ? <Mic className="h-4 w-4" /> :
                                                                <FolderPlus className="h-4 w-4" />}
                                                    </div>
                                                    <div>
                                                        <p className="text-sm font-medium text-slate-900 dark:text-slate-100">
                                                            {act.type === 'file' ? 'New file uploaded' :
                                                                act.type === 'meeting' ? 'Meeting recorded' :
                                                                    'New project created'}
                                                        </p>
                                                        <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                                                            {act.type === 'file' ? act.item.originalName :
                                                                act.type === 'meeting' ? act.item.title :
                                                                    act.item.name}
                                                        </p>
                                                        <p className="text-[10px] text-slate-400 mt-1">
                                                            {act.date.toLocaleString()}
                                                        </p>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    ) : (
                                        <div className="p-8 text-center text-slate-500">
                                            <Bell className="h-8 w-8 mx-auto mb-2 opacity-20" />
                                            <p>No notifications yet</p>
                                        </div>
                                    )}
                                </ScrollArea>
                                {recentActivity.length > 0 && (
                                    <div className="p-2 border-t border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-900">
                                        <Button variant="ghost" className="w-full text-xs h-8" onClick={() => toast.success('All notifications marked as read')}>
                                            Mark all as read
                                        </Button>
                                    </div>
                                )}
                            </PopoverContent>
                        </Popover>

                        <Sheet>
                            <SheetTrigger asChild>
                                <Button variant="ghost" size="icon" className="text-slate-500">
                                    <Settings className="h-5 w-5" />
                                </Button>
                            </SheetTrigger>
                            <SheetContent>
                                <SheetHeader>
                                    <SheetTitle>Settings</SheetTitle>
                                    <SheetDescription>
                                        Manage your workspace preferences
                                    </SheetDescription>
                                </SheetHeader>
                                <SettingsPanel
                                    user={user}
                                    theme={theme}
                                    setTheme={setTheme}
                                    emailNotifications={emailNotifications}
                                    setEmailNotifications={setEmailNotifications}
                                    files={files}
                                    onExit={onExit}
                                />
                            </SheetContent>
                        </Sheet>

                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Avatar className="h-8 w-8 cursor-pointer ring-2 ring-offset-2 ring-blue-600 hover:opacity-80 transition-opacity">
                                    <AvatarImage src={`https://ui-avatars.com/api/?name=${user?.username}&background=2563eb&color=fff`} />
                                    <AvatarFallback>AK</AvatarFallback>
                                </Avatar>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end" className="w-56">
                                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem onClick={() => toast.info('Profile settings coming soon')}>
                                    Profile
                                </DropdownMenuItem>
                                <DropdownMenuItem onClick={() => toast.info('Billing settings coming soon')}>
                                    Billing
                                </DropdownMenuItem>
                                <DropdownMenuItem onClick={() => toast.info('Team settings coming soon')}>
                                    Team
                                </DropdownMenuItem>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem className="text-red-600" onClick={onExit}>
                                    Log out
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>
                </div>
            </header >

            {/* Main Workspace Layout */}
            < div className="flex flex-1 overflow-hidden" >
                {/* Sidebar Navigation */}
                < aside className="w-64 border-r border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 hidden md:flex flex-col p-4 gap-2 shrink-0 transition-colors duration-300" >
                    <Button
                        variant={activeTab === 'dashboard' ? 'secondary' : 'ghost'}
                        className="w-full justify-start gap-2 h-10"
                        onClick={() => setActiveTab('dashboard')}
                    >
                        <LayoutDashboard className="h-4 w-4" /> Dashboard
                    </Button>
                    <Button
                        variant={activeTab === 'drive' ? 'secondary' : 'ghost'}
                        className="w-full justify-start gap-2 h-10"
                        onClick={() => setActiveTab('drive')}
                    >
                        <FileText className="h-4 w-4" /> My Drive
                    </Button>
                    <Button
                        variant={activeTab === 'meetings' ? 'secondary' : 'ghost'}
                        className="w-full justify-start gap-2 h-10"
                        onClick={() => setActiveTab('meetings')}
                    >
                        <Mic className="h-4 w-4" /> Meeting Mind
                    </Button>

                    <Separator className="my-4" />
                    <div className="px-2">
                        <h4 className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-3">Storage</h4>
                        <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                            <div className="h-full bg-blue-600 w-[65%]" />
                        </div>
                        <p className="text-xs text-slate-500 mt-2">{(files.reduce((acc: number, f: any) => acc + f.size, 0) / (1024 * 1024)).toFixed(2)} MB used</p>
                    </div>
                </aside >

                {/* Main Content Area */}
                < main className="flex-1 overflow-y-auto bg-slate-50/50 dark:bg-slate-950/50 p-6 md:p-8 transition-colors duration-300" >
                    <div className="max-w-7xl mx-auto space-y-8">
                        {/* Header Section */}
                        <div className="flex items-center justify-between">
                            <div>
                                {activeProject ? (
                                    <div className="flex items-center gap-2">
                                        <Button variant="ghost" size="sm" onClick={() => setActiveProject(null)} className="mr-2 dark:text-slate-300">
                                            ← Back
                                        </Button>
                                        <div>
                                            <h1 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white">
                                                {activeProject.name}
                                            </h1>
                                            <p className="text-slate-500 dark:text-slate-400 mt-1">
                                                {activeProject.description || 'Project Workspace'}
                                            </p>
                                        </div>
                                    </div>
                                ) : (
                                    <div>
                                        <h1 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white">
                                            {activeTab === 'dashboard' ? `Welcome back, ${user?.username}` :
                                                activeTab === 'drive' ? 'My Drive' : 'Meeting Mind'}
                                        </h1>
                                        <p className="text-slate-500 dark:text-slate-400 mt-1">
                                            {activeTab === 'dashboard' ? "Here's what's happening with your projects today." :
                                                activeTab === 'drive' ? 'Manage and organize your files.' : 'Transcribe and analyze your meetings.'}
                                        </p>
                                    </div>
                                )}
                            </div>

                            {!activeProject && (
                                <Dialog open={isNewProjectOpen} onOpenChange={setIsNewProjectOpen}>
                                    <DialogTrigger asChild>
                                        <Button className="bg-blue-600 hover:bg-blue-700 gap-2 shadow-lg shadow-blue-600/20">
                                            <Plus className="h-4 w-4" /> New Project
                                        </Button>
                                    </DialogTrigger>
                                    <DialogContent className="sm:max-w-[425px]">
                                        <DialogHeader>
                                            <DialogTitle>Create New Project</DialogTitle>
                                            <DialogDescription>
                                                Create a new workspace for your team to collaborate.
                                            </DialogDescription>
                                        </DialogHeader>
                                        <div className="grid gap-4 py-4">
                                            <div className="grid grid-cols-4 items-center gap-4">
                                                <Label htmlFor="name" className="text-right">
                                                    Name
                                                </Label>
                                                <Input
                                                    id="name"
                                                    value={newProjectName}
                                                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setNewProjectName(e.target.value)}
                                                    className="col-span-3"
                                                    placeholder="Project Alpha"
                                                />
                                            </div>
                                        </div>
                                        <DialogFooter>
                                            <Button type="submit" onClick={handleCreateProject}>Create Project</Button>
                                        </DialogFooter>
                                    </DialogContent>
                                </Dialog>
                            )}
                        </div>

                        {/* Project Detail View */}
                        {activeProject && (
                            <Card className="h-full shadow-sm animate-in fade-in slide-in-from-bottom-4 duration-500">
                                <CardHeader className="flex flex-row items-center justify-between border-b border-slate-100 bg-slate-50/30">
                                    <div>
                                        <CardTitle>Project Files</CardTitle>
                                        <CardDescription>Files dedicated to {activeProject.name}</CardDescription>
                                    </div>
                                    <div className="relative">
                                        <input
                                            type="file"
                                            ref={fileInputRef}
                                            className="hidden"
                                            onChange={handleFileUpload}
                                        />
                                        <Button className="gap-2 shadow-sm" onClick={() => fileInputRef.current?.click()}>
                                            <Upload className="h-4 w-4" /> Upload to Project
                                        </Button>
                                    </div>
                                </CardHeader>
                                <CardContent className="p-6">
                                    <ScrollArea className="h-[calc(100vh-300px)]">
                                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 pb-4">
                                            {files.map((file: any, i: number) => (
                                                <Card key={i} className="group hover:shadow-lg transition-all border-slate-200 dark:border-slate-800 hover:border-blue-300 cursor-pointer">
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
                                                            <p className="font-semibold text-slate-900 dark:text-slate-100 truncate" title={file.originalName}>{file.originalName}</p>
                                                            <div className="flex items-center justify-between mt-2 text-xs text-slate-500 dark:text-slate-400">
                                                                <span>{(file.size / 1024).toFixed(0)} KB</span>
                                                                <span>{new Date(file.createdAt).toLocaleDateString()}</span>
                                                            </div>
                                                        </div>
                                                    </CardContent>
                                                </Card>
                                            ))}
                                        </div>
                                        {files.length === 0 && (
                                            <div className="flex flex-col items-center justify-center h-[400px] text-slate-400 border-2 border-dashed border-slate-200 dark:border-slate-800 rounded-xl bg-slate-50/50 dark:bg-slate-900/50">
                                                <div className="h-20 w-20 bg-white dark:bg-slate-800 rounded-full flex items-center justify-center shadow-sm mb-4">
                                                    <Upload className="h-8 w-8 text-blue-500" />
                                                </div>
                                                <h3 className="text-lg font-medium text-slate-900 dark:text-slate-100">No files in this project</h3>
                                                <p className="text-slate-500 dark:text-slate-400 mt-1 mb-4">Upload files to get started</p>
                                                <Button variant="outline" onClick={() => fileInputRef.current?.click()}>
                                                    Select File
                                                </Button>
                                            </div>
                                        )}
                                    </ScrollArea>
                                </CardContent>
                            </Card>
                        )}

                        {/* Dashboard View */}
                        {
                            activeTab === 'dashboard' && !activeProject && (
                                <DashboardOverview
                                    files={files}
                                    meetings={meetings}
                                    projects={projects}
                                    setActiveProject={setActiveProject}
                                    handleDeleteProject={handleDeleteProject}
                                    setActiveTab={setActiveTab}
                                />
                            )
                        }

                        {/* Drive View */}
                        {
                            activeTab === 'drive' && !activeProject && (
                                <FileManager
                                    files={files}
                                    handleFileUpload={handleFileUpload}
                                    handleDeleteFile={handleDeleteFile}
                                    fileInputRef={fileInputRef}
                                />
                            )
                        }

                        {/* Meetings View */}
                        {
                            activeTab === 'meetings' && !activeProject && (
                                <MeetingScheduler
                                    meetings={meetings}
                                    handleDeleteMeeting={handleDeleteMeeting}
                                    inputMode={inputMode}
                                    setInputMode={setInputMode}
                                    transcript={transcript}
                                    setTranscript={setTranscript}
                                    isRecording={isRecording}
                                    recordingTime={recordingTime}
                                    toggleRecording={toggleRecording}
                                    handleGenerateMinutes={handleGenerateMinutes}
                                    isGenerating={isGenerating}
                                    formatTime={formatTime}
                                />
                            )
                        }
                    </div>
                </main >
            </div >
        </div >
    );
}
