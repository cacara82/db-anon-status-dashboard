//import { useEffect, useState } from "react"
import { Clock } from '../utils.tsx'
import { MappingTable } from '../utils.tsx'

export default function MappingDashboard() {
    return (
        <div className="flex flex-col items-center columns-1">
            <h1 className="text-4xl text-center m-10 md:text-5xl">Mapping Dashboard</h1>
            <div className="m-5">
                <p className="text-center"><strong>Som a dia: </strong><Clock /></p>
            </div>
            <div className='m-5'>
                <MappingTable />
            </div>
        </div>
    )
}