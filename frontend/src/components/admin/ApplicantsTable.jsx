import React from 'react'
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '../ui/table'
import { useSelector, useDispatch } from 'react-redux'
import { APPLICATION_API_END_POINT } from '@/utils/constant'
import axios from 'axios'
import { setAllApplicants } from '@/redux/applicationSlice'

const ApplicantsTable = () => {
    const { applicants } = useSelector(store => store.application)
    const dispatch = useDispatch()

    const handleViewResume = async (item) => {
        const applicationId = item?.id ?? item?._id
        const resumeUrl = item?.applicant?.profile?.resume
        if (!resumeUrl) return
        try {
            axios.defaults.withCredentials = true
            await axios.post(`${APPLICATION_API_END_POINT}/${applicationId}/view`, {}, { withCredentials: true })
            const updated = applicants?.applications?.map((a) =>
                (a?.id ?? a?._id) === applicationId ? { ...a, status: 'viewed' } : a
            )
            if (applicants && updated) dispatch(setAllApplicants({ ...applicants, applications: updated }))
        } catch (_) {
            // still open resume if mark failed
        }
        window.open(resumeUrl, '_blank', 'noopener,noreferrer')
    }

    return (
        <div>
            <Table>
                <TableCaption>A list of applicants for this job. Click &quot;View resume&quot; to open their resume (they will see &quot;Recruiter viewed your resume&quot;).</TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead>FullName</TableHead>
                        <TableHead>Email</TableHead>
                        <TableHead>Contact</TableHead>
                        <TableHead>Resume</TableHead>
                        <TableHead>Date</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {
                        applicants && applicants?.applications?.map((item) => (
                            <TableRow key={item?.id ?? item?._id}>
                                <TableCell>{item?.applicant?.fullname}</TableCell>
                                <TableCell>{item?.applicant?.email}</TableCell>
                                <TableCell>{item?.applicant?.phoneNumber}</TableCell>
                                <TableCell>
                                    {item?.applicant?.profile?.resume ? (
                                        <button
                                            type="button"
                                            onClick={() => handleViewResume(item)}
                                            className="text-[#6A38C2] font-medium hover:underline text-left"
                                        >
                                            View resume
                                        </button>
                                    ) : (
                                        <span className="text-slate-500">No resume</span>
                                    )}
                                </TableCell>
                                <TableCell>{item?.applicant?.createdAt?.split?.('T')?.[0]}</TableCell>
                            </TableRow>
                        ))
                    }
                </TableBody>
            </Table>
        </div>
    )
}

export default ApplicantsTable