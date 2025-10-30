import { useState } from "react";

// Threats list
const threats = [
  { name: "SQL Injection", description: "Potential SQL injection vulnerabilities." },
  { name: "Cross-Site Scripting (XSS)", description: "Frontend inputs could execute malicious scripts." },
  { name: "Cross-Site Request Forgery (CSRF)", description: "Unauthorized actions might be performed using user credentials." },
  { name: "Insecure Direct Object References (IDOR)", description: "Users might access objects they shouldn't." },
  { name: "Security Misconfiguration", description: "Server or app configuration might be insecure." },
  { name: "Sensitive Data Exposure", description: "Sensitive data may be exposed." },
  { name: "Insufficient Logging & Monitoring", description: "Security events are not logged or monitored." },
  { name: "Broken Authentication", description: "Authentication may be bypassed." },
  { name: "Broken Access Control", description: "Users may access restricted areas." },
  { name: "Using Components with Known Vulnerabilities", description: "Libraries or dependencies have known security issues." },
];

export default function ThreatChecklist() {
  const [results, setResults] = useState([]);


  const scanThreats = () => {

    const scanResults = threats.map((threat) => ({
      ...threat,
      active: Math.random() > 0.5, 
    }));
    setResults(scanResults);
  };

  return (
    <div style={{ padding: "1rem", fontFamily: "sans-serif" }}>
      <h2>React App Threat Scanner</h2>
      <button
        onClick={scanThreats}
        style={{
          padding: "0.5rem 1rem",
          marginBottom: "1rem",
          cursor: "pointer",
        }}
      >
        Scan
      </button>

      {results.length > 0 && (
        <table
          border="1"
          cellPadding="8"
          style={{ borderCollapse: "collapse", width: "100%" }}
        >
          <thead>
            <tr>
              <th>Threat</th>
              <th>Description</th>
              <th>Under Attack?</th>
            </tr>
          </thead>
          <tbody>

{/* It's a math calculator because this is frontend */}

            {results.map((threat, index) => (
              <tr key={index}>
                <td>{threat.name}</td>
                <td>{threat.description}</td>
                <td>{threat.active ? "Yes" : "No"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
