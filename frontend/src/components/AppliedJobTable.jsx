import React from 'react'
import { Link } from 'react-router-dom'
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from './ui/table'
import { Badge } from './ui/badge'
import { Button } from './ui/button'
import { useSelector } from 'react-redux'
import { ArrowUpRight } from 'lucide-react'

const AppliedJobTable = () => {
  const { allAppliedJobs } = useSelector((store) => store.job)

  return (
    <div>
      <Table>
        <TableCaption>A list of your applied jobs</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Date</TableHead>
            <TableHead>Job Role</TableHead>
            <TableHead>Company</TableHead>
            <TableHead className="text-right">Status</TableHead>
            <TableHead className="w-[80px] text-right">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {!allAppliedJobs?.length ? (
            <TableRow>
              <TableCell colSpan={5} className="text-center py-10 text-slate-500">
                You haven&apos;t applied to any job yet.{' '}
                <Link to="/jobs" className="text-[#6A38C2] font-medium hover:underline">
                  Browse jobs
                </Link>
              </TableCell>
            </TableRow>
          ) : (
            allAppliedJobs.map((appliedJob) => {
              const jobId = appliedJob?.job?.id ?? appliedJob?.job?._id
              return (
                <TableRow key={appliedJob?.id ?? appliedJob?._id}>
                  <TableCell className="text-slate-600">
                    {appliedJob?.createdAt?.split?.('T')?.[0]}
                  </TableCell>
                  <TableCell className="font-medium">{appliedJob?.job?.title}</TableCell>
                  <TableCell>{appliedJob?.job?.company?.name}</TableCell>
                  <TableCell className="text-right">
                    <Badge
                      className={
                        (appliedJob?.status === 'viewed' || appliedJob?.status === 'accepted' || appliedJob?.status === 'rejected')
                          ? 'bg-[#6A38C2]/10 text-[#6A38C2]'
                          : 'bg-slate-100 text-slate-700'
                      }
                    >
                      {(appliedJob?.status === 'viewed' || appliedJob?.status === 'accepted' || appliedJob?.status === 'rejected')
                        ? 'Recruiter viewed your resume'
                        : 'Pending'}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    {jobId && (
                      <Button asChild variant="ghost" size="sm" className="text-[#6A38C2]">
                        <Link to={`/description/${jobId}`}>
                          View <ArrowUpRight className="h-3.5 w-3.5 ml-0.5 inline" />
                        </Link>
                      </Button>
                    )}
                  </TableCell>
                </TableRow>
              )
            })
          )}
        </TableBody>
      </Table>
    </div>
  )
}

export default AppliedJobTable