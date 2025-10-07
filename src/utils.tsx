import { useEffect, useState } from "react";
import Papa from "papaparse";
import csvFilename from "/src/assets/data.csv?raw";

// Attributes
var now = new Date();
//var csvFilename = "src/assets/data.csv";

// FUNCTIONS
export function Clock() {
    const [hora, setHora] = useState(new Date());

    // useEffect
    useEffect(() => {
        const interval = setInterval(() => {
            setHora(new Date())
        }, 1000)
        return () => clearInterval(interval);
    }, [])

    return (
        <div>
            <p className="text-center border-2 rounded-2xl p-4 m-2">{now.toLocaleDateString()} - {hora.toLocaleTimeString()}</p>
        </div>
    );
}

export function MappingTable() {
    
    // Attributes
    const [csvData, setCsvData] = useState([]);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(true);

    // useEffect to parse the csv file
    useEffect(() => {
        Papa.parse(csvFilename, {
            download: false,
            header: true,
            skipEmptyLines: true,
            complete: (results: any) => {
                console.log("CSV carregat, contenint les dades:", results.data);
                setCsvData(results.data);
                setLoading(false); 
            },
            error: (err: any) => {
                console.error("Error intern de Papa Parse: ", err);
                setError("Error al carregar l'arxiu CSV.");
                setLoading(false);
            }
        })
    }, []);
    
    
    if (loading) {
        return (
            <p className="text-center font-bold text-blue-600">Carregant les dades...</p>
        )
    }

    if (error) {
        return (
            <p className="text-center font-bold text-red-600">{error}</p>
        )
    }

    var headers = Object.keys(csvData[0]);

    // Return the table
    return (
        <table>
            <thead>
                <tr>
                    {headers.map((header) => (
                        <th>
                            {header}
                        </th>
                    ))}
                </tr>
            </thead>
            <tbody>
                {csvData.map((row, i) => (
                    <tr key={i}>
                        {headers.map((header) => (
                          <td>
                            {row[header]}
                          </td>  
                        ))}
                    </tr>
                ))}
            </tbody>
        </table>
    )
}
