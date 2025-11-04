import React, { useState } from "react";
import { useData } from "../data/DataContext";

const ApplicantDashboard: React.FC = () => {
  const { applications, currentUser, submitApplication, addComment } =
    useData();
  const myApps = applications.filter(
    (a) => a.applicantName === currentUser?.name
  );
  const [showForm, setShowForm] = useState(false);
  const [submittedMsg, setSubmittedMsg] = useState<string | null>(null);
  const [commentDraft, setCommentDraft] = useState<Record<string, string>>({});
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

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    submitApplication(form);
    setSubmittedMsg("Application Submitted");
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

  return (
    <div className="min-h-screen mt-28 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <header className="mb-6">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-semibold text-black leading-tight">
            Hello {currentUser?.name}
          </h1>
          <p className="mt-2 text-base sm:text-lg text-gray-600">
            Manage Applications
          </p>
        </header>

        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
          <div className="text-sm text-gray-600">
            Welcome back — here are your recent submissions.
          </div>
          <div className="flex w-full sm:w-auto items-center gap-3">
            <button
              onClick={() => setShowForm((s) => !s)}
              className="w-full sm:w-auto inline-flex items-center justify-center px-4 py-2 rounded-lg bg-brand-600 hover:bg-brand-500 text-white text-sm font-medium transition"
            >
              {showForm ? "Close" : "New Application"}
            </button>
          </div>
        </div>

        {submittedMsg && (
          <div className="mb-6 px-4 py-3 rounded-md bg-brand-50 text-brand-800 text-sm max-w-full">
            {submittedMsg}
          </div>
        )}

        {showForm && (
          <form
            onSubmit={handleSubmit}
            className="mb-8 w-full bg-white/60 rounded-md p-4 grid grid-cols-1 md:grid-cols-2 gap-3"
          >
            <input
              name="title"
              value={form.title}
              onChange={handleChange}
              placeholder="Title of Publication"
              className="w-full rounded-md border border-gray-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-brand-200"
            />
            <select
              name="applicationType"
              value={form.applicationType}
              onChange={handleChange}
              className="w-full rounded-md border border-gray-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-brand-200"
            >
              <option value="">Application Type</option>
              <option>Publication Incentive</option>
              <option>Conference Registration</option>
              <option>Journal Publication Support</option>
            </select>

            <select
              name="publicationType"
              value={form.publicationType}
              onChange={handleChange}
              className="w-full rounded-md border border-gray-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-brand-200"
            >
              <option value="">Type of Publication</option>
              <option>National</option>
              <option>International</option>
              <option>Journal</option>
              <option>Conference Proceedings</option>
              <option>Other</option>
            </select>

            <input
              name="journalOrConference"
              value={form.journalOrConference}
              onChange={handleChange}
              placeholder="Name of Journal / Conference"
              className="w-full rounded-md border border-gray-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-brand-200"
            />

            <input
              name="quartile"
              value={form.quartile}
              onChange={handleChange}
              placeholder="Quartile of Journal"
              className="w-full rounded-md border border-gray-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-brand-200"
            />
            <input
              name="impactFactor"
              value={form.impactFactor}
              onChange={handleChange}
              placeholder="Impact Factor"
              className="w-full rounded-md border border-gray-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-brand-200"
            />

            <input
              name="indexingType"
              value={form.indexingType}
              onChange={handleChange}
              placeholder="Type of Indexing"
              className="w-full rounded-md border border-gray-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-brand-200"
            />
            <input
              name="publisher"
              value={form.publisher}
              onChange={handleChange}
              placeholder="Publisher Details"
              className="w-full rounded-md border border-gray-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-brand-200"
            />

            <input
              name="conferencePlaceDate"
              value={form.conferencePlaceDate}
              onChange={handleChange}
              placeholder="Place & Date of Conference"
              className="w-full rounded-md border border-gray-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-brand-200"
            />
            <input
              name="registrationFee"
              value={form.registrationFee}
              onChange={handleChange}
              placeholder="Registration Fee"
              className="w-full rounded-md border border-gray-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-brand-200"
            />

            <div className="col-span-full flex flex-col sm:flex-row sm:items-center gap-3">
              <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
                <button
                  type="button"
                  className="w-full sm:w-auto px-3 py-2 bg-white/60 border border-gray-100 rounded text-xs text-slate-700"
                >
                  Upload PDF (Signature)
                </button>
                <button
                  type="button"
                  className="w-full sm:w-auto px-3 py-2 bg-white/60 border border-gray-100 rounded text-xs text-slate-700"
                >
                  Upload Attachment 1
                </button>
                <button
                  type="button"
                  className="w-full sm:w-auto px-3 py-2 bg-white/60 border border-gray-100 rounded text-xs text-slate-700"
                >
                  Upload Attachment 2
                </button>
              </div>
              <div className="flex justify-end w-full sm:w-auto">
                <button
                  type="submit"
                  className="mt-2 sm:mt-0 px-5 py-2 rounded-lg bg-brand-600 hover:bg-brand-500 text-white text-sm font-medium transition"
                >
                  Submit Application
                </button>
              </div>
            </div>
          </form>
        )}

        <div className="space-y-6">
          {myApps.map((app) => (
            <article
              key={app.id}
              className="bg-white/60 rounded-lg p-4 sm:p-5 shadow-sm"
            >
              <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3">
                <div className="min-w-0">
                  <h3 className="text-lg font-semibold text-black truncate">
                    {app.title || "(Untitled)"}
                  </h3>
                  <p className="mt-1 text-sm text-gray-600">
                    {app.applicationType} • {app.publicationType}
                  </p>
                  <p className="mt-2 text-xs text-slate-500">
                    Submitted: {new Date(app.createdAt).toLocaleString()}
                  </p>
                </div>
                <div className="flex items-start sm:items-center gap-3">
                  <span
                    className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
                      app.status === "Pending"
                        ? "bg-yellow-50 text-yellow-700"
                        : app.status === "Approved"
                        ? "bg-emerald-50 text-emerald-700"
                        : app.status === "Denied"
                        ? "bg-rose-50 text-rose-700"
                        : "bg-slate-50 text-slate-700"
                    }`}
                  >
                    {app.status}
                  </span>
                  <details className="text-sm">
                    <summary className="cursor-pointer text-brand-700 underline decoration-dotted">
                      View details
                    </summary>
                    <div className="mt-3 grid sm:grid-cols-2 gap-3 text-sm text-slate-700">
                      <div>
                        <span className="font-medium text-slate-800">
                          Journal / Conference:
                        </span>{" "}
                        {app.journalOrConference || "—"}
                      </div>
                      <div>
                        <span className="font-medium text-slate-800">
                          Quartile:
                        </span>{" "}
                        {app.quartile || "—"}
                      </div>
                      <div>
                        <span className="font-medium text-slate-800">
                          Impact Factor:
                        </span>{" "}
                        {app.impactFactor || "—"}
                      </div>
                      <div>
                        <span className="font-medium text-slate-800">
                          Indexing Type:
                        </span>{" "}
                        {app.indexingType || "—"}
                      </div>
                      <div>
                        <span className="font-medium text-slate-800">
                          Publisher:
                        </span>{" "}
                        {app.publisher || "—"}
                      </div>
                      <div>
                        <span className="font-medium text-slate-800">
                          Place & Date:
                        </span>{" "}
                        {app.conferencePlaceDate || "—"}
                      </div>
                      <div>
                        <span className="font-medium text-slate-800">
                          Registration Fee:
                        </span>{" "}
                        {app.registrationFee || "—"}
                      </div>
                    </div>

                    <div className="mt-3">
                      <div className="mb-2 text-xs font-medium text-slate-600">
                        Comments
                      </div>
                      <div className="space-y-2">
                        {app.comments.map((c) => (
                          <div
                            key={c.id}
                            className="text-sm bg-white/70 p-2 rounded text-slate-700"
                          >
                            {c.role}: {c.message}
                          </div>
                        ))}
                      </div>
                      <textarea
                        value={commentDraft[app.id] || ""}
                        onChange={(e) =>
                          setCommentDraft((d) => ({
                            ...d,
                            [app.id]: e.target.value,
                          }))
                        }
                        placeholder="Add a comment"
                        className="w-full mt-3 border rounded p-2 text-sm"
                        rows={2}
                      ></textarea>
                      <div className="mt-2 flex gap-2">
                        <button
                          type="button"
                          onClick={() => {
                            const msg = commentDraft[app.id];
                            if (msg) {
                              addComment(app.id, msg);
                              setCommentDraft((d) => ({ ...d, [app.id]: "" }));
                            }
                          }}
                          className="px-3 py-1 bg-brand-600 text-white rounded text-sm"
                        >
                          Add Comment
                        </button>
                        <button
                          type="button"
                          className="px-3 py-1 bg-white border rounded text-sm"
                        >
                          Download PDF
                        </button>
                      </div>
                    </div>
                  </details>
                </div>
              </div>
            </article>
          ))}
          {myApps.length === 0 && (
            <div className="text-sm text-gray-600">No applications yet.</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ApplicantDashboard;
