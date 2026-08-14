import {
    Moon,
    Bell,
    CreditCard,
    HelpCircle,
    LogOut
} from 'lucide-react';
import { Button } from '../ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { Separator } from '../ui/separator';
import { Switch } from "../ui/switch";
import { toast } from 'sonner';

interface SettingsPanelProps {
    user: any;
    theme: string;
    setTheme: (theme: any) => void;
    emailNotifications: boolean;
    setEmailNotifications: (enabled: boolean) => void;
    files: any[];
    onExit?: () => void;
}

export function SettingsPanel({
    user,
    theme,
    setTheme,
    emailNotifications,
    setEmailNotifications,
    files,
    onExit
}: SettingsPanelProps) {
    return (
        <div className="py-6 space-y-6">
            {/* Profile Section */}
            <div className="flex items-center gap-4 p-4 bg-slate-50 dark:bg-slate-900 rounded-lg border border-slate-100 dark:border-slate-800">
                <Avatar className="h-12 w-12 ring-2 ring-white dark:ring-slate-800 shadow-sm">
                    <AvatarImage src={`https://ui-avatars.com/api/?name=${user?.username}&background=2563eb&color=fff`} />
                    <AvatarFallback>AK</AvatarFallback>
                </Avatar>
                <div>
                    <p className="font-medium text-slate-900 dark:text-slate-100">{user?.username}</p>
                    <p className="text-sm text-slate-500 dark:text-slate-400">{user?.email || 'user@example.com'}</p>
                </div>
            </div>

            <Separator />

            {/* Preferences */}
            <div className="space-y-4">
                <h4 className="text-sm font-medium text-slate-900 dark:text-slate-100">Preferences</h4>
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-slate-600 dark:text-slate-400">
                        <Moon className="h-4 w-4" />
                        <span className="text-sm">Dark Mode</span>
                    </div>
                    <Switch
                        checked={theme === 'dark'}
                        onCheckedChange={(checked: boolean) => {
                            setTheme(checked ? 'dark' : 'light');
                            toast.success(`Dark mode ${checked ? 'enabled' : 'disabled'}`);
                        }}
                    />
                </div>
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-slate-600 dark:text-slate-400">
                        <Bell className="h-4 w-4" />
                        <span className="text-sm">Email Notifications</span>
                    </div>
                    <Switch
                        checked={emailNotifications}
                        onCheckedChange={(checked) => {
                            setEmailNotifications(checked);
                            toast.success(`Email notifications ${checked ? 'enabled' : 'disabled'}`);
                        }}
                    />
                </div>
            </div>

            <Separator />

            {/* Storage */}
            <div className="space-y-4">
                <h4 className="text-sm font-medium text-slate-900 dark:text-slate-100">Storage Usage</h4>
                <div className="space-y-2">
                    <div className="flex justify-between text-xs text-slate-500 dark:text-slate-400">
                        <span>Used</span>
                        <span>{(files.reduce((acc: number, f: any) => acc + f.size, 0) / (1024 * 1024)).toFixed(2)} MB / 5 GB</span>
                    </div>
                    <div className="h-2 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                        <div
                            className="h-full bg-blue-600 transition-all duration-500"
                            style={{ width: `${Math.min((files.reduce((acc: number, f: any) => acc + f.size, 0) / (1024 * 1024 * 1024 * 5)) * 100, 100)}%` }}
                        />
                    </div>
                </div>
                <Button
                    variant="outline"
                    className="w-full gap-2 text-slate-600 dark:text-slate-400"
                    onClick={() => toast.info('Upgrade plans coming soon!')}
                >
                    <CreditCard className="h-4 w-4" /> Upgrade Plan
                </Button>
            </div>

            <Separator />

            {/* Actions */}
            <div className="space-y-2">
                <Button
                    variant="ghost"
                    className="w-full justify-start gap-2 text-slate-600 dark:text-slate-400"
                    onClick={() => toast.info('Help & Support center is under maintenance. Please contact support@akcloud.com')}
                >
                    <HelpCircle className="h-4 w-4" /> Help & Support
                </Button>
                {onExit && (
                    <Button
                        variant="destructive"
                        className="w-full justify-start gap-2"
                        onClick={onExit}
                    >
                        <LogOut className="h-4 w-4" /> Sign Out
                    </Button>
                )}
            </div>
        </div>
    );
}
