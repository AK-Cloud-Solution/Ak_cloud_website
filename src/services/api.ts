const wait = (ms = 260) => new Promise(resolve => setTimeout(resolve, ms));
const read = <T,>(key: string, fallback: T): T => {
    try { return JSON.parse(localStorage.getItem(key) || '') as T; } catch { return fallback; }
};
const write = (key: string, value: unknown) => localStorage.setItem(key, JSON.stringify(value));
const id = () => `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;

const starterProjects = [
    { _id: 'project-orbit', name: 'Project Orbit', description: 'Customer platform modernization', createdAt: new Date().toISOString() },
    { _id: 'project-nova', name: 'Nova Analytics', description: 'Realtime intelligence workspace', createdAt: new Date(Date.now() - 86400000 * 3).toISOString() },
];

export const api = {
    uploadFile: async (file: File, projectId?: string) => {
        await wait();
        const files = read<any[]>('akcloud_demo_files', []);
        const record = { _id: id(), originalName: file.name, filename: file.name, mimeType: file.type || 'application/octet-stream', size: file.size, project: projectId, createdAt: new Date().toISOString() };
        write('akcloud_demo_files', [record, ...files]);
        return record;
    },
    getFiles: async (projectId?: string) => {
        await wait(120);
        const files = read<any[]>('akcloud_demo_files', []);
        return projectId ? files.filter(file => file.project === projectId) : files;
    },
    deleteFile: async (fileId: string) => {
        await wait();
        write('akcloud_demo_files', read<any[]>('akcloud_demo_files', []).filter(file => file._id !== fileId));
        return { message: 'File deleted' };
    },
    generateMinutes: async (transcript: string) => {
        await wait(850);
        const sentences = transcript.split(/[.!?\n]/).map(s => s.trim()).filter(Boolean);
        const actions = sentences.filter(s => /\b(will|todo|action|need to|should|must)\b/i.test(s));
        return { summary: `${sentences.slice(0, 3).join('. ')}${sentences.length ? '.' : ''}`, actionItems: actions.length ? actions : ['Review the discussion and confirm next steps.'] };
    },
    saveMeeting: async (data: any) => {
        await wait();
        const meetings = read<any[]>('akcloud_demo_meetings', []);
        const record = { ...data, _id: id(), createdAt: new Date().toISOString() };
        write('akcloud_demo_meetings', [record, ...meetings]);
        return record;
    },
    getMeetings: async () => { await wait(120); return read<any[]>('akcloud_demo_meetings', []); },
    deleteMeeting: async (meetingId: string) => {
        await wait();
        write('akcloud_demo_meetings', read<any[]>('akcloud_demo_meetings', []).filter(meeting => meeting._id !== meetingId));
        return { message: 'Meeting deleted' };
    },
    createProject: async (name: string) => {
        await wait();
        const projects = read<any[]>('akcloud_demo_projects', starterProjects);
        const record = { _id: id(), name, description: 'New cloud workspace', createdAt: new Date().toISOString() };
        write('akcloud_demo_projects', [record, ...projects]);
        return record;
    },
    getProjects: async () => {
        await wait(160);
        const projects = read<any[]>('akcloud_demo_projects', starterProjects);
        if (!localStorage.getItem('akcloud_demo_projects')) write('akcloud_demo_projects', projects);
        return projects;
    },
    deleteProject: async (projectId: string) => {
        await wait();
        write('akcloud_demo_projects', read<any[]>('akcloud_demo_projects', starterProjects).filter(project => project._id !== projectId));
        return { message: 'Project deleted' };
    },
};
