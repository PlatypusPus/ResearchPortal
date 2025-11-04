import React, { useState } from "react";
import { useData } from "../data/DataContext";

const ApplicantDashboard: React.FC = () => {
  const { applications, currentUser, submitApplication } = useData();
  const myApps = applications.filter(
    (a) => a.applicantName === currentUser?.name
  );
  const [showForm, setShowForm] = useState(false);
  const [submittedMsg, setSubmittedMsg] = useState<string | null>(null);
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
    <div className="min-h-[calc(100vh-64px)] flex items-center justify-center p-6">
      <div className="w-full max-w-3xl bg-white border-2 border-brand-500 rounded-3xl shadow-sm px-8 py-8 sm:px-10 sm:py-10">
        <div className="mb-6 text-center">
          <img
            src="/src/assets/sjeclogo.png"
            alt="SJEC Logo"
            className="mx-auto h-14 w-auto mb-4"
          />
          <h1 className="text-2xl sm:text-3xl font-semibold text-black tracking-tight">
            My Applications
          </h1>
          <p className="mt-2 text-sm text-gray-600">
            Manage and submit your research grant applications
          </p>
        </div>

        <div className="flex items-center justify-between mb-4">
          <div></div>
          <button
            onClick={() => setShowForm((s) => !s)}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-brand-600 hover:bg-brand-500 text-white text-sm font-medium transition"
          >
            {showForm ? "Close Form" : "New Application"}
          </button>
        </div>

        {submittedMsg && (
          <div className="mb-4 rounded-lg border border-brand-100 bg-brand-50 text-brand-800 px-4 py-3 text-sm">
            {submittedMsg}
          </div>
        )}

        {showForm && (
          <form
            onSubmit={handleSubmit}
            className="mb-6 bg-white rounded-lg border border-gray-100 p-4 grid grid-cols-1 md:grid-cols-2 gap-3"
          >
            {[
              { label: "Title of Publication", name: "title" },
              {
                label: "Application Type",
                name: "applicationType",
                type: "select",
                options: [
                  "Publication Incentive",
                  "Conference Registration",
                  "Journal Publication Support",
                ],
              },
              {
                label: "Type of Publication",
                name: "publicationType",
                type: "select",
                options: [
                  "National",
                  "International",
                  "Journal",
                  "Conference Proceedings",
                  "Other",
                ],
              },
              {
                label: "Name of Journal/Conference",
                name: "journalOrConference",
              },
              { label: "Quartile of Journal", name: "quartile" },
              { label: "Impact Factor", name: "impactFactor" },
              {
                label: "Type of Indexing (Conference/Journal)",
                name: "indexingType",
              },
              { label: "Publisher Details", name: "publisher" },
              {
                label: "Place & Date of Conference",
                name: "conferencePlaceDate",
              },
              { label: "Registration Fee", name: "registrationFee" },
            ].map((field) => (
              <div key={field.name} className="flex flex-col">
                <label className="text-xs font-medium text-slate-600 mb-1">
                  {field.label}
                </label>
                {field.type === "select" ? (
                  <select
                    name={field.name}
                    value={(form as any)[field.name]}
                    onChange={handleChange}
                    className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-brand-200 focus:border-brand-300"
                  >
                    <option value="">Select...</option>
                    {field.options?.map((o) => (
                      <option key={o} value={o}>
                        {o}
                      </option>
                    ))}
                  </select>
                ) : (
                  <input
                    name={field.name}
                    value={(form as any)[field.name]}
                    onChange={handleChange}
                    className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-brand-200 focus:border-brand-300"
                  />
                )}
              </div>
            ))}

            <div className="col-span-full flex flex-wrap gap-3 pt-2">
              <button
                type="button"
                className="px-3 py-2 bg-slate-50 border border-gray-100 rounded text-xs text-slate-700"
              >
                Upload PDF (Signature)
              </button>
              <button
                type="button"
                className="px-3 py-2 bg-slate-50 border border-gray-100 rounded text-xs text-slate-700"
              >
                Upload Attachment 1
              </button>
              <button
                type="button"
                className="px-3 py-2 bg-slate-50 border border-gray-100 rounded text-xs text-slate-700"
              >
                Upload Attachment 2
              </button>
            </div>

            <div className="col-span-full pt-2 flex justify-end">
              <button
                type="submit"
                className="px-4 py-2 rounded-lg bg-brand-600 hover:bg-brand-500 text-white text-sm font-medium transition"
              >
                Submit Application
              </button>
            </div>
          </form>
        )}

        <div className="space-y-3">
          {myApps.map((app) => (
            <div
              key={app.id}
              className="bg-white border border-gray-100 rounded-xl p-4 shadow-sm"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="min-w-0">
                  <h3 className="text-sm font-semibold text-brand-700 truncate">
                    {app.title || "(Untitled)"}
                  </h3>
                  <p className="mt-1 text-xs text-slate-500">
                    {app.applicationType} • {app.publicationType}
                  </p>
                </div>
                <div className="flex-shrink-0">
                  <span
                    className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${
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
                </div>
              </div>
              {app.comments.length > 0 && (
                <div className="mt-3 border-t border-gray-100 pt-3">
                  <div className="text-xs font-semibold text-slate-500 uppercase mb-2">
                    Comments
                  </div>
                  <div className="space-y-2">
                    {app.comments.map((c) => (
                      <div
                        key={c.id}
                        className="text-xs text-slate-600 flex gap-2"
                      >
                        <span className="font-medium text-brand-700">
                          {c.role}:
                        </span>
                        <span>{c.message}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
          {myApps.length === 0 && (
            <div className="text-sm text-slate-600">No applications yet.</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ApplicantDashboard;
