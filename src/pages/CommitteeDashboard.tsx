import React, { useState } from 'react';
import { useData } from '../data/DataContext';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, XCircle, Clock, FileText, MessageSquare, ChevronDown, ChevronUp, Users, AlertCircle } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '../components/ui/Card';
import { cn } from '../lib/utils';

const CommitteeDashboard: React.FC = () => {
  const { applications, addComment, currentUser, setCommitteeAssessment, users } = useData();
  const committeeMembers = users.filter(u => u.role === 'Committee');
  const queue = applications.filter(a => a.status === 'Committee Review' || a.status === 'Pending');
  const [commentDraft, setCommentDraft] = useState<Record<string,string>>({});
  const [expandedApp, setExpandedApp] = useState<string | null>(null);

  const myId = currentUser?.id;

  const handleAssessmentChange = (appId: string, field: 'publicationIncentiveApplicable' | 'conferenceRegistrationChargeApplicable' | 'decision', value: any) => {
    if (!myId) return;
    const payload: any = { committeeUserId: myId };
    if (field === 'decision') payload.decision = value; else payload[field] = value;
    if (field === 'decision' && value) payload.decidedAt = new Date().toISOString();
    setCommitteeAssessment(appId, payload);
  };

  const toggleExpand = (id: string) => {
    setExpandedApp(expandedApp === id ? null : id);
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Committee Review</h1>
        <p className="text-muted-foreground mt-1">
          Review applications and provide your assessment.
        </p>
      </div>

      <div className="grid gap-6">
        {queue.length === 0 ? (
          <Card className="bg-muted/50 border-dashed">
            <CardContent className="flex flex-col items-center justify-center py-12 text-center">
              <CheckCircle2 className="h-12 w-12 text-muted-foreground mb-4" />
              <h3 className="text-lg font-semibold">All caught up!</h3>
              <p className="text-muted-foreground">No applications currently pending committee review.</p>
            </CardContent>
          </Card>
        ) : (
          queue.map(app => {
            const assessments = app.committeeAssessments || [];
            const myAssessment = assessments.find(a => a.committeeUserId === myId);
            const approvals = assessments.filter(a => a.decision === 'Approved').length;
            const denials = assessments.filter(a => a.decision === 'Denied').length;
            const totalNeeded = committeeMembers.length;
            const allDecided = approvals + denials === totalNeeded;

            return (
              <motion.div
                key={app.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                layout
              >
                <Card className={cn("overflow-hidden transition-all hover:shadow-md border-l-4", 
                  app.status === 'Committee Review' ? "border-l-primary" : "border-l-muted"
                )}>
                  <div className="p-6">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <h3 className="text-lg font-semibold">{app.title || '(Untitled)'}</h3>
                          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary/10 text-primary border border-primary/20">
                            {app.status}
                          </span>
                        </div>
                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                          <span className="flex items-center gap-1">
                            <Users className="w-3 h-3" /> {app.applicantName}
                          </span>
                          <span>•</span>
                          <span>{app.applicationType}</span>
                          <span>•</span>
                          <span>{app.publicationType}</span>
                        </div>
                      </div>
                      
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        onClick={() => toggleExpand(app.id)}
                        className="gap-2"
                      >
                        {expandedApp === app.id ? "Hide Review" : "Start Review"}
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
                          <div className="pt-6 mt-6 border-t grid lg:grid-cols-3 gap-8">
                            {/* Application Details */}
                            <div className="lg:col-span-1 space-y-4">
                              <h4 className="font-medium text-sm text-muted-foreground uppercase tracking-wider">Application Details</h4>
                              <dl className="space-y-3 text-sm">
                                <div>
                                  <dt className="font-medium text-muted-foreground">Journal / Conference</dt>
                                  <dd>{app.journalOrConference || '—'}</dd>
                                </div>
                                <div>
                                  <dt className="font-medium text-muted-foreground">Quartile</dt>
                                  <dd>{app.quartile || '—'}</dd>
                                </div>
                                <div>
                                  <dt className="font-medium text-muted-foreground">Impact Factor</dt>
                                  <dd>{app.impactFactor || '—'}</dd>
                                </div>
                                <div>
                                  <dt className="font-medium text-muted-foreground">Indexing</dt>
                                  <dd>{app.indexingType || '—'}</dd>
                                </div>
                                <div>
                                  <dt className="font-medium text-muted-foreground">Publisher</dt>
                                  <dd>{app.publisher || '—'}</dd>
                                </div>
                                <div>
                                  <dt className="font-medium text-muted-foreground">Place & Date</dt>
                                  <dd>{app.conferencePlaceDate || '—'}</dd>
                                </div>
                                <div>
                                  <dt className="font-medium text-muted-foreground">Registration Fee</dt>
                                  <dd>{app.registrationFee || '—'}</dd>
                                </div>
                              </dl>
                            </div>

                            {/* Assessment Form */}
                            <div className="lg:col-span-2 space-y-6">
                              <div className="bg-muted/30 rounded-xl p-6 border space-y-6">
                                <h4 className="font-medium text-sm text-muted-foreground uppercase tracking-wider flex items-center gap-2">
                                  <FileText className="w-4 h-4" /> Your Assessment
                                </h4>
                                
                                <div className="grid sm:grid-cols-2 gap-6">
                                  <div className="space-y-3">
                                    <label className="text-sm font-medium">Publication Incentive Applicable?</label>
                                    <div className="flex gap-2">
                                      <Button
                                        size="sm"
                                        variant={myAssessment?.publicationIncentiveApplicable === true ? "default" : "outline"}
                                        onClick={() => handleAssessmentChange(app.id, 'publicationIncentiveApplicable', true)}
                                        className="flex-1"
                                      >
                                        Yes
                                      </Button>
                                      <Button
                                        size="sm"
                                        variant={myAssessment?.publicationIncentiveApplicable === false ? "default" : "outline"}
                                        onClick={() => handleAssessmentChange(app.id, 'publicationIncentiveApplicable', false)}
                                        className="flex-1"
                                      >
                                        No
                                      </Button>
                                    </div>
                                  </div>

                                  <div className="space-y-3">
                                    <label className="text-sm font-medium">Conf. Reg. Charge Applicable?</label>
                                    <div className="flex gap-2">
                                      <Button
                                        size="sm"
                                        variant={myAssessment?.conferenceRegistrationChargeApplicable === true ? "default" : "outline"}
                                        onClick={() => handleAssessmentChange(app.id, 'conferenceRegistrationChargeApplicable', true)}
                                        className="flex-1"
                                      >
                                        Yes
                                      </Button>
                                      <Button
                                        size="sm"
                                        variant={myAssessment?.conferenceRegistrationChargeApplicable === false ? "default" : "outline"}
                                        onClick={() => handleAssessmentChange(app.id, 'conferenceRegistrationChargeApplicable', false)}
                                        className="flex-1"
                                      >
                                        No
                                      </Button>
                                    </div>
                                  </div>
                                </div>

                                <div className="pt-4 border-t">
                                  <label className="text-sm font-medium block mb-3">Final Decision</label>
                                  <div className="flex gap-3">
                                    <Button
                                      variant={myAssessment?.decision === 'Approved' ? "default" : "outline"}
                                      className={cn("flex-1 gap-2", myAssessment?.decision === 'Approved' && "bg-emerald-600 hover:bg-emerald-700")}
                                      onClick={() => handleAssessmentChange(app.id, 'decision', 'Approved')}
                                    >
                                      <CheckCircle2 className="w-4 h-4" /> Approve
                                    </Button>
                                    <Button
                                      variant={myAssessment?.decision === 'Denied' ? "default" : "outline"}
                                      className={cn("flex-1 gap-2", myAssessment?.decision === 'Denied' && "bg-rose-600 hover:bg-rose-700")}
                                      onClick={() => handleAssessmentChange(app.id, 'decision', 'Denied')}
                                    >
                                      <XCircle className="w-4 h-4" /> Deny
                                    </Button>
                                  </div>
                                </div>
                              </div>

                              {/* Status & Comments */}
                              <div className="space-y-4">
                                <div className="flex items-center justify-between text-sm bg-secondary/50 p-3 rounded-lg">
                                  <div className="flex items-center gap-2">
                                    <Users className="w-4 h-4 text-muted-foreground" />
                                    <span className="font-medium">Committee Consensus:</span>
                                    <span className="text-emerald-600 font-medium">{approvals} Approved</span>
                                    <span className="text-muted-foreground">/</span>
                                    <span className="text-rose-600 font-medium">{denials} Denied</span>
                                    <span className="text-muted-foreground">({totalNeeded} members total)</span>
                                  </div>
                                  {allDecided && <span className="text-primary font-medium flex items-center gap-1"><CheckCircle2 className="w-3 h-3" /> Complete</span>}
                                </div>

                                <div className="space-y-2">
                                  <h4 className="font-medium text-sm text-muted-foreground uppercase tracking-wider">Comments</h4>
                                  <div className="bg-muted/30 rounded-lg p-4 space-y-3 max-h-[200px] overflow-y-auto">
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
                                    <input
                                      value={commentDraft[app.id] || ""}
                                      onChange={(e) => setCommentDraft((d) => ({ ...d, [app.id]: e.target.value }))}
                                      placeholder="Add a comment..."
                                      className="flex-1 h-9 rounded-md border border-input bg-background px-3 py-1 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                                    />
                                    <Button
                                      size="sm"
                                      onClick={() => {
                                        const msg = commentDraft[app.id];
                                        if (msg) {
                                          addComment(app.id, msg);
                                          setCommentDraft((d) => ({ ...d, [app.id]: "" }));
                                        }
                                      }}
                                    >
                                      Post
                                    </Button>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </Card>
              </motion.div>
            );
          })
        )}
      </div>
    </div>
  );
};

export default CommitteeDashboard;
