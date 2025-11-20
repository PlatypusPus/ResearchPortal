import React, { useState } from 'react';
import { useData } from '../data/DataContext';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, FileText, ChevronDown, ChevronUp, Users, DollarSign, Send } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { Card, CardContent } from '../components/ui/Card';
import { cn } from '../lib/utils';

const DeanDashboard: React.FC = () => {
  const { applications, setDeanRecommendation, addComment } = useData();
  const deanQueue = applications.filter(a => a.status === 'Dean Review');
  const [drafts, setDrafts] = useState<Record<string, any>>({});
  const [commentDraft, setCommentDraft] = useState<Record<string,string>>({});
  const [expandedApp, setExpandedApp] = useState<string | null>(null);

  const updateDraft = (id: string, field: string, value: any) => {
    setDrafts(d => ({ ...d, [id]: { ...d[id], [field]: value } }));
  };

  const toggleExpand = (id: string) => {
    setExpandedApp(expandedApp === id ? null : id);
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Dean's Review</h1>
        <p className="text-muted-foreground mt-1">
          Review committee recommendations and propose funding distribution.
        </p>
      </div>

      <div className="grid gap-6">
        {deanQueue.length === 0 ? (
          <Card className="bg-muted/50 border-dashed">
            <CardContent className="flex flex-col items-center justify-center py-12 text-center">
              <CheckCircle2 className="h-12 w-12 text-muted-foreground mb-4" />
              <h3 className="text-lg font-semibold">All caught up!</h3>
              <p className="text-muted-foreground">No applications awaiting Dean review.</p>
            </CardContent>
          </Card>
        ) : (
          deanQueue.map(app => (
            <motion.div
              key={app.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              layout
            >
              <Card className="overflow-hidden transition-all hover:shadow-md border-l-4 border-l-primary">
                <div className="p-6">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <h3 className="text-lg font-semibold">{app.title || '(Untitled)'}</h3>
                        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary/10 text-primary border border-primary/20">
                          Dean Review
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
                          <div className="lg:col-span-1 space-y-6">
                             <div className="space-y-4">
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
                                  <dt className="font-medium text-muted-foreground">Registration Fee</dt>
                                  <dd>{app.registrationFee || '—'}</dd>
                                </div>
                              </dl>
                            </div>

                            {app.comments.length > 0 && (
                              <div className="space-y-3">
                                <h4 className="font-medium text-sm text-muted-foreground uppercase tracking-wider">Committee Comments</h4>
                                <div className="bg-muted/30 rounded-lg p-3 space-y-2 text-sm">
                                  {app.comments.filter(c=>c.role==='Committee').map(c => (
                                    <div key={c.id} className="bg-background p-2 rounded border shadow-sm">
                                      <p>{c.message}</p>
                                    </div>
                                  ))}
                                </div>
                              </div>
                            )}
                          </div>

                          {/* Recommendation Form */}
                          <div className="lg:col-span-2 space-y-6">
                            <div className="bg-muted/30 rounded-xl p-6 border space-y-6">
                              <h4 className="font-medium text-sm text-muted-foreground uppercase tracking-wider flex items-center gap-2">
                                <DollarSign className="w-4 h-4" /> Grant Recommendations
                              </h4>
                              
                              <div className="grid sm:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                  <label className="text-sm font-medium">Conference Grant Amount (₹)</label>
                                  <Input
                                    type="number"
                                    value={drafts[app.id]?.conferenceGrant || ''}
                                    onChange={e => updateDraft(app.id, 'conferenceGrant', Number(e.target.value))}
                                    placeholder="0.00"
                                  />
                                </div>
                                <div className="space-y-2">
                                  <label className="text-sm font-medium">Publication Incentive (₹)</label>
                                  <Input
                                    type="number"
                                    value={drafts[app.id]?.publicationIncentive || ''}
                                    onChange={e => updateDraft(app.id, 'publicationIncentive', Number(e.target.value))}
                                    placeholder="0.00"
                                  />
                                </div>
                              </div>

                              <div className="space-y-4">
                                <h5 className="text-sm font-medium">Proposed Distribution</h5>
                                <div className="grid sm:grid-cols-3 gap-4">
                                  <div className="space-y-2">
                                    <label className="text-xs text-muted-foreground">First Author (₹)</label>
                                    <Input
                                      type="number"
                                      value={drafts[app.id]?.firstAuthorShare || ''}
                                      onChange={e => updateDraft(app.id, 'firstAuthorShare', Number(e.target.value))}
                                      placeholder="0.00"
                                    />
                                  </div>
                                  <div className="space-y-2">
                                    <label className="text-xs text-muted-foreground">Corresponding Author (₹)</label>
                                    <Input
                                      type="number"
                                      value={drafts[app.id]?.correspondingAuthorShare || ''}
                                      onChange={e => updateDraft(app.id, 'correspondingAuthorShare', Number(e.target.value))}
                                      placeholder="0.00"
                                    />
                                  </div>
                                  <div className="space-y-2">
                                    <label className="text-xs text-muted-foreground">Co-Author (₹)</label>
                                    <Input
                                      type="number"
                                      value={drafts[app.id]?.coAuthorShare || ''}
                                      onChange={e => updateDraft(app.id, 'coAuthorShare', Number(e.target.value))}
                                      placeholder="0.00"
                                    />
                                  </div>
                                </div>
                              </div>

                              <div className="pt-4 border-t flex gap-3">
                                <Input
                                  value={commentDraft[app.id] || ""}
                                  onChange={(e) => setCommentDraft((d) => ({ ...d, [app.id]: e.target.value }))}
                                  placeholder="Add a comment..."
                                  className="flex-1"
                                />
                                <Button
                                  onClick={() => setDeanRecommendation(app.id, drafts[app.id])}
                                  className="gap-2"
                                >
                                  Forward to Principal <Send className="w-4 h-4" />
                                </Button>
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
          ))
        )}
      </div>
    </div>
  );
};

export default DeanDashboard;
