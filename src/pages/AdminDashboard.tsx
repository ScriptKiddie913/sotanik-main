import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Shield, LogOut, Mail, User, MessageSquare, Clock, RefreshCw } from "lucide-react";

interface ContactSubmission {
  id: string;
  name: string;
  email: string;
  query: string;
  created_at: string;
}

const AdminDashboard = () => {
  const [submissions, setSubmissions] = useState<ContactSubmission[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    const { data: { session } } = await supabase.auth.getSession();
    
    if (!session) {
      navigate("/a3dm1necho956");
      return;
    }

    const { data: roleData } = await supabase
      .from("user_roles")
      .select("role")
      .eq("user_id", session.user.id)
      .eq("role", "admin")
      .maybeSingle();

    if (!roleData) {
      await supabase.auth.signOut();
      navigate("/a3dm1necho956");
      return;
    }

    setIsAuthenticated(true);
    fetchSubmissions();
  };

  const fetchSubmissions = async () => {
    setIsLoading(true);
    const { data, error } = await supabase
      .from("contact_submissions")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      toast.error("Failed to fetch submissions");
    } else {
      setSubmissions(data || []);
    }
    setIsLoading(false);
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate("/a3dm1necho956");
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="absolute inset-0 cyber-grid opacity-10" />
      
      <header className="relative border-b border-border/50 bg-card/50 backdrop-blur-xl">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-destructive/20 border border-destructive/50">
              <Shield className="w-5 h-5 text-destructive" />
            </div>
            <div>
              <h1 className="font-mono text-lg font-bold text-foreground">ADMIN CONSOLE</h1>
              <p className="text-xs text-muted-foreground font-mono">SOTANIK AI OPERATIONS</p>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            <Button
              variant="outline"
              size="sm"
              onClick={fetchSubmissions}
              disabled={isLoading}
              className="font-mono"
            >
              <RefreshCw className={`w-4 h-4 mr-2 ${isLoading ? "animate-spin" : ""}`} />
              REFRESH
            </Button>
            <Button
              variant="destructive"
              size="sm"
              onClick={handleLogout}
              className="font-mono"
            >
              <LogOut className="w-4 h-4 mr-2" />
              LOGOUT
            </Button>
          </div>
        </div>
      </header>

      <main className="relative container mx-auto px-4 py-8">
        <div className="mb-8">
          <h2 className="text-2xl font-mono font-bold text-foreground mb-2">Contact Submissions</h2>
          <p className="text-muted-foreground font-mono text-sm">
            Total: {submissions.length} submissions
          </p>
        </div>

        {isLoading ? (
          <div className="flex items-center justify-center py-20">
            <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
          </div>
        ) : submissions.length === 0 ? (
          <div className="text-center py-20 border border-dashed border-border/50 rounded-lg">
            <MessageSquare className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
            <p className="text-muted-foreground font-mono">No submissions yet</p>
          </div>
        ) : (
          <div className="grid gap-4">
            {submissions.map((submission) => (
              <div
                key={submission.id}
                className="bg-card/50 backdrop-blur-sm border border-border/50 rounded-lg p-6 hover:border-primary/30 transition-colors"
              >
                <div className="flex flex-wrap items-start justify-between gap-4 mb-4">
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2 text-primary">
                      <User className="w-4 h-4" />
                      <span className="font-mono font-medium">{submission.name}</span>
                    </div>
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Mail className="w-4 h-4" />
                      <span className="font-mono text-sm">{submission.email}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Clock className="w-4 h-4" />
                    <span className="font-mono text-xs">
                      {new Date(submission.created_at).toLocaleString()}
                    </span>
                  </div>
                </div>
                
                <div className="bg-background/50 rounded p-4 border border-border/30">
                  <p className="text-foreground/90 font-mono text-sm whitespace-pre-wrap">
                    {submission.query}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
};

export default AdminDashboard;
