import React from 'react';
import { Modal, ModalBody } from '../ui/Modal';
import { Tabs } from '../ui/Tabs';
import { Button } from '../ui/Button';
import { Avatar } from '../ui/Avatar';
import { StatusBadge, PriorityDot } from '../ui/Badge';
import { useJob, useNotes, useContacts, useActivities } from '../../hooks/useJobs';
import { formatCurrency, formatDate } from '../../utils/format';
import { MapPin, DollarSign, Calendar, Edit, Trash2 } from 'lucide-react';

interface JobModalProps {
  isOpen: boolean;
  onClose: () => void;
  jobId: string;
}

export const JobModal: React.FC<JobModalProps> = ({ isOpen, onClose, jobId }) => {
  const { data: job, isLoading } = useJob(jobId);
  const { data: notes = [] } = useNotes(jobId);
  const { data: contacts = [] } = useContacts(jobId);
  const { data: activities = [] } = useActivities(jobId);

  if (!job && !isLoading) return null;

  const tabs = [
    {
      id: 'overview',
      label: 'Overview',
      content: (
        <div className="space-y-6">
          {/* Company Info */}
          <div className="flex items-start space-x-4">
            <Avatar src={job?.companyLogo} fallback={job?.company} size="lg" />
            <div className="flex-1">
              <h2 className="text-2xl font-bold text-gray-900">{job?.position}</h2>
              <p className="text-lg text-gray-600">{job?.company}</p>
              <div className="mt-2 flex items-center space-x-4">
                <StatusBadge status={job?.status!} />
                <PriorityDot priority={job?.priority!} />
                <span className="text-sm text-gray-600">{job?.priority} Priority</span>
              </div>
            </div>
          </div>

          {/* Details Grid */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium text-gray-700">Location</label>
              <div className="flex items-center mt-1 text-gray-900">
                <MapPin className="h-4 w-4 mr-2" />
                {job?.location} ({job?.locationType})
              </div>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-700">Job Type</label>
              <div className="mt-1 text-gray-900">{job?.jobType}</div>
            </div>
            {job?.salaryMin && (
              <div>
                <label className="text-sm font-medium text-gray-700">Salary Range</label>
                <div className="flex items-center mt-1 text-gray-900">
                  <DollarSign className="h-4 w-4 mr-2" />
                  {formatCurrency(job.salaryMin)} - {formatCurrency(job.salaryMax!)}
                </div>
              </div>
            )}
            {job?.appliedAt && (
              <div>
                <label className="text-sm font-medium text-gray-700">Applied Date</label>
                <div className="flex items-center mt-1 text-gray-900">
                  <Calendar className="h-4 w-4 mr-2" />
                  {formatDate(job.appliedAt)}
                </div>
              </div>
            )}
          </div>

          {/* Skills */}
          {job?.skills && job.skills.length > 0 && (
            <div>
              <label className="text-sm font-medium text-gray-700">Required Skills</label>
              <div className="mt-2 flex flex-wrap gap-2">
                {job.skills.map((skill) => (
                  <span
                    key={skill}
                    className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Description */}
          {job?.description && (
            <div>
              <label className="text-sm font-medium text-gray-700">Job Description</label>
              <p className="mt-2 text-gray-700 whitespace-pre-wrap">{job.description}</p>
            </div>
          )}

          {/* Actions */}
          <div className="flex space-x-3 pt-4 border-t">
            <Button variant="primary" size="md">
              <Edit className="h-4 w-4 mr-2" />
              Edit
            </Button>
            <Button variant="danger" size="md">
              <Trash2 className="h-4 w-4 mr-2" />
              Delete
            </Button>
          </div>
        </div>
      ),
    },
    {
      id: 'timeline',
      label: 'Timeline',
      content: (
        <div className="space-y-4">
          {activities.length > 0 ? (
            activities.map((activity) => (
              <div key={activity.id} className="flex items-start space-x-3 pb-4 border-b last:border-0">
                <div className="w-2 h-2 mt-2 rounded-full bg-blue-500" />
                <div className="flex-1">
                  <p className="text-sm text-gray-900">{activity.description}</p>
                  <p className="text-xs text-gray-500 mt-1">{formatDate(activity.createdAt)}</p>
                </div>
              </div>
            ))
          ) : (
            <p className="text-center text-gray-500">No activity yet</p>
          )}
        </div>
      ),
    },
    {
      id: 'notes',
      label: 'Notes',
      content: (
        <div className="space-y-4">
          {notes.length > 0 ? (
            notes.map((note) => (
              <div key={note.id} className="p-4 bg-gray-50 rounded-lg">
                <p className="text-sm text-gray-900">{note.content}</p>
                <p className="text-xs text-gray-500 mt-2">{formatDate(note.createdAt)}</p>
              </div>
            ))
          ) : (
            <p className="text-center text-gray-500">No notes yet</p>
          )}
          <Button variant="outline" size="sm" className="w-full">
            Add Note
          </Button>
        </div>
      ),
    },
    {
      id: 'contacts',
      label: 'Contacts',
      content: (
        <div className="space-y-4">
          {contacts.length > 0 ? (
            contacts.map((contact) => (
              <div key={contact.id} className="p-4 border rounded-lg">
                <h4 className="font-medium text-gray-900">{contact.name}</h4>
                {contact.role && <p className="text-sm text-gray-600">{contact.role}</p>}
                {contact.email && <p className="text-sm text-gray-600">{contact.email}</p>}
                {contact.phone && <p className="text-sm text-gray-600">{contact.phone}</p>}
              </div>
            ))
          ) : (
            <p className="text-center text-gray-500">No contacts yet</p>
          )}
          <Button variant="outline" size="sm" className="w-full">
            Add Contact
          </Button>
        </div>
      ),
    },
    {
      id: 'documents',
      label: 'Documents',
      content: (
        <div className="space-y-4">
          <p className="text-center text-gray-500">No documents uploaded</p>
          <Button variant="outline" size="sm" className="w-full">
            Upload Document
          </Button>
        </div>
      ),
    },
  ];

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="xl" title={job?.position}>
      <ModalBody>
        <Tabs tabs={tabs} defaultTab="overview" />
      </ModalBody>
    </Modal>
  );
};
