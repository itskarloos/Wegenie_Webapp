"use client"
import { useRouter, useSearchParams } from 'next/navigation';
import React from 'react'
import { Button } from '../ui/button';


type PaginationProps ={
    page: number | string,
    totalPages: number,
    urlParamName?: string
    
}
const Pagination = ({page,totalPages,urlParamName}:PaginationProps) => {
    const router = useRouter();
    const searchParams = useSearchParams();


    const onClick = (btnType: string) => {

    }
  return (
    <div className="flex gap-2">
        <Button className = "w-28" size="lg" variant="outline" onClick={() => onClick("prev")} disabled={Number(page) <=1}>
            Previous
        </Button>
        <Button className = "w-28" size="lg" variant="outline" onClick={() => onClick("next")} disabled={Number(page) >=totalPages}>
            Next
        </Button>
    </div>
  )
}

export default Pagination