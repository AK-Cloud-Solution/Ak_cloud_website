import { Lock, UserPlus } from "lucide-react";
import { Button } from "./ui/button";

interface RestrictedAccessProps {
  onLoginClick: () => void;
  onRegisterClick: () => void;
}

export function RestrictedAccess({ onLoginClick, onRegisterClick }: RestrictedAccessProps) {
  return (
    <section className="py-20 px-4 bg-gradient-to-b from-slate-50 to-white">
      <div className="max-w-3xl mx-auto text-center">
        <div className="inline-flex items-center justify-center w-20 h-20 bg-amber-100 rounded-full mb-6">
          <Lock className="h-10 w-10 text-amber-600" />
        </div>
        
        <h2 className="text-amber-900 mb-4">Access Restricted</h2>
        <p className="text-slate-600 mb-8 max-w-xl mx-auto">
          This content is only available to registered users. Please log in or create an account to access our full range of cloud services and tools.
        </p>

        <div className="flex flex-wrap justify-center gap-4">
          <Button 
            size="lg"
            onClick={onLoginClick}
            className="bg-blue-600 hover:bg-blue-700"
          >
            Login to Continue
          </Button>
          <Button 
            size="lg"
            variant="outline"
            onClick={onRegisterClick}
            className="border-blue-600 text-blue-600 hover:bg-blue-50"
          >
            <UserPlus className="mr-2 h-5 w-5" />
            Create Account
          </Button>
        </div>

        <div className="mt-12 p-6 bg-blue-50 rounded-lg border border-blue-100">
          <h3 className="text-blue-900 mb-2">Why Register?</h3>
          <ul className="text-left text-sm text-slate-600 space-y-2 max-w-md mx-auto">
            <li>✓ Access to all cloud tools and services</li>
            <li>✓ View detailed information about our offerings</li>
            <li>✓ Secure dashboard based on your role</li>
            <li>✓ Join our DevOps community</li>
          </ul>
        </div>
      </div>
    </section>
  );
}
