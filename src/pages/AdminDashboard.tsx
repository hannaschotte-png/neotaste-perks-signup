import { useEffect, useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useToast } from "@/hooks/use-toast";
import { LogOut, Search, StickyNote, Filter } from "lucide-react";

interface Lead {
  id: string;
  company_name: string;
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  employee_count: number;
  plan_type: string;
  message: string | null;
  status: string;
  notes: string | null;
  created_at: string;
}

const STATUS_OPTIONS = [
  { value: "neu", label: "Neu", color: "bg-blue-500/20 text-blue-400 border-blue-500/30" },
  { value: "kontaktiert", label: "Kontaktiert", color: "bg-yellow-500/20 text-yellow-400 border-yellow-500/30" },
  { value: "in_verhandlung", label: "In Verhandlung", color: "bg-orange-500/20 text-orange-400 border-orange-500/30" },
  { value: "abgeschlossen", label: "Abgeschlossen", color: "bg-primary/20 text-primary border-primary/30" },
  { value: "abgelehnt", label: "Abgelehnt", color: "bg-red-500/20 text-red-400 border-red-500/30" },
];

const AdminDashboard = () => {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("alle");
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);
  const [editNotes, setEditNotes] = useState("");
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    const checkAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        navigate("/admin/login");
        return;
      }
      fetchLeads();
    };
    checkAuth();
  }, [navigate]);

  const fetchLeads = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("corporate_leads")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      toast({ title: "Fehler", description: "Leads konnten nicht geladen werden.", variant: "destructive" });
    } else {
      setLeads((data as Lead[]) || []);
    }
    setLoading(false);
  };

  const updateStatus = async (id: string, status: string) => {
    const { error } = await supabase.from("corporate_leads").update({ status }).eq("id", id);
    if (error) {
      toast({ title: "Fehler", description: "Status konnte nicht aktualisiert werden.", variant: "destructive" });
    } else {
      setLeads((prev) => prev.map((l) => (l.id === id ? { ...l, status } : l)));
      toast({ title: "Aktualisiert", description: "Status wurde gespeichert." });
    }
  };

  const saveNotes = async () => {
    if (!selectedLead) return;
    const { error } = await supabase.from("corporate_leads").update({ notes: editNotes || null }).eq("id", selectedLead.id);
    if (error) {
      toast({ title: "Fehler", description: "Notizen konnten nicht gespeichert werden.", variant: "destructive" });
    } else {
      setLeads((prev) => prev.map((l) => (l.id === selectedLead.id ? { ...l, notes: editNotes || null } : l)));
      setSelectedLead(null);
      toast({ title: "Gespeichert", description: "Notizen wurden aktualisiert." });
    }
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate("/admin/login");
  };

  const filteredLeads = useMemo(() => {
    return leads.filter((lead) => {
      const matchesSearch = search === "" || [lead.company_name, lead.first_name, lead.last_name, lead.email].some((f) => f.toLowerCase().includes(search.toLowerCase()));
      const matchesStatus = statusFilter === "alle" || lead.status === statusFilter;
      return matchesSearch && matchesStatus;
    });
  }, [leads, search, statusFilter]);

  const getStatusBadge = (status: string) => {
    const s = STATUS_OPTIONS.find((o) => o.value === status) || STATUS_OPTIONS[0];
    return <Badge variant="outline" className={s.color}>{s.label}</Badge>;
  };

  const formatDate = (d: string) => new Date(d).toLocaleDateString("de-DE", { day: "2-digit", month: "2-digit", year: "numeric", hour: "2-digit", minute: "2-digit" });

  return (
    <div className="min-h-screen mesh-gradient p-4 md:p-8">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-extrabold">CRM – Leads</h1>
            <p className="text-muted-foreground">{filteredLeads.length} von {leads.length} Leads</p>
          </div>
          <Button variant="outline" onClick={handleLogout} className="gap-2">
            <LogOut className="w-4 h-4" /> Abmelden
          </Button>
        </div>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input placeholder="Suche nach Firma, Name, E-Mail..." value={search} onChange={(e) => setSearch(e.target.value)} className="pl-10 bg-secondary border-border" />
          </div>
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-full sm:w-48 bg-secondary border-border">
              <Filter className="w-4 h-4 mr-2" />
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="alle">Alle Status</SelectItem>
              {STATUS_OPTIONS.map((s) => (
                <SelectItem key={s.value} value={s.value}>{s.label}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Table */}
        <div className="glass-card rounded-2xl overflow-hidden">
          {loading ? (
            <div className="p-12 text-center text-muted-foreground">Lade Leads...</div>
          ) : filteredLeads.length === 0 ? (
            <div className="p-12 text-center text-muted-foreground">Keine Leads gefunden.</div>
          ) : (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow className="border-border">
                    <TableHead>Datum</TableHead>
                    <TableHead>Firma</TableHead>
                    <TableHead>Kontakt</TableHead>
                    <TableHead>E-Mail</TableHead>
                    <TableHead>Telefon</TableHead>
                    <TableHead>MA</TableHead>
                    <TableHead>Plan</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Notizen</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredLeads.map((lead) => (
                    <TableRow key={lead.id} className="border-border hover:bg-secondary/30">
                      <TableCell className="whitespace-nowrap text-xs text-muted-foreground">{formatDate(lead.created_at)}</TableCell>
                      <TableCell className="font-semibold">{lead.company_name}</TableCell>
                      <TableCell>{lead.first_name} {lead.last_name}</TableCell>
                      <TableCell className="text-sm">{lead.email}</TableCell>
                      <TableCell className="text-sm">{lead.phone}</TableCell>
                      <TableCell className="text-center">{lead.employee_count}</TableCell>
                      <TableCell>
                        <Badge variant="outline" className="border-primary/30 text-primary">
                          {lead.plan_type === "monthly" ? "Monatlich" : "Jährlich"}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Select value={lead.status} onValueChange={(v) => updateStatus(lead.id, v)}>
                          <SelectTrigger className="h-8 w-36 text-xs bg-transparent border-none p-0">
                            {getStatusBadge(lead.status)}
                          </SelectTrigger>
                          <SelectContent>
                            {STATUS_OPTIONS.map((s) => (
                              <SelectItem key={s.value} value={s.value}>{s.label}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </TableCell>
                      <TableCell>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8"
                          onClick={() => { setSelectedLead(lead); setEditNotes(lead.notes || ""); }}
                        >
                          <StickyNote className={`w-4 h-4 ${lead.notes ? "text-primary" : "text-muted-foreground"}`} />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </div>
      </div>

      {/* Notes Dialog */}
      <Dialog open={!!selectedLead} onOpenChange={(open) => !open && setSelectedLead(null)}>
        <DialogContent className="bg-card border-border">
          <DialogHeader>
            <DialogTitle>Notizen – {selectedLead?.company_name}</DialogTitle>
          </DialogHeader>
          {selectedLead?.message && (
            <div className="bg-secondary/50 rounded-lg p-3 text-sm">
              <p className="text-xs text-muted-foreground mb-1 font-semibold">Nachricht des Kunden:</p>
              <p>{selectedLead.message}</p>
            </div>
          )}
          <Textarea
            value={editNotes}
            onChange={(e) => setEditNotes(e.target.value)}
            placeholder="Interne Notizen hier eingeben..."
            className="min-h-[120px] bg-secondary border-border"
          />
          <Button onClick={saveNotes} className="w-full">Notizen speichern</Button>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdminDashboard;
