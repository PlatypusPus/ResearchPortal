import React, { useState } from "react";
import { useData } from "../data/DataContext";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, FileText, Calendar, BookOpen, DollarSign, Upload, MessageSquare, Download, ChevronDown, ChevronUp, CheckCircle2, Clock, XCircle, Send } from "lucide-react";
import { Button } from "../components/ui/Button";
import { Input } from "../components/ui/Input";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "../components/ui/Card";
import { cn } from "../lib/utils";
import Timeline from "../components/Timeline";

const ApplicantDashboard: React.FC = () => {
  const { applications, currentUser, submitApplication, addComment } = useData();
  const myApps = applications.filter((a) => a.applicantName === currentUser?.name);
  const [showForm, setShowForm] = useState(false);
  const [submittedMsg, setSubmittedMsg] = useState<string | null>(null);
  const [commentDraft, setCommentDraft] = useState<Record<string, string>>({});
  const [expandedApp, setExpandedApp] = useState<string | null>(null);
  
  const [form, setForm] = useState({
    title: "",
    applicationType: "",
    publicationType: "",
    journalOrConference: "",
    quartile: "",
    impactFactor: "",
    indexingType: "",
    publisher: "",
    conferencePlaceDate: "",
    registrationFee: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    submitApplication(form);
    setSubmittedMsg("Application Submitted Successfully");
    setForm({
      title: "",
      applicationType: "",
      publicationType: "",
      journalOrConference: "",
      quartile: "",
      impactFactor: "",
      indexingType: "",
      publisher: "",
      conferencePlaceDate: "",
      registrationFee: "",
    });
    setShowForm(false);
    setTimeout(() => setSubmittedMsg(null), 3000);
  };

  const toggleExpand = (id: string) => {
    setExpandedApp(expandedApp === id ? null : id);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Approved": return "bg-emerald-100 text-emerald-700 border-emerald-200";
      case "Denied": return "bg-rose-100 text-rose-700 border-rose-200";
      case "Pending": return "bg-amber-100 text-amber-700 border-amber-200";
      default: return "bg-slate-100 text-slate-700 border-slate-200";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "Approved": return <CheckCircle2 className="w-4 h-4" />;
      case "Denied": return <XCircle className="w-4 h-4" />;
      case "Pending": return <Clock className="w-4 h-4" />;
      default: return <FileText className="w-4 h-4" />;
    }
  };

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
          <p className="text-muted-foreground mt-1">
            Manage your research grant applications and track their status.
          </p>
        </div>
        <Button onClick={() => setShowForm(!showForm)} size="lg" className="gap-2">
          {showForm ? <XCircle className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
          {showForm ? "Cancel Application" : "New Application"}
        </Button>
      </div>

      <AnimatePresence>
        {submittedMsg && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="bg-emerald-50 border border-emerald-200 text-emerald-700 px-4 py-3 rounded-lg flex items-center gap-2"
          >
            <CheckCircle2 className="w-5 h-5" />
            {submittedMsg}
          </motion.div>
        )}

        {showForm && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden"
          >
            <Card className="border-primary/20 shadow-lg">
              <CardHeader>
                <CardTitle>New Grant Application</CardTitle>
                <CardDescription>Fill in the details below to submit a new application for review.</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2 md:col-span-2">
                    <label className="text-sm font-medium">Title of Publication</label>
                    <Input
                      name="title"
                      value={form.title}
                      onChange={handleChange}
                      placeholder="Enter the full title"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium">Application Type</label>
                    <select
                      name="applicationType"
                      value={form.applicationType}
                      onChange={handleChange}
                      className="flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                      required
                    >
                      <option value="">Select Type</option>
                      <option>Publication Incentive</option>
                      <option>Conference Registration</option>
                      <option>Journal Publication Support</option>
                    </select>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium">Publication Type</label>
                    <select
                      name="publicationType"
                      value={form.publicationType}
                      onChange={handleChange}
                      className="flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                      required
                    >
                      <option value="">Select Category</option>
                      <option>National</option>
                      <option>International</option>
                      <option>Journal</option>
                      <option>Conference Proceedings</option>
                      <option>Other</option>
                    </select>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium">Journal / Conference Name</label>
                    <Input
                      name="journalOrConference"
                      value={form.journalOrConference}
                      onChange={handleChange}
                      placeholder="e.g. IEEE Transactions"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium">Quartile</label>
                    <Input
                      name="quartile"
                      value={form.quartile}
                      onChange={handleChange}
                      placeholder="e.g. Q1, Q2"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium">Impact Factor</label>
                    <Input
                      name="impactFactor"
                      value={form.impactFactor}
                      onChange={handleChange}
                      placeholder="e.g. 4.5"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium">Indexing Type</label>
                    <Input
                      name="indexingType"
                      value={form.indexingType}
                      onChange={handleChange}
                      placeholder="e.g. Scopus, Web of Science"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium">Publisher</label>
                    <Input
                      name="publisher"
                      value={form.publisher}
                      onChange={handleChange}
                      placeholder="e.g. Elsevier, Springer"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium">Place & Date</label>
                    <div className="relative">
                      <Calendar className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                      <Input
                        name="conferencePlaceDate"
                        value={form.conferencePlaceDate}
                        onChange={handleChange}
                        className="pl-9"
                        placeholder="Location and Date"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium">Registration Fee</label>
                    <div className="relative">
                      <DollarSign className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                      <Input
                        name="registrationFee"
                        value={form.registrationFee}
                        onChange={handleChange}
                        className="pl-9"
                        placeholder="Amount"
                      />
                    </div>
                  </div>

                  <div className="md:col-span-2 space-y-4 pt-4 border-t">
                     <div className="flex flex-wrap gap-4">
                        <Button type="button" variant="outline" className="gap-2">
                          <Upload className="w-4 h-4" /> Upload Signature
                        </Button>
                        <Button type="button" variant="outline" className="gap-2">
                          <Upload className="w-4 h-4" /> Attachment 1
                        </Button>
                        <Button type="button" variant="outline" className="gap-2">
                          <Upload className="w-4 h-4" /> Attachment 2
                        </Button>
                     </div>
                  </div>

                  <div className="md:col-span-2 flex justify-end pt-4">
                    <Button type="submit" size="lg" className="w-full md:w-auto">
                      Submit Application
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="grid gap-4">
        {myApps.length === 0 ? (
          <Card className="bg-muted/50 border-dashed">
            <CardContent className="flex flex-col items-center justify-center py-12 text-center">
              <FileText className="h-12 w-12 text-muted-foreground mb-4" />
              <h3 className="text-lg font-semibold">No applications yet</h3>
              <p className="text-muted-foreground mb-4">Start by creating a new grant application.</p>
              <Button onClick={() => setShowForm(true)}>Create Application</Button>
            </CardContent>
          </Card>
        ) : (
          myApps.map((app) => (
            <motion.div
              key={app.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              layout
            >
              <Card className="overflow-hidden transition-all hover:shadow-md">
                <div className="p-6">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <h3 className="text-lg font-semibold">{app.title || "Untitled Application"}</h3>
                        <span className={cn("inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium border", getStatusColor(app.status))}>
                          {getStatusIcon(app.status)}
                          {app.status}
                        </span>
                      </div>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <BookOpen className="w-3 h-3" /> {app.applicationType}
                        </span>
                        <span>•</span>
                        <span>{app.publicationType}</span>
                        <span>•</span>
                        <span>Submitted {new Date(app.createdAt).toLocaleDateString()}</span>
                      </div>
                    </div>
                    
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      onClick={() => toggleExpand(app.id)}
                      className="gap-2"
                    >
                      {expandedApp === app.id ? "Hide Details" : "View Details"}
                      {expandedApp === app.id ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                    </Button>
                  </div>

                  <AnimatePresence>
                    {expandedApp === app.id && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="overflow-hidden"
                      >
                        <div className="pt-6 mt-6 border-t grid md:grid-cols-2 gap-6">
                          <div className="space-y-4">
                            <h4 className="font-medium text-sm text-muted-foreground uppercase tracking-wider">Application Details</h4>
                            <dl className="grid grid-cols-1 gap-x-4 gap-y-4 sm:grid-cols-2">
                              <div className="sm:col-span-1">
                                <dt className="text-sm font-medium text-muted-foreground">Journal/Conference</dt>
                                <dd className="mt-1 text-sm">{app.journalOrConference || "—"}</dd>
                              </div>
                              <div className="sm:col-span-1">
                                <dt className="text-sm font-medium text-muted-foreground">Quartile</dt>
                                <dd className="mt-1 text-sm">{app.quartile || "—"}</dd>
                              </div>
                              <div className="sm:col-span-1">
                                <dt className="text-sm font-medium text-muted-foreground">Impact Factor</dt>
                                <dd className="mt-1 text-sm">{app.impactFactor || "—"}</dd>
                              </div>
                              <div className="sm:col-span-1">
                                <dt className="text-sm font-medium text-muted-foreground">Indexing</dt>
                                <dd className="mt-1 text-sm">{app.indexingType || "—"}</dd>
                              </div>
                              <div className="sm:col-span-1">
                                <dt className="text-sm font-medium text-muted-foreground">Publisher</dt>
                                <dd className="mt-1 text-sm">{app.publisher || "—"}</dd>
                              </div>
                              <div className="sm:col-span-1">
                                <dt className="text-sm font-medium text-muted-foreground">Fee</dt>
                                <dd className="mt-1 text-sm">{app.registrationFee || "—"}</dd>
                              </div>
                            </dl>
                          </div>

                          <div className="space-y-4">
                            <h4 className="font-medium text-sm text-muted-foreground uppercase tracking-wider">Comments & Actions</h4>
                            <div className="bg-muted/30 rounded-lg p-4 space-y-4 max-h-[200px] overflow-y-auto">
                              {app.comments.length === 0 ? (
                                <p className="text-sm text-muted-foreground italic">No comments yet.</p>
                              ) : (
                                app.comments.map((c) => (
                                  <div key={c.id} className="bg-background p-3 rounded border text-sm shadow-sm">
                                    <div className="font-medium text-xs text-primary mb-1">{c.role}</div>
                                    <p>{c.message}</p>
                                  </div>
                                ))
                              )}
                            </div>
                            
                            <div className="flex gap-2">
                              <Input
                                value={commentDraft[app.id] || ""}
                                onChange={(e) => setCommentDraft((d) => ({ ...d, [app.id]: e.target.value }))}
                                placeholder="Type a comment..."
                                className="flex-1"
                              />
                              <Button
                                size="icon"
                                onClick={() => {
                                  const msg = commentDraft[app.id];
                                  if (msg) {
                                    addComment(app.id, msg);
                                    setCommentDraft((d) => ({ ...d, [app.id]: "" }));
                                  }
                                }}
                              >
                                <Send className="w-4 h-4" />
                              </Button>
                            </div>
                            
                            <div className="pt-4 border-t">
                              <h4 className="font-medium text-sm text-muted-foreground uppercase tracking-wider mb-4">Application Status</h4>
                              <Timeline application={app} />
                            </div>
                            
                            <Button variant="outline" size="sm" className="w-full gap-2 mt-4">
                              <Download className="w-4 h-4" /> Download Application PDF
                            </Button>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </Card>
            </motion.div>
          ))
        )}
      </div>
    </div>
  );
};

export default ApplicantDashboard;
