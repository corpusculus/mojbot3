import { useState, useEffect } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";

function App() {
  const [count, setCount] = useState(0);
  const [tableData, setTableData] = useState([]); // State to store table data

  const handleClick = async () => {
    console.log("AAAA");
    const url =
      "https://www.juntadeandalucia.es/educacion/sipri/plazas/buscarjson";
    const data = { count }; // Example data to send (replace with your actual data)

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          Accept: "application/json; charset=UTF-8",
        },
        // Add CORS headers if necessary (assuming control over the server)
        // credentials: 'include', // Include cookies for cross-site requests
        // mode: 'cors' // Enable CORS for cross-site requests
        body: `pos=0&puesto=&cuerpo=&provincia=11&municipio=4&localidad=&participacion=&tipo=`,
      });

      if (!response.ok) {
        throw new Error(`Network response was not ok: ${response.status}`);
      }

      const result = await response.json(); // Parse the response as JSON

      // Extract relevant data from the response (modify based on your needs)
      const tableData = result.features.map((feature) => ({
        id: feature.id,
        centro: feature.properties.Centro,
        localidad: feature.properties.Localidad,
        puesto: feature.properties.Puesto,
        tipo: feature.properties.Tipo,
        // Add more properties as needed
      }));

      setTableData(tableData); // Update table data
    } catch (error) {
      console.error("Error sending POST request:", error);
      // Handle errors appropriately, e.g., display an error message to the user
    }
  };

  useEffect(() => {
    // Fetch initial data on component mount (optional)
    // You can make an initial fetch here to populate the table on load
  }, []);

  return (
    <>
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={handleClick}>
          Send POST Request (count is {count})
        </button>
      </div>

      {tableData.length > 0 && ( // Only render table if there's data
        <table>
          <thead>
            <tr>
              {/* Add table headers based on your response data structure */}
              <th>ID</th>
              <th>Centro</th>
              <th>Localidad</th>
              <th>Puesto</th>
              <th>Tipo</th>
              {/* Add more headers as needed */}
            </tr>
          </thead>
          <tbody>
            {tableData.map((row, index) => (
              <tr key={index}>
                {/* Map over each row's data and display it in table cells */}
                <td>{row.id}</td>
                <td>{row.centro}</td>
                <td>{row.localidad}</td>
                <td>{row.puesto}</td>
                <td>{row.tipo}</td>
                {/* Add more table cells as needed */}
              </tr>
            ))}
          </tbody>
        </table>
      )}

      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  );
}

export default App;
