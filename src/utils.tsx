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
        <table className="border-2 text-center table-fixed text-sm">
            <thead className="border-2">
                <tr className="border-2">
                    {headers.map((header) => (
                        <th className="border-2">
                            {header}
                        </th>
                    ))}
                </tr>
            </thead>
            <tbody className="border-2">
                {csvData.map((row, i) => (
                    <tr key={i} className="border-2">
                        {headers.map((header) => (
                          <td className="border-2">
                            {header === "main_dm_email" ? (
                                <a href={`mailto:${row[header]}`} className="text-blue-600 hover:underline">
                                    {row[header]}
                                </a>
                            ) : (
                                row[header]
                            )}
                          </td>  
                        ))}
                    </tr>
                ))}
            </tbody>
        </table>
    )
}
