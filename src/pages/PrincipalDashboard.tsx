import React from 'react';
import { useData } from '../data/DataContext';
import { motion } from 'framer-motion';
import { CheckCircle2, XCircle, Users, DollarSign, FileText } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { Card, CardContent } from '../components/ui/Card';
import { cn } from '../lib/utils';

const PrincipalDashboard: React.FC = () => {
  const { applications, setFinalDecision } = useData();
  const principalQueue = applications.filter(a => a.status === 'Principal Review');

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Principal's Desk</h1>
        <p className="text-muted-foreground mt-1">
          Final review and approval of research grant applications.
        </p>
      </div>

      <div className="grid gap-6">
        {principalQueue.length === 0 ? (
          <Card className="bg-muted/50 border-dashed">
            <CardContent className="flex flex-col items-center justify-center py-12 text-center">
              <CheckCircle2 className="h-12 w-12 text-muted-foreground mb-4" />
              <h3 className="text-lg font-semibold">All caught up!</h3>
              <p className="text-muted-foreground">No applications awaiting final approval.</p>
            </CardContent>
          </Card>
        ) : (
          principalQueue.map(app => (
            <motion.div
              key={app.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              layout
            >
              <Card className="overflow-hidden border-l-4 border-l-primary">
                <div className="p-6">
                  <div className="flex flex-col md:flex-row justify-between gap-6">
                    <div className="space-y-4 flex-1">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <h3 className="text-lg font-semibold">{app.title}</h3>
                          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary/10 text-primary border border-primary/20">
                            Principal Review
                          </span>
                        </div>
                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                          <span className="flex items-center gap-1">
                            <Users className="w-3 h-3" /> {app.applicantName}
                          </span>
                          <span>•</span>
                          <span>{app.applicationType}</span>
                        </div>
                      </div>

                      {app.deanRecommendation && (
                        <div className="bg-muted/30 rounded-lg p-4 border space-y-3">
                          <h4 className="text-sm font-medium flex items-center gap-2">
                            <DollarSign className="w-4 h-4 text-primary" /> Dean's Recommendation
                          </h4>
                          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 text-sm">
                            <div>
                              <div className="text-xs text-muted-foreground">Grant Amount</div>
                              <div className="font-medium">₹{app.deanRecommendation.grantAmount}</div>
                            </div>
                            <div>
                              <div className="text-xs text-muted-foreground">Incentive</div>
                              <div className="font-medium">₹{app.deanRecommendation.publicationIncentive}</div>
                            </div>
                            <div>
                              <div className="text-xs text-muted-foreground">First Author</div>
                              <div className="font-medium">₹{app.deanRecommendation.firstAuthorShare}</div>
                            </div>
                            <div>
                              <div className="text-xs text-muted-foreground">Corresponding</div>
                              <div className="font-medium">₹{app.deanRecommendation.correspondingAuthorShare}</div>
                            </div>
                            <div>
                              <div className="text-xs text-muted-foreground">Co-Author</div>
                              <div className="font-medium">₹{app.deanRecommendation.coAuthorShare}</div>
                            </div>
                          </div>
                        </div>
                      )}

                      {app.comments.length > 0 && (
                        <div className="space-y-2">
                          <h4 className="text-sm font-medium text-muted-foreground">Recent Comments</h4>
                          <div className="space-y-2">
                            {app.comments.slice(-2).map(c => (
                              <div key={c.id} className="text-sm bg-secondary/50 p-2 rounded flex gap-2">
                                <span className="font-medium text-primary text-xs uppercase">{c.role}:</span>
                                <span className="text-muted-foreground">{c.message}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>

                    <div className="flex flex-col gap-3 justify-center min-w-[150px]">
                      <Button 
                        onClick={() => setFinalDecision(app.id, 'Approved')}
                        className="bg-emerald-600 hover:bg-emerald-700 gap-2"
                      >
                        <CheckCircle2 className="w-4 h-4" /> Approve
                      </Button>
                      <Button 
                        onClick={() => setFinalDecision(app.id, 'Rejected')}
                        variant="destructive"
                        className="gap-2"
                      >
                        <XCircle className="w-4 h-4" /> Reject
                      </Button>
                    </div>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))
        )}
      </div>
    </div>
  );
};

export default PrincipalDashboard;
