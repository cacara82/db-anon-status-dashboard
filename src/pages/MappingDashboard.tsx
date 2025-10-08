//import { useEffect, useState } from "react"
import { Clock } from '../utils.tsx'
import { MappingTable } from '../utils.tsx'

export default function MappingDashboard() {
    return (
        <div className="flex flex-col items-center columns-1">
            <div className='md:flex md:items-center md:gap-10'>
                <img src="logo.png" alt="Logo" className='w-120 h-50' />
                <h1 className="text-4xl text-center md:mt-10 mb-5 md:text-5xl">Database Anonymisation · Project Dashboard</h1>
            </div>
            
            <div className="mb-5">
                <p className="text-center"><strong>Som a dia: </strong><Clock /></p>
            </div>
            <div className='m-5'>
                <MappingTable />
            </div>
        </div>
    )
}