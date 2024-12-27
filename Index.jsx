import React, { useEffect, useState } from "react";
import Papa from "papaparse";
import TableContainer from "@material-ui/core/TableContainer";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import TableHead from "@material-ui/core/TableHead";
import TableCell from "@material-ui/core/TableCell";
import Checkbox from "@material-ui/core/Checkbox";

export default function App() {
    const [data, setData] = useState([]);

    useEffect(() => {
        // Parse the CSV file
        Papa.parse("/path/to/companies.csv", {
            download: true,
            header: true,
            complete: (result) => {
                setData(result.data);
            },
            error: (error) => {
                console.error("Error reading CSV:", error);
            },
        });
    }, []);

    return (
        <div style={{ display: "block", padding: 30 }}>
            <h4>Company Info Table with Checkboxes</h4>
            <TableContainer component={Paper}>
                <Table
                    style={{
                        width: 800,
                    }}
                    size="small"
                >
                    <TableHead>
                        <TableRow>
                            <TableCell align="center">S.No</TableCell>
                            <TableCell>Company Names</TableCell>
                            <TableCell>Company Info Links</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {data.map((row, index) => (
                            <TableRow key={index}>
                                <TableCell align="center">
                                    <Checkbox />
                                    {index + 1}
                                </TableCell>
                                <TableCell>{row.companyName}</TableCell>
                                <TableCell>
                                    <a href={row.companyLink} target="_blank" rel="noopener noreferrer">
                                        {row.companyLink}
                                    </a>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    );
}
