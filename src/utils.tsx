import { useEffect, useState } from "react";
import Papa from "papaparse";
import csvFilename from "/src/assets/data.csv?raw";

// Variables generals
var now = new Date();

// FUNCIONS

/**
 * Component que utilitza variables d'estat i effect
 * per generar un rellotge amb la data actual que 
 * s'actualitza cada segon. Format local (dd/mm/yyyy).
 * @returns component HTML per implementar
 */
export function Clock() {

    // Variables
    const [hora, setHora] = useState(new Date());
    
    // useEffect per re-renderitzar la hora en la mateixa instància de pàgina
    useEffect(() => {

        // Interval que actualitza la hora cada 1000ms (1s)
        const interval = setInterval(() => {
            setHora(new Date())
        }, 1000)

        return () => clearInterval(interval);

    }, [])

    // Return the HTML component
    return (
        <div>
            <p className="text-center border-2 rounded-2xl p-4 m-2">{now.toLocaleDateString()} - {hora.toLocaleTimeString()}</p>
        </div>
    );

}

/**
 * Aquesta funció genera genera una taula
 * personalitzada del CSV de Web Dashboard 
 * del projecte REDCap. Per cada projecte,
 * generarà una pàgina d'aquell projecte.
 * @returns component HTML per implementar
 */
export function MappingTable() {
    
    // Variables
    const [csvData, setCsvData] = useState([]); // estat per carregar les dades del CSV
    const [error, setError] = useState(""); // estat per carregar si tenim un error amb la lectura del CSV
    const [loading, setLoading] = useState(true); // estat per carregar si la pàgina està carregant o no

    // useEffect per parsejar l'arxiu CSV amb Papa Parse
    useEffect(() => {
        Papa.parse(csvFilename, {
            download: false, // no el descarreguem, el tenim importat
            header: true,
            skipEmptyLines: true,
            complete: (results: any) => { // un cop es completa el parse
                console.log("CSV carregat, contenint les dades:", results.data);
                setCsvData(results.data);
                setLoading(false); 
            },
            error: (err: any) => { // si hi ha algun error al procés
                console.error("Error intern de Papa Parse: ", err);
                setError("Error al carregar l'arxiu CSV.");
                setLoading(false);
            }
        })
    }, []);
    
    // Mentre carrega
    if (loading) {
        return (
            <p className="text-center font-bold text-blue-600">Carregant les dades...</p>
        )
    }

    // Si hi ha error
    if (error) {
        return (
            <p className="text-center font-bold text-red-600">{error}</p>
        )
    }

    // Ens guardem el header del csv (la row de les variables)
    var headers = Object.keys(csvData[0]);

    // Retornem la taula mapejada en HTML (avís si la pantalla es petita)
    return (
        <div>
            <p className="font-bold text-red-600 text-center m-10 p-5 border-3 rounded-lg md:hidden">Per raons de tamany, el dashboard no està disponible a pantalles petites. Prova d'utilitzar una pantalla més gran.</p>
            <table className="hidden text-center table-fixed w-100 text-xs md:text-sm md:w-full md:block">
                <thead className="border-2">
                    <tr className="border-2">
                        {headers.map((header) => (
                            <th className="border-2 px-4 py-2 bg-orange-500">
                                {header}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody className="border-2">
                    {csvData.map((row, i) => (
                        <tr key={i} className="border-2 px-4 py-2">
                            {headers.map((header) => (
                            <td className="border-2 px-4 py-2">
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
        </div> 
    )

}
